import https from 'https';

const options = {
    hostname: 'dbuegnixoxtagpeatgjl.supabase.co',
    path: '/functions/v1/panasa-bot',
    method: 'OPTIONS',
    headers: {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type, authorization, apikey',
        'Origin': 'https://orbitron-web.vercel.app' // Simulate a production origin
    }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log('--- RESPONSE HEADERS ---');
    console.log(JSON.stringify(res.headers, null, 2));
    console.log('------------------------');
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.end();
