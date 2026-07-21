<?php
/**
 * Force download file - memaksa browser/WebView untuk download
 * Usage: api/download.php?file=uploads/sertifikat/nama.png
 */

$file = $_GET['file'] ?? '';

// Sanitasi: hanya izinkan file dari folder uploads
if (!$file || strpos($file, '..') !== false || !preg_match('/^uploads\//', $file)) {
    http_response_code(400);
    echo 'Invalid file';
    exit;
}

// Normalisasi path dan cek apakah resolved path masih di dalam project
$fullPath = realpath(__DIR__ . '/../' . $file);
$projectRoot = realpath(__DIR__ . '/..');

if (!$fullPath || strpos($fullPath, $projectRoot) !== 0) {
    http_response_code(403);
    echo 'Access denied';
    exit;
}

if (!file_exists($fullPath) || is_dir($fullPath)) {
    http_response_code(404);
    echo 'File not found';
    exit;
}

// Hanya izinkan file tertentu
$allowedExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'pdf'];
$ext = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));
if (!in_array($ext, $allowedExtensions)) {
    http_response_code(403);
    echo 'File type not allowed';
    exit;
}

$filename = basename($fullPath);
$mime = mime_content_type($fullPath) ?: 'application/octet-stream';

header('Content-Type: ' . $mime);
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . filesize($fullPath));
header('Cache-Control: no-cache, must-revalidate');

readfile($fullPath);
exit;
