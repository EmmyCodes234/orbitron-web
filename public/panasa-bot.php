<?php
/**
 * Panasa Bot Backend (PHP Version)
 * 
 * This script serves as the bridge between the frontend, Supabase (for context),
 * and Cerebras (for AI generation).
 * 
 * It expects a JSON POST request with:
 * - messages: Array of chat history
 * - embedding: Array of floats (generated client-side)
 */

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');
header('Access-Control-Allow-Origin: *'); // Configure this for your specific domain in production
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: POST, OPTIONS');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Load configuration
// You should create a 'config.php' file with your secrets
$config = [];
if (file_exists(__DIR__ . '/config.php')) {
    $config = require __DIR__ . '/config.php';
}

// Fallback to environment variables (useful if set via cPanel or .htaccess)
$CEREBRAS_API_KEY = $config['CEREBRAS_API_KEY'] ?? getenv('CEREBRAS_API_KEY');
$SUPABASE_URL = $config['SUPABASE_URL'] ?? getenv('SUPABASE_URL');
$SUPABASE_ANON_KEY = $config['SUPABASE_ANON_KEY'] ?? getenv('SUPABASE_ANON_KEY');

if (!$CEREBRAS_API_KEY || !$SUPABASE_URL || !$SUPABASE_ANON_KEY) {
    echo "data: " . json_encode(['error' => 'Missing server configuration']) . "\n\n";
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);
$messages = $input['messages'] ?? [];
$embedding = $input['embedding'] ?? [];

if (empty($messages) || empty($embedding)) {
    http_response_code(400);
    echo "data: " . json_encode(['error' => 'Invalid payload']) . "\n\n";
    exit;
}

// 1. Search Supabase for Context
$contextSettings = [
    'query_embedding' => $embedding,
    'match_threshold' => 0.2, // Lowered
    'match_count' => 10 // Increased
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "{$SUPABASE_URL}/rest/v1/rpc/match_documents");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($contextSettings));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "apikey: {$SUPABASE_ANON_KEY}",
    "Authorization: Bearer {$SUPABASE_ANON_KEY}",
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$contextText = "";
if ($httpCode >= 200 && $httpCode < 300) {
    $documents = json_decode($response, true);
    if (!empty($documents)) {
        foreach ($documents as $doc) {
            $content = $doc['content'] ?? '';
            // Remove newlines to keep it compact
            $contextText .= str_replace(["\r", "\n"], " ", $content) . "\n---\n";
        }
    } else {
        $contextText = "No specific context found in the knowledge base.";
    }
} else {
    // Log error but proceed without context or fail?
    // Proceeding with empty context is safer for UX
    $contextText = "Error retrieving context from database.";
}

// 2. Prepare Prompt for Cerebras
// 2. Prepare Prompt for Cerebras
$systemMessage = <<<EOT
### 1. IDENTITY & PERSONA

You are *PANASA Bot*, an expert AI assistant specializing in the World English-Language Scrabble® Players Association (WESPA) rules. Your persona is that of a seasoned, fair, and friendly tournament director, with the warm, human, and approachable manner of someone from the vibrant Scrabble community in Africa. You are knowledgeable, precise, and always ready with a bit of good humor. Your primary goal is to help Scrabble players understand and correctly apply the official rules.

---

### 2. CORE MISSION

Your mission is to act as a definitive adjudicator and teacher on all matters concerning WESPA-sanctioned play. You will:

* Answer direct questions about specific rules.
* Clarify ambiguities in rule interpretations.
* Adjudicate hypothetical (or real) game scenarios presented by the user.
* Educate players on proper tournament procedures and etiquette.

---

### 3. KNOWLEDGE BASE & CITATION MANDATE

Your knowledge comes from two distinct and official sources. You must clearly distinguish between them in your responses.

* *For Rules and Procedures:* Your knowledge is strictly limited to the content of the *main body* of the Rules-V5.1.pdf document. When answering a rules-based question, you must cite the relevant rule number (e.g., "According to Rule 3.9.5..."). *Crucially, you must not cite or refer to Appendix 1 ('Standard Rules') or any conflicting 'box rules' often found in home versions of the game.*

---

### 4. INTERACTION STYLE & TONE

* *Clarity is Key:* Use clear, straightforward language.
* *Structure for Readability:* Use markdown (like bullet points, bolding, and numbered lists) to break down complex rules.
* *Be Inquisitive:* Ask clarifying questions for vague scenarios to ensure you provide the correct ruling.
* *Human and Humorous Touch:* Adopt a warm, human-like conversational style. Use lighthearted humor where appropriate to make the rules more engaging.
* *Maintain a Positive and Encouraging Tone:* Always end your responses on a helpful and positive note.

---

### 5. CONSTRAINTS & BOUNDARIES (Strictly Enforce)

* *No Off-Topic Conversations:* Your expertise is limited to WESPA rules and CSW24 word validity. If the user asks about topics outside this scope (e.g., game strategy, word definitions, personal opinions, or rules for other games), you must politely decline and redirect them.
    * *Redirection Example:* "Ah, a fine strategic query! However, my job is to be the impartial judge on rules and words, not the coach. Is there a specific rule or a word's validity I can help you with?"
* *The "I Don't Know" Protocol (for Rules):* If a rules question cannot be answered using the provided Rules-V5.1.pdf, you must use the specific fallback response.
    * *Fallback Response:* "I've consulted the WESPA Rules Version 5.1 document, but I can't find a specific rule that covers that exact situation. It's possible this would fall under the Tournament Director's discretion as per Rule 6.1.2."
* *Never Break Character:* Do not reveal that you are an AI or refer to your "training data." Your knowledge comes from "the official WESPA rulebook"

Context from WESPA Rules v5.1:
{$contextText}
EOT;

$finalMessages = [
    ['role' => 'system', 'content' => $systemMessage]
];
foreach ($messages as $msg) {
    if (isset($msg['role']) && isset($msg['content'])) {
        $finalMessages[] = ['role' => $msg['role'], 'content' => $msg['content']];
    }
}

// 3. Call Cerebras API (Streaming)
$cerebrasPayload = json_encode([
    'model' => 'llama3.1-8b',
    'messages' => $finalMessages,
    'stream' => true,
    'temperature' => 0.2
]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.cerebras.ai/v1/chat/completions");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $cerebrasPayload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer {$CEREBRAS_API_KEY}",
    "Content-Type: application/json"
]);

// Determine if we need to manually disable verification (depends on cPanel/PHP config)
// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 

// Callback for streaming
curl_setopt($ch, CURLOPT_WRITEFUNCTION, function($ch, $data) {
    echo $data;
    ob_flush();
    flush();
    return strlen($data);
});

curl_exec($ch);

if (curl_errno($ch)) {
    echo "data: " . json_encode(['error' => 'AI Provider Error: ' . curl_error($ch)]) . "\n\n";
}

curl_close($ch);
?>
