<?php
/**
 * API Daftar Sertifikat (Link Khusus)
 * Endpoint khusus untuk halaman daftar penerima sertifikat.
 * Dilindungi dengan token rahasia via URL parameter.
 *
 * GET ?token=<SERTIFIKAT_LIST_TOKEN>
 *
 * Mengembalikan daftar sertifikat: nama, link, tanggal
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json');

$token = $_GET['token'] ?? '';

if (!$token) {
    http_response_code(401);
    echo json_encode(['error' => 'Token diperlukan.']);
    exit;
}

// Validasi token: cek dari config.php, fallback ke hardcoded
$validToken = defined('SERTIFIKAT_LIST_TOKEN') ? SERTIFIKAT_LIST_TOKEN : 'sertifikat_kua_karangdadap_2024';

if (!hash_equals($validToken, $token)) {
    http_response_code(401);
    echo json_encode(['error' => 'Token tidak valid.']);
    exit;
}

try {
    $stmt = $pdo->query("SELECT nama, link, tanggal FROM sertifikat ORDER BY tanggal DESC");
    $rows = $stmt->fetchAll();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Gagal mengambil data: ' . $e->getMessage()]);
    exit;
}

$result = [];
foreach ($rows as $row) {
    $tgl = $row['tanggal'];
    if ($tgl && strtotime($tgl) !== false) {
        $tgl = date('d M Y, H:i', strtotime($tgl));
    } elseif (!$tgl) {
        $tgl = '-';
    }
    $result[] = [
        'nama'    => $row['nama'],
        'link'    => $row['link'],
        'tanggal' => $tgl
    ];
}

echo json_encode($result);
