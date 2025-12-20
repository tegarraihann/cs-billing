<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Profit Shipment Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            margin: 0;
            padding: 20px;
            color: #333;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 15px;
        }

        .header h1 {
            font-size: 18px;
            margin: 0;
            color: #2c3e50;
        }

        .header .period {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }

        .summary-section {
            background-color: #f8f9fa;
            padding: 15px;
            margin-bottom: 20px;
            border: 1px solid #dee2e6;
            border-radius: 5px;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 15px;
        }

        .summary-item {
            text-align: center;
        }

        .summary-item .label {
            font-size: 9px;
            color: #666;
            margin-bottom: 5px;
        }

        .summary-item .value {
            font-size: 12px;
            font-weight: bold;
            color: #2c3e50;
        }

        .profit { color: #27ae60; }
        .loss { color: #e74c3c; }
        .neutral { color: #95a5a6; }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 9px;
        }

        .data-table th {
            background-color: #34495e;
            color: white;
            padding: 8px 5px;
            text-align: left;
            font-weight: bold;
            border: 1px solid #2c3e50;
        }

        .data-table td {
            padding: 6px 5px;
            border: 1px solid #ddd;
            vertical-align: top;
        }

        .data-table tbody tr:nth-child(even) {
            background-color: #f8f9fa;
        }

        .data-table tbody tr:hover {
            background-color: #e9ecef;
        }

        .text-right { text-align: right; }
        .text-center { text-align: center; }

        .status-badge {
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 8px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .status-excellent { background-color: #d4edda; color: #155724; }
        .status-good { background-color: #cce5ff; color: #004085; }
        .status-low { background-color: #fff3cd; color: #856404; }
        .status-loss { background-color: #f8d7da; color: #721c24; }
        .status-breakeven { background-color: #e2e3e5; color: #383d41; }

        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 8px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }

        .page-break {
            page-break-before: always;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>PROFIT SHIPMENT REPORT</h1>
        <div class="period">
            Period: {{ \Carbon\Carbon::parse($dateFrom)->format('d M Y') }} - {{ \Carbon\Carbon::parse($dateTo)->format('d M Y') }}
        </div>
        <div class="period">
            Generated on: {{ $generatedAt->format('d M Y H:i') }}
        </div>
    </div>

    <!-- Summary Section -->
    <div class="summary-section">
        <h3 style="margin-top: 0; margin-bottom: 15px; color: #2c3e50;">Summary Overview</h3>
        <div class="summary-grid">
            <div class="summary-item">
                <div class="label">Total Revenue</div>
                <div class="value">Rp {{ number_format($summary['total_revenue'], 0, ',', '.') }}</div>
            </div>
            <div class="summary-item">
                <div class="label">Total Costs</div>
                <div class="value">Rp {{ number_format($summary['total_costs'], 0, ',', '.') }}</div>
            </div>
            <div class="summary-item">
                <div class="label">Total Tax Expense</div>
                <div class="value">Rp {{ number_format($summary['total_tax_expense'] ?? 0, 0, ',', '.') }}</div>
            </div>
            <div class="summary-item">
                <div class="label">Total Profit</div>
                <div class="value {{ $summary['total_profit'] >= 0 ? 'profit' : 'loss' }}">
                    Rp {{ number_format($summary['total_profit'], 0, ',', '.') }}
                </div>
            </div>
            <div class="summary-item">
                <div class="label">Average Margin</div>
                <div class="value {{ $summary['average_profit_margin'] >= 0 ? 'profit' : 'loss' }}">
                    {{ number_format($summary['average_profit_margin'], 1) }}%
                </div>
            </div>
        </div>

        <div style="margin-top: 15px; text-align: center;">
            <strong>Shipment Analysis:</strong>
            <span style="color: #27ae60;">{{ $summary['profitable_shipments'] }} Profitable</span> |
            <span style="color: #e74c3c;">{{ $summary['loss_shipments'] }} Loss</span> |
            <span style="color: #95a5a6;">{{ $summary['breakeven_shipments'] ?? 0 }} Break-even</span>
        </div>
    </div>

    <!-- Data Table -->
    <table class="data-table">
        <thead>
            <tr>
                <th style="width: 12%;">SO Number</th>
                <th style="width: 18%;">Customer</th>
                <th style="width: 10%;">Date</th>
                <th style="width: 12%;">Revenue</th>
                <th style="width: 11%;">Costs</th>
                <th style="width: 11%;">Tax Expense</th>
                <th style="width: 11%;">Profit</th>
                <th style="width: 7%;">Margin</th>
                <th style="width: 7%;">Status</th>
                <th style="width: 7%;">Invoice Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse($profitData as $data)
            <tr>
                <td>{{ $data['sales_order']->order_number }}</td>
                <td>{{ $data['sales_order']->customer->company_name ?? $data['sales_order']->customer ?? 'N/A' }}</td>
                <td class="text-center">{{ $data['sales_order']->created_at->format('d/m/Y') }}</td>
                <td class="text-right">Rp {{ number_format($data['revenue'], 0, ',', '.') }}</td>
                <td class="text-right">Rp {{ number_format($data['costs'], 0, ',', '.') }}</td>
                <td class="text-right">Rp {{ number_format($data['tax_expense'] ?? 0, 0, ',', '.') }}</td>
                <td class="text-right {{ $data['profit'] >= 0 ? 'profit' : 'loss' }}">
                    Rp {{ number_format($data['profit'], 0, ',', '.') }}
                </td>
                <td class="text-right {{ $data['profit_margin'] >= 0 ? 'profit' : 'loss' }}">
                    {{ number_format($data['profit_margin'], 1) }}%
                </td>
                <td class="text-center">
                    <span class="status-badge status-{{ $data['profit_status'] }}">
                        {{ ucfirst($data['profit_status']) }}
                    </span>
                </td>
                <td class="text-center">
                    @if($data['sales_order']->invoices->count() > 0)
                        {{ $data['sales_order']->invoices->first()->status ?? 'N/A' }}
                    @else
                        No Invoice
                    @endif
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="10" class="text-center" style="padding: 20px; color: #666;">
                    No profit data available for the selected period
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        <div>© {{ date('Y') }} Eshaka Wijaya Logistics - Profit Shipment Report</div>
        <div>This report is confidential and generated automatically by the system</div>
    </div>
</body>
</html>
