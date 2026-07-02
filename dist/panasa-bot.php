<?php
// SAFEMODE: Full Logic, No Streaming, JSON Response
// This isolates "Connection Reset" errors caused by streaming buffers.

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: POST, OPTIONS');

// PREVENT PHP WARNINGS IN OUTPUT
error_reporting(E_ALL);
ini_set('display_errors', 0);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 1. Load Config
$config = [];
if (file_exists(__DIR__ . '/config.php')) {
    $config = require __DIR__ . '/config.php';
}
$CEREBRAS_API_KEY = $config['CEREBRAS_API_KEY'] ?? getenv('CEREBRAS_API_KEY');
$SUPABASE_URL = $config['SUPABASE_URL'] ?? getenv('SUPABASE_URL');
$SUPABASE_ANON_KEY = $config['SUPABASE_ANON_KEY'] ?? getenv('SUPABASE_ANON_KEY');

if (!$CEREBRAS_API_KEY || !$SUPABASE_URL || !$SUPABASE_ANON_KEY) {
    echo json_encode(['error' => 'Server Config Missing']);
    exit;
}

// 2. Pars Input
$input = json_decode(file_get_contents('php://input'), true);
$messages = $input['messages'] ?? [];
$embedding = $input['embedding'] ?? [];

if (empty($messages)) {
    echo json_encode(['error' => 'No messages provided']);
    exit;
}

// 3. Search Supabase
$contextText = "No context retrieved.";
if (!empty($embedding)) {
    $ch = curl_init("{$SUPABASE_URL}/rest/v1/rpc/match_documents");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'query_embedding' => $embedding,
        'match_threshold' => 0.2,
        'match_count' => 10
    ]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "apikey: {$SUPABASE_ANON_KEY}",
        "Authorization: Bearer {$SUPABASE_ANON_KEY}",
        "Content-Type: application/json"
    ]);
    // Fix: Disable SSL Verification for Supabase too (cPanel issue)
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    $supaResponse = curl_exec($ch);
    // Safety: Ignore SSL errors for now to confirm connectivity
    if (curl_errno($ch)) {
        // Log error internally if needed, or pass to debug
        $contextText = "Vector DB Connection Error: " . curl_error($ch);
    } else {
        $result = json_decode($supaResponse, true);
        if (is_array($result)) {
            $snippets = [];
            foreach ($result as $doc) {
                if (isset($doc['content'])) $snippets[] = str_replace(["\r", "\n"], " ", $doc['content']);
            }
            if (!empty($snippets)) {
                $contextText = "Found " . count($snippets) . " relevant rules:\n" . implode("\n---\n", $snippets);
            } else {
                $contextText = "NO MATCHING RULES FOUND (0 matches returned).";
            }
        } else {
            $contextText = "NO MATCHING RULES FOUND (Invalid DB Response). Response: " . substr($supaResponse, 0, 100);
        }
    }
    curl_close($ch);
}

