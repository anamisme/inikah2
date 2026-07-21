<?php
/**
 * Konfigurasi Database iNikah
 * Ganti nilai di bawah sesuai dengan database cPanel kamu
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'uifodiej_inikah2');      // sesuaikan dengan nama database
define('DB_USER', 'uifodiej_inikah2');      // sesuaikan dengan user database
define('DB_PASS', 'Baitulhikmah*1'); // ganti dengan password database

// ── Kredensial rahasia (JANGAN commit ke git) ──
define('INIKAH_SECRET', 'GANTI_DENGAN_STRING_ACAK_PANJANG_64_KARAKTER');
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

// CORS headers (supaya frontend bisa akses API)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Helper: bersihkan input
function clean($str) {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}
