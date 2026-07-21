<?php
/**
 * Konfigurasi Database iNikah
 * Copy file ini ke config.php dan isi dengan kredensial yang benar.
 * JANGAN commit config.php ke git.
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'YOUR_DATABASE_NAME');
define('DB_USER', 'YOUR_DATABASE_USER');
define('DB_PASS', 'YOUR_DATABASE_PASSWORD');

// Buat string acak 64 karakter untuk secret token
// Generator: php -r "echo bin2hex(random_bytes(32));"
define('INIKAH_SECRET', 'GENERATE_RANDOM_64_CHAR_STRING_HERE');
define('ADMIN_PASSWORD', 'GANTI_PASSWORD_ADMIN');
define('PETUGAS_PASSWORD', 'GANTI_PASSWORD_PETUGAS');

// Koneksi PDO
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Koneksi database gagal']);
    exit;
}

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Helper: bersihkan input
function clean($str) {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}
