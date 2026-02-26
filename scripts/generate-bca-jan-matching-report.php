<?php

use App\Models\BankBalance;
use App\Models\BankTransaction;
use Carbon\Carbon;

$bankAccountId = 2; // BCA
$periodMonth = '2026-01';
$startDate = Carbon::createFromFormat('Y-m', $periodMonth)->startOfMonth()->toDateString();
$endDate = Carbon::createFromFormat('Y-m', $periodMonth)->endOfMonth()->toDateString();

$outputDir = base_path('dokumen');
if (!is_dir($outputDir)) {
    mkdir($outputDir, 0777, true);
}

$detailCsvPath = $outputDir . DIRECTORY_SEPARATOR . 'bca-jan-2026-matching-report.csv';
$groupedCsvPath = $outputDir . DIRECTORY_SEPARATOR . 'bca-jan-2026-outflow-grouped.csv';
$summaryTxtPath = $outputDir . DIRECTORY_SEPARATOR . 'bca-jan-2026-summary.txt';

$transactions = BankTransaction::query()
    ->where('bank_account_id', $bankAccountId)
    ->whereBetween('transaction_date', [$startDate, $endDate])
    ->orderBy('transaction_date')
    ->orderBy('id')
    ->get([
        'id',
        'transaction_date',
        'transaction_type',
        'amount',
        'description',
        'reference_type',
        'reference_id',
    ]);

$opening = (float) (BankBalance::query()
    ->where('bank_account_id', $bankAccountId)
    ->where('period_month', $periodMonth)
    ->value('opening_balance') ?? 0);

$totalInflow = 0.0;
$totalOutflow = 0.0;

$detailHandle = fopen($detailCsvPath, 'w');
fputcsv($detailHandle, [
    'row_no',
    'transaction_id',
    'transaction_date',
    'transaction_type',
    'amount',
    'reference_type',
    'reference_id',
    'description',
    'manual_status',
    'manual_note',
]);

$rowNo = 1;
foreach ($transactions as $transaction) {
    $amount = (float) $transaction->amount;
    if ($transaction->transaction_type === 'credit') {
        $totalInflow += $amount;
    } else {
        $totalOutflow += $amount;
    }

    fputcsv($detailHandle, [
        $rowNo,
        $transaction->id,
        optional($transaction->transaction_date)->format('Y-m-d'),
        $transaction->transaction_type,
        number_format($amount, 2, '.', ''),
        $transaction->reference_type,
        $transaction->reference_id,
        trim((string) $transaction->description),
        '', // manual_status: MATCH / MISSING / WRONG_AMOUNT / WRONG_DATE / REMOVE
        '', // manual_note
    ]);

    $rowNo++;
}
fclose($detailHandle);

$closing = round($opening + $totalInflow - $totalOutflow, 2);

$outflowGrouped = BankTransaction::query()
    ->where('bank_account_id', $bankAccountId)
    ->whereBetween('transaction_date', [$startDate, $endDate])
    ->where('transaction_type', 'debit')
    ->selectRaw('description, COUNT(*) AS item_count, SUM(amount) AS total_amount')
    ->groupBy('description')
    ->orderByDesc('total_amount')
    ->get();

$groupedHandle = fopen($groupedCsvPath, 'w');
fputcsv($groupedHandle, [
    'description',
    'item_count',
    'total_outflow_amount',
    'manual_status',
    'manual_note',
]);

foreach ($outflowGrouped as $item) {
    fputcsv($groupedHandle, [
        trim((string) $item->description),
        (int) $item->item_count,
        number_format((float) $item->total_amount, 2, '.', ''),
        '',
        '',
    ]);
}
fclose($groupedHandle);

$summaryLines = [
    'BCA JANUARY 2026 - MATCHING SUMMARY',
    '===================================',
    'Period: ' . $periodMonth,
    'Bank Account ID: ' . $bankAccountId,
    '',
    'Opening Balance : ' . number_format($opening, 2, '.', ''),
    'Total Inflow    : ' . number_format($totalInflow, 2, '.', ''),
    'Total Outflow   : ' . number_format($totalOutflow, 2, '.', ''),
    'Closing (Calc)  : ' . number_format($closing, 2, '.', ''),
    '',
    'Generated files:',
    '- ' . $detailCsvPath,
    '- ' . $groupedCsvPath,
];

file_put_contents($summaryTxtPath, implode(PHP_EOL, $summaryLines) . PHP_EOL);

echo "DONE\n";
echo $summaryTxtPath . PHP_EOL;
echo $detailCsvPath . PHP_EOL;
echo $groupedCsvPath . PHP_EOL;
