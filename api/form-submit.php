<?php
/**
 * API Submit Form Pre/Post-Test - iNikah
 * Endpoint: POST api/form-submit.php
 * Body JSON: { tipe, nama, nik, no_hp, jawaban: {...}, skor }
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Method harus POST']);
    exit;
}

// Ambil data dari body JSON
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    // Fallback ke form-data
    $input = $_POST;
}

$tipe    = clean($input['tipe'] ?? '');
$nama    = clean($input['nama'] ?? '');
$nik     = clean($input['nik'] ?? '');
$no_hp   = clean($input['no_hp'] ?? '');
$jawaban = $input['jawaban'] ?? [];

// Validasi
if (!in_array($tipe, ['pretest', 'posttest'])) {
    echo json_encode(['error' => 'Tipe harus pretest atau posttest']);
    exit;
}

if (!$nama) {
    echo json_encode(['error' => 'Nama wajib diisi']);
    exit;
}

if ($nik && (strlen($nik) !== 16 || !ctype_digit($nik))) {
    echo json_encode(['error' => 'NIK harus 16 digit angka']);
    exit;
}

if (empty($jawaban)) {
    echo json_encode(['error' => 'Jawaban tidak boleh kosong']);
    exit;
}

// Kunci jawaban server-side
$KUNCI = [
    'q1'=>'c','q2'=>'b','q3'=>'b','q4'=>'c','q5'=>'b','q6'=>'b','q7'=>'c','q8'=>'a','q9'=>'b','q10'=>'b',
    'q11'=>'b','q12'=>'a','q13'=>'b','q14'=>'a','q15'=>'a','q16'=>'a','q17'=>'b','q18'=>'b','q19'=>'b','q20'=>'b',
    'q21'=>'a','q22'=>'b','q23'=>'b','q24'=>'a','q25'=>'b','q26'=>'a','q27'=>'a','q28'=>'a','q29'=>'a','q30'=>'b',
    'q31'=>'c','q32'=>'c','q33'=>'a','q34'=>'a','q35'=>'a','q36'=>'a','q37'=>'b','q38'=>'b','q39'=>'b','q40'=>'a',
    'q41'=>'a','q42'=>'a','q43'=>'a','q44'=>'a','q45'=>'a','q46'=>'a','q47'=>'a','q48'=>'a','q49'=>'a','q50'=>'a'
];

// Hitung skor di server — ignore skor dari client
$skor = 0;
for ($i = 1; $i <= 50; $i++) {
    $key = 'q' . $i;
    if (isset($jawaban[$key]) && $jawaban[$key] === ($KUNCI[$key] ?? '')) {
        $skor += 2;
    }
}

// Simpan ke database
$stmt = $pdo->prepare("INSERT INTO jawaban_test (tipe, nama, nik, no_hp, jawaban, skor) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->execute([
    $tipe,
    $nama,
    $nik ?: null,
    $no_hp ?: null,
    json_encode($jawaban),
    $skor
]);

echo json_encode([
    'success' => true,
    'message' => 'Jawaban berhasil disimpan',
    'id' => $pdo->lastInsertId()
]);
