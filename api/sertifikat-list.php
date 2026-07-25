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

// Validasi token sederhana: harus sama dengan SERTIFIKAT_LIST_TOKEN di config
$validToken = defined('SERTIFIKAT_LIST_TOKEN') ? SERTIFIKAT_LIST_TOKEN : '';

if (!$validToken || !hash_equals($validToken, $token)) {
    http_response_code(401);
    echo json_encode(['error' => 'Token tidak valid.']);
    exit;
}

$stmt = $pdo->query("SELECT nama, link, tanggal FROM sertifikat ORDER BY tanggal DESC");
$rows = $stmt->fetchAll();

// Format tanggal jadi lebih rapi
$result = [];
foreach ($rows as $row) {
    $result[] = [
        'nama'     => $row['nama'],
        'link'     => $row['link'],
        'tanggal'  => date('d M Y, H:i', strtotime($row['tanggal']))
    ];
}

echo json_encode($result);
