<?php
// Simple Diagnostic Script
echo "<h1>PHP Status: OK</h1>";
echo "<p>Running PHP version: " . phpversion() . "</p>";

// Check cURL support
if (function_exists('curl_init')) {
    echo "<p>✅ cURL is enabled.</p>";
} else {
    echo "<p>❌ cURL is NOT enabled. Chatbot requires cURL.</p>";
}

// Check JSON support
if (function_exists('json_decode')) {
    echo "<p>✅ JSON support is enabled.</p>";
} else {
    echo "<p>❌ JSON support is NOT enabled.</p>";
}

// Check config.php
if (file_exists('config.php')) {
    echo "<p>✅ config.php found.</p>";
    $config = include('config.php');
    if ($config && isset($config['SUPABASE_URL'])) {
        echo "<p>✅ config.php loaded successfully. SUPABASE_URL starts with: " . substr($config['SUPABASE_URL'], 0, 10) . "...</p>";
    } else {
        echo "<p>❌ config.php found but invalid or missing keys.</p>";
    }
} else {
    echo "<p>❌ config.php NOT found.</p>";
}
?>
