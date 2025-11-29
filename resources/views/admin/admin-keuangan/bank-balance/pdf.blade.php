<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bank Statement - {{ $bank->bank_name }}</title>
    <style>
        @page { margin: 18mm 16mm; }
        body {
            font-family: "Courier New", Courier, monospace;
            font-size: 11px;
            color: #000;
            margin: 0;
            padding: 0;
        }
        .header { margin-bottom: 12px; }
        .title { font-size: 16px; font-weight: bold; }
        .subtitle { font-size: 12px; }
        .meta { font-size: 10px; margin-top: 4px; }
        table { width: 100%; border-collapse: collapse; }
        .summary { table-layout: fixed; }
        .summary td { padding: 6px; border: 1px solid #000; }
        .summary .label { font-weight: bold; }
        .transactions {
            table-layout: fixed;
            border-collapse: collapse;
            width: 100%;
        }
        .transactions th, .transactions td {
            padding: 6px 5px;
            border-bottom: 1px solid #000;
            text-align: left;
            vertical-align: top;
        }
        .transactions th { border-top: 1px solid #000; }
        .col-date { width: 12%; }
        .col-desc { width: 28%; }
        .col-type { width: 10%; }
        .col-debit { width: 12%; }
        .col-credit { width: 12%; }
        .col-balance { width: 14%; }
        .col-notes { width: 12%; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .notes { font-size: 10px; }
    </style>
</head>
<body>
    @php
        $runningBalance = $openingBalance;
    @endphp
    <div class="header">
        <div class="title">BANK STATEMENT</div>
        <div class="subtitle">{{ $bank->bank_name }} - {{ $bank->account_name }} ({{ $bank->account_number }})</div>
        <div class="meta">
            Generated: {{ $generatedAt->format('d M Y H:i') }}<br>
            Opening Balance: {{ number_format($openingBalance, 2, '.', ',') }}
        </div>
    </div>

    <table class="summary" style="margin-bottom: 12px;">
        @php
            $totalDebit = $transactions->where('transaction_type', 'debit')->sum('amount');
            $totalCredit = $transactions->where('transaction_type', 'credit')->sum('amount');
            $closingBalance = $openingBalance + $totalCredit - $totalDebit;
        @endphp
        <tr>
            <td class="label">Opening</td>
            <td class="text-right">{{ number_format($openingBalance, 2, '.', ',') }}</td>
            <td class="label">Total Credit</td>
            <td class="text-right">{{ number_format($totalCredit, 2, '.', ',') }}</td>
        </tr>
        <tr>
            <td class="label">Total Debit</td>
            <td class="text-right">{{ number_format($totalDebit, 2, '.', ',') }}</td>
            <td class="label">Closing</td>
            <td class="text-right">{{ number_format($closingBalance, 2, '.', ',') }}</td>
        </tr>
    </table>

    <table class="transactions">
        <thead>
            <tr>
                <th class="col-date">Date</th>
                <th class="col-desc">Description</th>
                <th class="col-type text-center">Type</th>
                <th class="col-debit text-right">Debit</th>
                <th class="col-credit text-right">Credit</th>
                <th class="col-balance text-right">Balance</th>
                <th class="col-notes">Notes</th>
            </tr>
        </thead>
        <tbody>
            @forelse($transactions as $txn)
                @php
                    $amount = (float) $txn->amount;
                    if ($txn->transaction_type === 'credit') {
                        $runningBalance += $amount;
                    } elseif ($txn->transaction_type === 'debit') {
                        $runningBalance -= $amount;
                    }
                @endphp
                <tr>
                    <td>{{ \Carbon\Carbon::parse($txn->transaction_date)->format('d M Y') }}</td>
                    <td>{{ $txn->description ?? '-' }}</td>
                    <td class="text-center">{{ ucfirst($txn->transaction_type) }}</td>
                    <td class="text-right">{{ $txn->transaction_type === 'debit' ? number_format($amount, 2, '.', ',') : '' }}</td>
                    <td class="text-right">{{ $txn->transaction_type === 'credit' ? number_format($amount, 2, '.', ',') : '' }}</td>
                    <td class="text-right">{{ number_format($runningBalance, 2, '.', ',') }}</td>
                    <td class="notes">{{ $txn->reference_type ?? '' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="7" class="text-center" style="padding: 10px;">No transactions.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
