<?php
/**
 * API Data Keagamaan - iNikah
 *
 * GET  ?action=get&tipe=masjid|musholla|tpq  (publik)
 * POST ?action=add&token=X                    (auth petugas)
 * GET  ?action=delete&id=X&token=X            (auth petugas)
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/auth.php';

header('Content-Type: application/json');

function requireAuth() {
    $token = $_GET['token'] ?? $_POST['token'] ?? '';
    if (!$token) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        $token = str_replace('Bearer ', '', $authHeader);
    }
    if (!verifyToken($token)) {
        http_response_code(401);
        echo json_encode(['error' => 'Akses ditolak. Silakan login ulang.']);
        exit;
    }
}

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {

    case 'get':
        $tipe = clean($_GET['tipe'] ?? '');
        if (!in_array($tipe, ['masjid', 'musholla', 'tpq', 'wakaf', 'madin'])) {
            echo json_encode(['error' => 'Parameter tipe tidak valid.']);
            break;
        }
        $stmt = $pdo->prepare("SELECT id, nama, desa FROM data_keagamaan WHERE tipe = ? ORDER BY nama ASC");
        $stmt->execute([$tipe]);
        echo json_encode($stmt->fetchAll());
        break;

    case 'add':
        requireAuth();
        $tipe  = clean($_POST['tipe'] ?? $_GET['tipe'] ?? '');
        $nama  = clean($_POST['nama'] ?? $_GET['nama'] ?? '');
        $desa  = clean($_POST['desa'] ?? $_GET['desa'] ?? '');

        if (!in_array($tipe, ['masjid', 'musholla', 'tpq', 'wakaf', 'madin'])) {
            echo json_encode(['error' => 'Tipe tidak valid.']); break;
        }
        if (!$nama || !$desa) {
            echo json_encode(['error' => 'Nama dan desa wajib diisi.']); break;
        }

        $stmt = $pdo->prepare("INSERT INTO data_keagamaan (tipe, nama, desa) VALUES (?, ?, ?)");
        $stmt->execute([$tipe, $nama, $desa]);
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        break;

    case 'delete':
        requireAuth();
        $id = intval($_GET['id'] ?? 0);
        if ($id <= 0) { echo json_encode(['error' => 'ID tidak valid']); break; }

        $stmt = $pdo->prepare("DELETE FROM data_keagamaan WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;

    default:
        echo json_encode(['error' => 'Action tidak dikenal.']);
}
