<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>General Expenses Report</title>
    <style>
        @page { size: A4; margin: 18mm 14mm; }
        body { font-family: courier, monospace; font-size: 9pt; color: #000; }
        h1 { margin: 0 0 4px 0; font-size: 14pt; letter-spacing: 1px; }
        h2 { margin: 2px 0 10px 0; font-size: 11pt; }
        .header { border-bottom: 2px solid #1f3b2c; padding-bottom: 6px; margin-bottom: 10px; }
        .meta { font-size: 8pt; margin-bottom: 6px; }
        .meta span { display: inline-block; margin-right: 12px; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #2e5b3a; color: #fff; padding: 6px 4px; text-align: left; font-weight: bold; }
        td { padding: 5px 4px; border-bottom: 1px solid #ddd; }
        tr:nth-child(even) td { background: #f7f9f7; }
        .right { text-align: right; }
        .total-row td { border-top: 2px solid #000; font-weight: bold; background: #eef3ee; }
        .small { font-size: 8pt; }
    </style>
<?php
    $periodLabel = '-';
    if (!empty($filters['period'])) {
        $periodLabel = $filters['period'];
    } elseif (!empty($filters['month']) && !empty($filters['year'])) {
        $periodLabel = sprintf('%02d-%04d', $filters['month'], $filters['year']);
    }
?>
</head>
<body>
    <div class="header">
        <h1>PT. ESHAKA WIJAYA LOGISTICS</h1>
        <h2>General Expenses Report</h2>
        <div class="meta">
            <span>Period: {{ $periodLabel }}</span>
            @if($filters['expense_date']) <span>Date: {{ $filters['expense_date'] }}</span>@endif
            @if($filters['category']) <span>Category: {{ $filters['category'] }}</span>@endif
            @if($filters['status']) <span>Status: {{ strtoupper($filters['status']) }}</span>@endif
            <span>Generated: {{ $generatedAt->format('Y-m-d H:i') }}</span>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 12%;">Date</th>
                <th style="width: 18%;">Category</th>
                <th style="width: 30%;">Description</th>
                <th style="width: 12%;">Status</th>
                <th style="width: 12%;">Items</th>
                <th style="width: 16%;" class="right">Amount</th>
            </tr>
        </thead>
        <tbody>
            @forelse($expenses as $exp)
                <tr>
                    <td>{{ optional($exp->expense_date)->format('Y-m-d') }}</td>
                    <td>{{ $exp->category }}</td>
                    <td>{{ $exp->notes ?? '-' }}</td>
                    <td>{{ strtoupper($exp->status) }}</td>
                    <td>{{ $exp->items->count() }}</td>
                    <td class="right">{{ number_format($exp->total_amount, 2) }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" class="small">No data.</td>
                </tr>
            @endforelse
            <tr class="total-row">
                <td colspan="5">TOTAL</td>
                <td class="right">{{ number_format($totalAmount, 2) }}</td>
            </tr>
        </tbody>
    </table>
</body>
</html>
