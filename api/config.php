<?php
/**
 * Konfigurasi Database iNikah
 * JANGAN commit file ini ke git.
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'uifodiej_inikah2');
define('DB_USER', 'uifodiej_inikah2');
define('DB_PASS', 'Baitulhikmah*1');

define('INIKAH_SECRET', 'a7f3b2e9c1d84f6a9b5e2d7c3f8a1b6e4d9c2f7a8b3e6d1c5f4a9b2e7d8c3f6a');
define('ADMIN_PASSWORD', 'kuakarangdadap2024');
define('PETUGAS_PASSWORD', 'petugaskua2024');

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

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

function clean($str) {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}
