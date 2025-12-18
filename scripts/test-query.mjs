import { pipeline } from '@xenova/transformers';

const QUERY = "player A made his last move, with no tiles left in the bag, then instead of pausing the timer, he passed it, like it was player B's turn to play, then player B insisted that he must make a move, but player A says he can't, because there are no more tiles in the bag. what's your ruling?";

async function main() {
    console.log("Generating embedding...");
    // @ts-ignore
    const pipe = await pipeline('feature-extraction', 'Xenova/gte-small');
    const output = await pipe(QUERY, { pooling: 'mean', normalize: true });
    const embedding = Array.from(output.data);

    console.log("Sending to proxy...");
    const response = await fetch('http://localhost:8000/panasa-bot.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages: [{ role: 'user', content: QUERY }],
            embedding: embedding
        })
    });

    if (!response.ok) {
        console.error("Error:", response.status, await response.text());
        return;
    }

    // Read stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    console.log("\n--- CHATBOT RESPONSE ---\n");
    let buffer = "";
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        const lines = buffer.split('\n');
        buffer = lines.pop(); // Keep incomplete line

        for (const line of lines) {
            if (line.startsWith('data: ')) {
                const jsonStr = line.slice(6);
                if (jsonStr === '[DONE]') continue;
                try {
                    const json = JSON.parse(jsonStr);
                    const content = json.choices[0]?.delta?.content || "";
                    process.stdout.write(content);
                } catch (e) {
                    // ignore parse errors for partial chunks
                }
            }
        }
    }
    console.log("\n\n--- END ---");
}

main().catch(console.error);