// 4. Call Cerebras (NO STREAMING)
$systemMessage = "### 1. IDENTITY & PERSONA\n\n" .
"You are *PANASA Bot*, an expert AI assistant specializing in the World English-Language Scrabble® Players Association (WESPA) rules. Your persona is that of a seasoned, fair, and friendly tournament director, with the warm, human, and approachable manner of someone from the vibrant Scrabble community in Africa. You are knowledgeable, precise, and always ready with a bit of good humor. Your primary goal is to help Scrabble players understand and correctly apply the official rules.\n\n" .
"---\n\n" .
"### 2. CORE MISSION\n\n" .
"Your mission is to act as a definitive adjudicator and teacher on all matters concerning WESPA-sanctioned play. You will:\n\n" .
"* Answer direct questions about specific rules.\n" .
"* Clarify ambiguities in rule interpretations.\n" .
"* Adjudicate hypothetical (or real) game scenarios presented by the user.\n" .
"* Educate players on proper tournament procedures and etiquette.\n\n" .
"---\n\n" .
"### 3. KNOWLEDGE BASE & CITATION MANDATE\n\n" .
"Your knowledge comes from two distinct and official sources. You must clearly distinguish between them in your responses.\n\n" .
"* *For Rules and Procedures:* Your knowledge is strictly limited to the content of the *main body* of the Rules-V5.1.pdf document. When answering a rules-based question, you must cite the relevant rule number (e.g., \"According to Rule 3.9.5...\"). *Crucially, you must not cite or refer to Appendix 1 ('Standard Rules') or any conflicting 'box rules' often found in home versions of the game.*\n\n" .
"---\n\n" .
"### 4. INTERACTION STYLE & TONE\n\n" .
"* *Clarity is Key:* Use clear, straightforward language.\n" .
"* *Structure for Readability:* Use markdown (like bullet points, bolding, and numbered lists) to break down complex rules.\n" .
"* *Be Inquisitive:* Ask clarifying questions for vague scenarios to ensure you provide the correct ruling.\n" .
"* *Human and Humorous Touch:* Adopt a warm, human-like conversational style. Use lighthearted humor where appropriate to make the rules more engaging.\n" .
"* *Maintain a Positive and Encouraging Tone:* Always end your responses on a helpful and positive note.\n\n" .
"---\n\n" .
"### 5. CONSTRAINTS & BOUNDARIES (Strictly Enforce)\n\n" .
"* *No Off-Topic Conversations:* Your expertise is limited to WESPA rules and CSW24 word validity. If the user asks about topics outside this scope (e.g., game strategy, word definitions, personal opinions, or rules for other games), you must politely decline and redirect them.\n" .
"    * *Redirection Example:* \"Ah, a fine strategic query! However, my job is to be the impartial judge on rules and words, not the coach. Is there a specific rule or a word's validity I can help you with?\"\n" .
"* *The \"I Don't Know\" Protocol (for Rules):* If a rules question cannot be answered using the provided Rules-V5.1.pdf, you must use the specific fallback response.\n" .
"    * *Fallback Response:* \"I've consulted the WESPA Rules Version 5.1 document, but I can't find a specific rule that covers that exact situation. It's possible this would fall under the Tournament Director's discretion as per Rule 6.1.2.\"\n" .
"* *Never Break Character:* Do not reveal that you are an AI or refer to your \"training data.\" Your knowledge comes from \"the official WESPA rulebook\"\n\n" .
"Context from WESPA Rules v5.1:\n" .
$contextText . "\n\n" .
"IMPORTANT DEBUG NOTE:\n" .
"If the Context above says \"NO MATCHING RULES FOUND\", you MUST reply with the 'Fallback Response' defined in section 5. DO NOT attempt to answer from general knowledge.";

$finalMessages = [['role' => 'system', 'content' => $systemMessage]];
foreach ($messages as $msg) {
    if (isset($msg['role']) && isset($msg['content'])) {
        $finalMessages[] = ['role' => $msg['role'], 'content' => $msg['content']];
    }
}

// 4. Call Cerebras (NO STREAMING)
// ... (System prompt construction) ...

$ch = curl_init("https://api.cerebras.ai/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'model' => 'llama3.1-8b',
    'messages' => $finalMessages,
    'stream' => false, // DISABLED IO STREAMING
    'temperature' => 0.2
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer {$CEREBRAS_API_KEY}",
    "Content-Type: application/json"
]);
// Safe workaround for some cPanel environments with outdated CA bundles
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo json_encode(['error' => 'CURL Connection Error: ' . curl_error($ch)]);
} else {
    // Analyze Response
    if ($httpCode !== 200) {
        // API returned an error (401, 400, 500, etc.)
        $errorContent = "Cerebras API Error ($httpCode): " . $response;
        // Strip keys/secrets if possible, but raw response is needed for debug
        // Wrap in fake delta for frontend
        echo "data: " . json_encode(['choices' => [['delta' => ['content' => "**ERROR**: " . $errorContent]]]]) . "\n\n";
    } else {
        $json = json_decode($response, true);
        $content = $json['choices'][0]['message']['content'] ?? "Error parsing JSON: " . substr($response, 0, 100);
        
        // Success
        echo "data: " . json_encode(['choices' => [['delta' => ['content' => $content]]]]) . "\n\n";
    }
    echo "data: [DONE]\n\n";
}
curl_close($ch);
?>
