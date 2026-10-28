<?php

declare(strict_types=1);

use Illuminate\Database\Connection;

/**
 * CLI default: read-only final-six-item dry-run. --apply repairs one SO atomically.
 * Programmatic callers may retain the original three-duplicate plan (finalize=false).
 * This file can also be required by tests without booting or running the CLI.
 */
final class RepairSo2608166005
{
    private const TARGETS = [
        685 => ['description' => 'PARKIR 1', 'quantity' => '1.00', 'amount' => '50000.00', 'vendor_id' => 102, 'invoice_item' => 9561, 'component' => 5262, 'ap' => 1095],
        686 => ['description' => 'TKBM 1', 'quantity' => '1.00', 'amount' => '150000.00', 'vendor_id' => 102, 'invoice_item' => 9562, 'component' => 5263, 'ap' => 1095],
        687 => ['description' => 'TKBM', 'quantity' => '2.00', 'amount' => '150000.00', 'vendor_id' => 101, 'invoice_item' => 9563, 'component' => 5261, 'ap' => 1093],
    ];

    // The reviewed legacy sources; amount is a unit rate, never a line total.
    private const FINAL_SOURCES = [
        652 => ['DELIVERY ORDER', 1, 7353728, 'SET', 19, 8644, 5684, 1067],
        653 => ['DEVOSIT CONTAINER', 1, 280000, 'SET', 19, 8645, 5685, 1067],
        662 => ['STORAGE', 1, 5677660, 'SET', 62, 8646, 5688, 1066],
        663 => ['TKBM', 1, 300000, 'SET', 19, 8647, 5686, 1067],
        664 => ['UANG KULI', 1, 100000, 'SET', 19, 8648, 5160, 1067],
        676 => ['LOLO', 1, 1643244, '20GP', 102, 9175, 5232, 1095],
        677 => ['LOLO 2', 1, 821622, '20GP', 101, 9176, 5227, 1093],
        683 => ['PARKIR', 1, 100000, 'SET', 19, 9512, 5687, 1067],
        684 => ['TBM 1', 1, 150000, '20GP', 102, 9513, 5259, 1095],
        689 => ['LOLO', 2, 821622, '20GP', 19, 9696, 5362, 1067],
        690 => ['TKBM STUFFING', 2, 50000, '20GP', 19, 9697, 5363, 1067],
        691 => ['PARKIR GUDANG', 2, 50000, '20GP', 19, 9698, 5364, 1067],
        692 => ['CHARGE LINER CONTAINER', 1, 2800000, 'SET', 19, 9699, 5365, 1067],
    ];

    private const FINAL_KEEPERS = [
        653 => ['DEPOSIT KONTAINER', 1, 2800000, 'SET'],
        664 => ['EXTRA KULI', 1, 100000, 'SET'],
        662 => ['STORAGE', 1, 5677660, 'SET'],
        689 => ['LOLO', 2, 821622, '20GP'],
        683 => ['PARKIR', 2, 50000, '20GP'],
        663 => ['TKBM', 2, 150000, '20GP'],
    ];

    private const REQUIRED_TABLES = [
        'sales_orders', 'invoices', 'invoice_items', 'reimbursement_items',
        'account_payables', 'account_payable_components', 'account_receivables',
        'account_receivable_components', 'bank_transactions', 'petty_cash_transactions',
        'profit_loss_entries', 'profit_loss_periods', 'account_payable_notes',
    ];

    private array $columns = [];
    private array $tables = [];
    private array $referenceTargets;

    public function __construct(private Connection $db, private string $backupDirectory, private bool $finalize = false)
    {
        $this->referenceTargets = self::TARGETS;
        if ($finalize) {
            foreach (self::FINAL_SOURCES as $id => $values) {
                $this->referenceTargets[$id] = array_combine(['description', 'quantity', 'amount', 'unit', 'vendor_id', 'invoice_item', 'component', 'ap'], $values);
            }
        }
    }

    public function plan(bool $lock = false): array
    {
        // MySQL may expose other local databases; only inspect this connection's schema.
        $schema = $this->db->getDriverName() === 'mysql' ? $this->db->getDatabaseName() : null;
        $this->tables = $this->db->getSchemaBuilder()->getTableListing($schema, false);
        foreach (self::REQUIRED_TABLES as $table) {
            $this->check(in_array($table, $this->tables, true), "Tabel wajib tidak ditemukan: {$table}");
        }
        if ($this->db->getDriverName() === 'mysql') {
            $engines = $this->db->select('SELECT TABLE_NAME AS table_name, ENGINE AS engine FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE()');
            foreach ($engines as $engine) {
                if (in_array($engine->table_name, self::REQUIRED_TABLES, true)) {
                    $this->check(strtolower((string) $engine->engine) === 'innodb', "Tabel {$engine->table_name} bukan InnoDB; rollback tidak dapat dijamin.");
                }
            }
        }
        $s = $this->snapshot($lock);
        $so = $this->one($s['sales_orders'], 322);
        $invoice = $this->one($s['invoices'], 308);
        $this->check($so['order_number'] === 'EWILOG2608166005', 'Identitas SO ID 322 berbeda.');
        $this->check($invoice['invoice_number'] === 'EWL2608166005' && (int) $invoice['sales_order_id'] === 322, 'Identitas invoice ID 308 berbeda.');
        $this->check(($invoice['invoice_type'] ?? '') === 'combined', 'Invoice harus bertipe combined.');
        $this->check(($invoice['currency'] ?? 'IDR') === 'IDR', 'Mata uang invoice harus IDR.');
        $this->check(!in_array($invoice['status'], ['cancelled', 'void'], true), 'Invoice sudah dibatalkan.');

        if ($this->finalize) {
            return $this->planFinal($s, $invoice);
        }

        foreach ([663 => ['TKBM', '300000.00'], 683 => ['PARKIR', '100000.00']] as $id => [$description, $rate]) {
            $keeper = $this->one($s['reimbursement_items'], $id);
            $this->same($keeper, ['description' => $description, 'quantity' => '1.00', 'amount' => $rate, 'vendor_id' => 19, 'invoice_id' => 308], "Item dipertahankan #{$id}");
        }

        $targets = array_filter($s['reimbursement_items'], fn ($r) => isset(self::TARGETS[(int) $r['id']]));
        $this->check($this->db->table('reimbursement_items')->whereIn('id', array_keys(self::TARGETS))->count() === count($targets), 'ID target ditemukan pada SO lain.');
        $this->check(count($targets) === 0 || count($targets) === 3, 'Target hanya tersisa sebagian; hentikan repair parsial.');
        $clean = count($targets) === 0;
        $this->guardReferences($s, $clean);

        if (!$clean) {
            foreach (self::TARGETS as $id => $expected) {
                $r = $this->one($s['reimbursement_items'], $id);
                $this->same($r, array_intersect_key($expected, array_flip(['description', 'quantity', 'amount', 'vendor_id'])) + ['invoice_id' => 308, 'status' => 'invoiced'], "Reimbursement #{$id}");
                $this->unpaid($r, "Reimbursement #{$id}");
                foreach (['buying_amount', 'selling_amount'] as $column) {
                    if (isset($r[$column])) {
                        $this->equalMoney($r[$column], $r['amount'], "Nilai {$column} #{$id} berbeda dari nilai legacy yang ditinjau.");
                    }
                }
                if (isset($r['selling_customer_billable'])) {
                    $this->check((bool) $r['selling_customer_billable'], "Reimbursement #{$id} tidak billable; scope berbeda.");
                }
                $line = self::money(self::cents($r['amount']) * (float) $r['quantity']);
                $item = $this->one($s['invoice_items'], $expected['invoice_item']);
                $this->same($item, [
                    'description' => 'Reimbursement - ' . $expected['description'], 'item_ref' => 'reimbursement_' . $id,
                    'item_type' => 'reimbursement', 'quantity' => $r['quantity'], 'rate' => $r['amount'],
                    'amount' => $line, 'vendor_id' => $expected['vendor_id'], 'currency' => 'IDR',
                    'include_in_customer_invoice' => 1, 'is_hidden_from_customer' => 0,
                ], "Invoice item #{$expected['invoice_item']}");
                $this->unpaid($item, "Invoice item #{$item['id']}");
                $c = $this->one($s['account_payable_components'], $expected['component']);
                $this->same($c, ['account_payable_id' => $expected['ap'], 'component_type' => 'reimbursement', 'description' => $r['description'], 'amount' => $line, 'vendor_id' => $expected['vendor_id']], "AP component #{$c['id']}");
                $related = self::json($c['related_items']);
                $this->check(($related['source'] ?? '') === 'reimbursement_items' && (int) ($related['reimbursement_item_id'] ?? 0) === $id && ($related['lookup_ref'] ?? '') === 'reimbursement_' . $id, "Referensi AP #{$c['id']} berbeda.");
                $this->unpaid($c, "AP component #{$c['id']}");
            }
        }

        $ar = $this->one($s['account_receivables'], 368);
        $this->check(count($s['account_receivables']) === 1 && (int) $ar['invoice_id'] === 308 && (int) $ar['sales_order_id'] === 322, 'AR invoice tidak tunggal atau identitas berbeda.');
        $debit = $this->one($s['account_receivable_components'], 537);
        $main = $this->one($s['account_receivable_components'], 538);
        $this->check(count($s['account_receivable_components']) === 2 && $debit['component_type'] === 'debit_note' && $main['component_type'] === 'main', 'Struktur komponen AR berubah.');
        $this->check((int) $debit['account_receivable_id'] === 368 && (int) $main['account_receivable_id'] === 368, 'Referensi header komponen AR berbeda.');
        foreach ([$invoice, $ar, $debit, $main] as $row) {
            $this->unpaid($row, 'Invoice/AR #' . $row['id']);
        }
        $totals = $this->invoiceTotals($s['invoice_items']);
        $this->equalMoney($invoice['subtotal'], $totals['subtotal'], 'Subtotal invoice tidak cocok dengan item; ada selisih di luar scope.');
        $this->equalMoney($invoice['total'], self::money(self::cents($totals['subtotal']) + self::cents($invoice['vat_amount'] ?? 0) - self::cents($invoice['down_payment_amount'] ?? 0)), 'Total invoice tidak cocok.');
        $this->equalMoney($invoice['total'], $ar['invoice_amount'], 'Invoice dan AR tidak cocok.');
        $this->equalMoney($ar['invoice_amount'], $ar['outstanding_amount'], 'Outstanding AR tidak cocok.');
        $this->equalMoney($debit['amount'], $totals['reimbursement'], 'AR debit_note dan reimbursement invoice tidak cocok.');
        $this->equalMoney($debit['amount'], $debit['outstanding_amount'], 'Outstanding debit_note tidak cocok.');
        $this->equalMoney($main['amount'], self::money(self::cents($invoice['total']) - self::cents($debit['amount'])), 'AR main tidak cocok.');
        $this->equalMoney($main['amount'], $main['outstanding_amount'], 'Outstanding main tidak cocok.');

        foreach ([1093 => 101, 1095 => 102] as $apId => $vendorId) {
            $ap = $this->one($s['account_payables'], $apId);
            $this->same($ap, ['sales_order_id' => 322, 'vendor_id' => $vendorId], "Header AP #{$apId}");
            $this->unpaid($ap, "Header AP #{$apId}");
            $components = array_filter($s['account_payable_components'], fn ($r) => (int) $r['account_payable_id'] === $apId);
            $this->check(count($components) > 0, "AP #{$apId} tidak memiliki komponen.");
            foreach ($components as $c) {
                $this->unpaid($c, "AP component #{$c['id']}");
                $this->equalMoney($c['amount'], $c['outstanding_amount'], "Outstanding AP component #{$c['id']} tidak cocok.");
            }
            $sum = $this->sum($components, 'amount');
            $this->equalMoney($ap['amount'], $sum, "Header AP #{$apId} tidak cocok dengan komponennya.");
            $this->equalMoney($ap['outstanding_amount'], $sum, "Outstanding AP #{$apId} tidak cocok.");
        }

        $warnings = $this->guardPosting($s, $invoice, $totals);
        $after = $s;
        $updates = [];
        $deletes = ['invoice_items' => [], 'account_payable_components' => [], 'reimbursement_items' => []];
        if (!$clean) {
            foreach (self::TARGETS as $id => $target) {
                $deletes['reimbursement_items'][] = $id;
                $deletes['invoice_items'][] = $target['invoice_item'];
                $deletes['account_payable_components'][] = $target['component'];
            }
            foreach ($deletes as $table => $ids) {
                $after[$table] = array_values(array_filter($after[$table], fn ($r) => !in_array((int) $r['id'], $ids, true)));
            }
            $newTotals = $this->invoiceTotals($after['invoice_items']);
            $this->equalMoney(self::money(self::cents($totals['subtotal']) - self::cents($newTotals['subtotal'])), '500000.00', 'Delta invoice harus Rp500.000.');
            $this->check($totals['gross_revenue'] === $newTotals['gross_revenue'] && $totals['operational_costs'] === $newTotals['operational_costs'], 'Basis profit berubah; perlu repair posting terpisah.');
            $newTotal = self::money(self::cents($invoice['total']) - 50000000);
            $updates['invoices'][308] = ['subtotal' => $newTotals['subtotal'], 'total' => $newTotal];
            $updates['account_receivable_components'][537] = ['amount' => $newTotals['reimbursement'], 'outstanding_amount' => $newTotals['reimbursement'], 'status' => $this->arStatus($debit['due_date'] ?? $ar['due_date'] ?? null)];
            $updates['account_receivables'][368] = ['invoice_amount' => $newTotal, 'outstanding_amount' => $newTotal, 'status' => $this->arStatus($ar['due_date'] ?? null)];
            foreach ([1093 => '300000.00', 1095 => '200000.00'] as $id => $reduction) {
                $components = array_filter($after['account_payable_components'], fn ($r) => (int) $r['account_payable_id'] === $id);
                $ap = $this->one($s['account_payables'], $id);
                $amount = $this->sum($components, 'amount');
                $this->equalMoney(self::money(self::cents($ap['amount']) - self::cents($amount)), $reduction, "Delta AP #{$id} tidak cocok.");
                $updates['account_payables'][$id] = [
                    'amount' => $amount, 'outstanding_amount' => $amount,
                    'status' => $ap['status'], 'service_description' => $this->cleanDescription($ap, $components, $s['account_payable_components']),
                ];
            }
            foreach ($updates as $table => $changes) {
                foreach ($after[$table] as &$row) {
                    if (isset($changes[(int) $row['id']])) {
                        $row = array_replace($row, $changes[(int) $row['id']]);
                    }
                }
                unset($row);
            }
        }

        return ['clean' => $clean, 'before' => $s, 'after' => $after, 'updates' => $updates, 'deletes' => $deletes, 'warnings' => $warnings, 'fingerprint' => hash('sha256', json_encode($s, JSON_THROW_ON_ERROR))];
    }

    private function planFinal(array $s, array $invoice): array
    {
        $ids = array_map('intval', array_column($s['reimbursement_items'], 'id'));
        $all = array_keys($this->referenceTargets);
        $intermediate = array_keys(self::FINAL_SOURCES);
        $keepers = array_keys(self::FINAL_KEEPERS);
        sort($ids);
        sort($all);
        sort($intermediate);
        sort($keepers);
        $clean = $ids === $keepers;
        $this->check($clean || $ids === $all || $ids === $intermediate, 'Daftar sumber berbeda/parsial: hanya kondisi 16, 13, atau enam item final yang ditinjau dapat diproses.');
        $this->check($this->db->table('reimbursement_items')->whereIn('id', $all)->count() === count($ids), 'ID reimbursement target ditemukan pada SO lain.');
        $active = array_intersect_key($this->referenceTargets, array_flip($ids));
        $this->guardReferences($s, false, $active);
        $this->check(count(array_filter($s['invoice_items'], fn ($r) => $r['item_type'] === 'reimbursement')) === count($ids), 'Invoice memiliki reimbursement tambahan di luar pemetaan.');
        $after = $s;
        $updates = [];
        $deletes = ['invoice_items' => [], 'account_payable_components' => [], 'reimbursement_items' => []];

        foreach ($active as $id => $source) {
            $expected = array_intersect_key($source, array_flip(['description', 'quantity', 'amount', 'unit', 'vendor_id']));
            if ($clean) {
                [$expected['description'], $expected['quantity'], $expected['amount'], $expected['unit']] = self::FINAL_KEEPERS[$id];
            }
            $r = $this->one($s['reimbursement_items'], $id);
            $this->same($r, $expected + ['invoice_id' => 308, 'sales_order_id' => 322, 'status' => 'invoiced'], "Sumber #{$id}");
            $this->unpaid($r, "Sumber #{$id}");
            $this->check(!array_key_exists('selling_amount', $r) && !array_key_exists('buying_amount', $r), 'Schema buying/selling baru belum termasuk repair legacy yang ditinjau.');
            $line = self::money(self::cents($r['amount']) * (float) $r['quantity']);
            $this->equalMoney($r['customer_outstanding_amount'], $line, "Outstanding sumber #{$id} berbeda.");
            $metadata = ['quantity' => (float) $r['quantity'], 'unit' => $r['unit'], 'unit_price' => (float) $r['amount']];
            $this->same(self::json($r['receipt_info']), $metadata + ['currency' => 'IDR'], "Receipt #{$id}");
            $item = $this->one($s['invoice_items'], $source['invoice_item']);
            $this->same($item, [
                'invoice_id' => 308, 'description' => 'Reimbursement - ' . $r['description'],
                'quantity' => $r['quantity'], 'unit' => $r['unit'], 'rate' => $r['amount'], 'amount' => $line,
                'vendor_id' => $r['vendor_id'], 'item_ref' => 'reimbursement_' . $id, 'item_type' => 'reimbursement',
                'currency' => 'IDR', 'include_in_customer_invoice' => 1, 'is_hidden_from_customer' => 0,
            ], "Invoice item #{$item['id']}");
            $this->unpaid($item, "Invoice item #{$item['id']}");
            $c = $this->one($s['account_payable_components'], $source['component']);
            $this->same($c, ['account_payable_id' => $source['ap'], 'component_type' => 'reimbursement', 'description' => $r['description'], 'amount' => $line, 'vendor_id' => $r['vendor_id']], "AP component #{$c['id']}");
            $related = self::json($c['related_items']);
            $this->same($related, $metadata + ['source' => 'reimbursement_items', 'reimbursement_item_id' => $id, 'lookup_ref' => 'reimbursement_' . $id], "Referensi AP #{$c['id']}");
            $this->unpaid($c, "AP component #{$c['id']}");
            if (!isset(self::FINAL_KEEPERS[$id])) {
                $deletes['reimbursement_items'][] = $id;
                $deletes['invoice_items'][] = $source['invoice_item'];
                $deletes['account_payable_components'][] = $source['component'];
                continue;
            }
            [$description, $qty, $rate, $unit] = self::FINAL_KEEPERS[$id];
            $newLine = self::money(self::cents($rate) * $qty);
            $newMetadata = ['quantity' => $qty, 'unit' => $unit, 'unit_price' => $rate];
            $this->propose($s, $after, $updates, 'reimbursement_items', $id, [
                'description' => $description, 'quantity' => number_format($qty, 2, '.', ''), 'unit' => $unit,
                'amount' => self::money(self::cents($rate)), 'customer_outstanding_amount' => $newLine,
                'receipt_info' => json_encode(array_replace(self::json($r['receipt_info']), $newMetadata), JSON_THROW_ON_ERROR),
            ]);
            $this->propose($s, $after, $updates, 'invoice_items', $source['invoice_item'], [
                'description' => 'Reimbursement - ' . $description, 'quantity' => number_format($qty, 2, '.', ''),
                'unit' => $unit, 'rate' => self::money(self::cents($rate)), 'amount' => $newLine, 'outstanding_amount' => $newLine,
            ]);
            $this->propose($s, $after, $updates, 'account_payable_components', $source['component'], [
                'description' => $description, 'amount' => $newLine, 'outstanding_amount' => $newLine,
                'related_items' => json_encode(array_replace($related, $newMetadata), JSON_THROW_ON_ERROR),
            ]);
        }
        foreach ($deletes as $table => $removed) {
            $after[$table] = array_values(array_filter($after[$table], fn ($r) => !in_array((int) $r['id'], $removed, true)));
        }
        $ar = $this->one($s['account_receivables'], 368);
        $debit = $this->one($s['account_receivable_components'], 537);
        $main = $this->one($s['account_receivable_components'], 538);
        $this->check(count($s['account_receivables']) === 1 && count($s['account_receivable_components']) === 2, 'Struktur AR tidak tunggal.');
        $this->same($ar, ['sales_order_id' => 322, 'invoice_id' => 308], 'AR 368');
        $this->same($debit, ['account_receivable_id' => 368, 'component_type' => 'debit_note'], 'AR 537');
        $this->same($main, ['account_receivable_id' => 368, 'component_type' => 'main', 'amount' => '11348000.00', 'outstanding_amount' => '11348000.00'], 'AR main');
        foreach ([$invoice, $ar, $debit, $main] as $row) {
            $this->unpaid($row, 'Invoice/AR #' . $row['id']);
        }
        $totals = $this->invoiceTotals($s['invoice_items']);
        $newTotals = $this->invoiceTotals($after['invoice_items']);
        $this->equalMoney($invoice['vat_amount'], 0, 'PPN berubah dari baseline nol.');
        $this->equalMoney($invoice['down_payment_amount'], 0, 'DP berubah dari baseline nol.');
        $expectedTotal = $clean ? '21968904.00' : (count($ids) === 16 ? '32917498.00' : '32417498.00');
        foreach ([$invoice['subtotal'], $invoice['total'], $ar['invoice_amount'], $ar['outstanding_amount'], $totals['subtotal']] as $value) {
            $this->equalMoney($value, $expectedTotal, 'Invoice/AR tidak sesuai baseline yang ditinjau.');
        }
        $this->equalMoney($debit['amount'], $totals['reimbursement'], 'AR debit_note berbeda dari invoice reimbursement.');
        $this->equalMoney($debit['outstanding_amount'], $debit['amount'], 'Outstanding debit_note berbeda.');
        $this->equalMoney($newTotals['reimbursement'], '10620904.00', 'Total enam reimbursement final salah.');
        $this->equalMoney($newTotals['subtotal'], '21968904.00', 'Total invoice final salah.');
        $this->check($totals['gross_revenue'] === $newTotals['gross_revenue'] && $totals['operational_costs'] === $newTotals['operational_costs'], 'Basis profit berubah.');
        $warnings = $this->guardPosting($s, $invoice, $totals);
        $this->propose($s, $after, $updates, 'invoices', 308, ['subtotal' => $newTotals['subtotal'], 'total' => $newTotals['subtotal']]);
        $this->propose($s, $after, $updates, 'account_receivables', 368, ['invoice_amount' => $newTotals['subtotal'], 'outstanding_amount' => $newTotals['subtotal']]);
        $this->propose($s, $after, $updates, 'account_receivable_components', 537, ['amount' => $newTotals['reimbursement'], 'outstanding_amount' => $newTotals['reimbursement']]);

        foreach ([1066 => [62, '5677660.00'], 1067 => [19, '5253244.00'], 1093 => [101, '3500000.00'], 1095 => [102, '3800000.00']] as $apId => [$vendor, $finalAmount]) {
            $ap = $this->one($s['account_payables'], $apId);
            $this->same($ap, ['sales_order_id' => 322, 'vendor_id' => $vendor], "AP header #{$apId}");
            $this->unpaid($ap, "AP header #{$apId}");
            $beforeComponents = array_filter($s['account_payable_components'], fn ($r) => (int) $r['account_payable_id'] === $apId);
            $remaining = array_filter($after['account_payable_components'], fn ($r) => (int) $r['account_payable_id'] === $apId);
            foreach ($beforeComponents as $c) {
                $this->unpaid($c, "AP component #{$c['id']}");
                $this->equalMoney($c['amount'], $c['outstanding_amount'], "Outstanding AP component #{$c['id']} berbeda.");
            }
            $sum = $this->sum($beforeComponents, 'amount');
            $this->equalMoney($ap['amount'], $sum, "AP header #{$apId} berbeda dari komponen.");
            $this->equalMoney($ap['outstanding_amount'], $sum, "Outstanding AP header #{$apId} berbeda.");
            $newSum = $this->sum($remaining, 'amount');
            $this->equalMoney($newSum, $finalAmount, "AP final #{$apId} berbeda dari rencana.");
            if ($apId !== 1066) {
                $this->propose($s, $after, $updates, 'account_payables', $apId, [
                    'amount' => $newSum, 'outstanding_amount' => $newSum,
                    'service_description' => implode(', ', array_unique(array_column($remaining, 'description'))),
                ]);
            }
        }
        $this->check(!$clean || $updates === [], 'Enam sumber ditemukan tetapi rincian/metadata/nominal belum final; kondisi parsial, tinjau manual.');
        return ['clean' => $clean, 'before' => $s, 'after' => $after, 'updates' => $updates, 'deletes' => $deletes, 'warnings' => $warnings, 'fingerprint' => hash('sha256', json_encode($s, JSON_THROW_ON_ERROR))];
    }

    private function propose(array $before, array &$after, array &$updates, string $table, int $id, array $fields): void
    {
        $old = $this->one($before[$table], $id);
        foreach ($fields as $column => $value) {
            $equal = in_array($column, ['receipt_info', 'related_items'], true)
                ? self::json($old[$column]) == self::json($value)
                : (is_numeric($value) ? is_numeric($old[$column]) && (float) $old[$column] === (float) $value : $old[$column] === $value);
            if ($equal) {
                continue;
            }
            $updates[$table][$id][$column] = $value;
            foreach ($after[$table] as &$row) {
                if ((int) $row['id'] === $id) {
                    $row[$column] = $value;
                    break;
                }
            }
            unset($row);
        }
    }

    public function apply(array $reviewedPlan): array
    {
        $backup = null;
        $result = $this->db->transaction(function () use ($reviewedPlan, &$backup) {
            $plan = $this->plan(true);
            $this->check($plan['fingerprint'] === $reviewedPlan['fingerprint'], 'Data berubah setelah dry-run; jalankan ulang untuk meninjau rencana terbaru.');
            if ($plan['clean']) {
                return $plan;
            }
            $backup = $this->writeBackup($plan);
            foreach ($plan['deletes'] as $table => $ids) {
                $deleted = $this->db->table($table)->whereIn('id', $ids)->delete();
                $this->check($deleted === count($ids), "Jumlah delete {$table} berbeda; rollback.");
            }
            foreach ($plan['updates'] as $table => $rows) {
                foreach ($rows as $id => $fields) {
                    $this->check($this->db->table($table)->where('id', $id)->update($fields) === 1, "Update {$table} #{$id} gagal; rollback.");
                }
            }
            $actual = $this->snapshot(true);
            $this->check($this->canonical($actual) === $this->canonical($plan['after']), 'Hasil repair berbeda dari rencana atau data non-target berubah; rollback.');
            $verified = $this->plan(true);
            $this->check($verified['clean'], 'Referensi target masih tersisa; rollback.');
            return $verified;
        });
        return ['backup' => $backup, 'result' => $result];
    }

    private function snapshot(bool $lock): array
    {
        $queries = [
            'sales_orders' => $this->db->table('sales_orders')->where('id', 322),
            'invoices' => $this->db->table('invoices')->where('id', 308),
            'reimbursement_items' => $this->db->table('reimbursement_items')->where('sales_order_id', 322),
            'invoice_items' => $this->db->table('invoice_items')->where('invoice_id', 308),
            'account_payables' => $this->db->table('account_payables')->where('sales_order_id', 322),
            'account_receivables' => $this->db->table('account_receivables')->where('invoice_id', 308)->orWhere('sales_order_id', 322),
            'account_payable_components' => $this->db->table('account_payable_components')->whereIn('account_payable_id', $this->db->table('account_payables')->where('sales_order_id', 322)->select('id')),
            'account_receivable_components' => $this->db->table('account_receivable_components')->whereIn('account_receivable_id', $this->db->table('account_receivables')->where('invoice_id', 308)->orWhere('sales_order_id', 322)->select('id')),
        ];
        $snapshot = [];
        foreach ($queries as $table => $query) {
            if ($lock) {
                $query->lockForUpdate();
            }
            $snapshot[$table] = $query->orderBy('id')->get()->map(fn ($r) => (array) $r)->all();
        }
        $postings = $this->db->table('profit_loss_entries')->where(function ($q) {
            $q->whereIn('reference_id', array_merge([322, 308, 368], array_keys($this->referenceTargets), array_column($this->referenceTargets, 'invoice_item'), array_column($this->referenceTargets, 'component'), array_column($this->referenceTargets, 'ap')))->orWhere('id', 1341);
        });
        if ($lock) {
            $postings->lockForUpdate();
        }
        $snapshot['profit_loss_entries'] = $postings->orderBy('id')->get()->map(fn ($r) => (array) $r)->all();
        $periods = $this->db->table('profit_loss_periods')->whereIn('id', array_column($snapshot['profit_loss_entries'], 'period_id'));
        if ($lock) {
            $periods->lockForUpdate();
        }
        $snapshot['profit_loss_periods'] = $periods->orderBy('id')->get()->map(fn ($r) => (array) $r)->all();
        return $snapshot;
    }

    private function guardReferences(array $s, bool $clean, ?array $activeTargets = null): void
    {
        $targetIds = array_keys($this->referenceTargets);
        $invoiceIds = array_column($this->referenceTargets, 'invoice_item');
        $componentIds = array_column($this->referenceTargets, 'component');
        $activeTargets ??= $clean ? [] : $this->referenceTargets;
        $expectedInvoiceIds = array_column($activeTargets, 'invoice_item');
        $expectedComponentIds = array_column($activeTargets, 'component');
        $invoiceRefs = [];
        $candidates = $this->db->table('invoice_items')->where(function ($q) use ($invoiceIds) {
            $q->where('item_ref', 'like', '%reimb%')->orWhere('item_ref', 'like', '%ap_component_%')->orWhereIn('id', $invoiceIds);
        });
        foreach ($candidates->cursor() as $row) {
            if ($this->containsReference(['lookup_ref' => $row->item_ref]) || in_array((int) $row->id, $invoiceIds, true)) {
                $invoiceRefs[] = (int) $row->id;
            }
        }
        sort($invoiceRefs);
        sort($expectedInvoiceIds);
        $this->check($invoiceRefs === $expectedInvoiceIds, 'Referensi invoice target hilang, tambahan, atau berada di invoice lain.');

        $found = [];
        foreach ($this->db->table('account_payable_components')->whereNotNull('related_items')->get() as $row) {
            $related = self::json($row->related_items);
            $id = (int) ($related['reimbursement_item_id'] ?? 0);
            if (in_array($id, $targetIds, true) || $this->containsReference($related)) {
                $found[] = (int) $row->id;
            }
        }
        sort($found);
        sort($expectedComponentIds);
        $this->check($found === $expectedComponentIds, 'Referensi AP target hilang, tambahan, atau berada di SO lain.');
        $this->check($this->db->table('account_payable_components')->whereIn('id', $componentIds)->count() === count($activeTargets), 'ID komponen AP target masih tersisa atau hilang.');

        // Follow logical references too: many legacy tables have no foreign keys.
        foreach ($this->tables as $table) {
            $columns = $this->columnNames($table);
            foreach ($this->db->getSchemaBuilder()->getForeignKeys($table) as $foreignKey) {
                $parts = explode('.', $foreignKey['foreign_table']);
                $referenced = end($parts);
                $ids = match ($referenced) {
                    'reimbursement_items' => $targetIds,
                    'invoice_items' => $invoiceIds,
                    'account_payable_components' => $componentIds,
                    default => [],
                };
                if ($ids !== []) {
                    $this->check(count($foreignKey['columns']) === 1 && $foreignKey['foreign_columns'] === ['id'], "Foreign key {$table} belum didukung.");
                    $this->check(!$this->db->table($table)->whereIn($foreignKey['columns'][0], $ids)->exists(), "Foreign key tambahan ditemukan pada {$table}; apply dihentikan.");
                }
            }
            foreach (['reimbursement_item_id' => $targetIds, 'invoice_item_id' => $invoiceIds, 'account_payable_component_id' => $componentIds, 'component_id' => $componentIds] as $column => $ids) {
                if (in_array($column, $columns, true)) {
                    $this->check(!$this->db->table($table)->whereIn($column, $ids)->exists(), "Referensi tambahan ditemukan: {$table}.{$column}; apply dihentikan.");
                }
            }
            $sensitive = preg_match('/payment|allocation|vendor_invoice|adjustment|posting|journal|ledger|bank|petty_cash|document_audit/i', $table);
            if ($sensitive) {
                foreach (['invoice_id' => [308], 'account_payable_id' => array_unique(array_column($this->referenceTargets, 'ap')), 'account_receivable_id' => [368], 'sales_order_id' => [322]] as $column => $ids) {
                    if (in_array($column, $columns, true)) {
                        $this->check(!$this->db->table($table)->whereIn($column, $ids)->exists(), "Data keuangan/audit terkait ditemukan di {$table}.{$column}; perlu tinjauan terpisah.");
                    }
                }
                if (in_array('reference_type', $columns, true) && in_array('reference_id', $columns, true) && $table !== 'profit_loss_entries') {
                    foreach ($this->db->table($table)->whereIn('reference_id', array_merge($targetIds, $invoiceIds, $componentIds, array_column($this->referenceTargets, 'ap'), [322, 308, 368]))->get() as $row) {
                        $this->check(!$this->relevantMorph((array) $row), "Transaksi/posting terkait ditemukan di {$table}; apply dihentikan.");
                    }
                }
            }
            foreach (array_intersect(['related_items', 'receipt_info', 'payment_history', 'additional_data'], $columns) as $column) {
                if (($table === 'account_payable_components' && $column === 'related_items') || $table === 'profit_loss_entries') {
                    continue;
                }
                $query = $this->db->table($table)->whereNotNull($column);
                if ($table === 'reimbursement_items') {
                    $query->whereNotIn('id', $targetIds);
                }
                foreach ($query->select($column)->cursor() as $row) {
                    $this->check(!$this->containsReference(self::json($row->{$column})), "Referensi JSON tambahan ditemukan di {$table}.{$column}.");
                }
            }
        }
        foreach ($s['reimbursement_items'] as $r) {
            if (isset($this->referenceTargets[(int) $r['id']])) {
                $this->check(!$this->containsReference(self::json($r['receipt_info'] ?? null)), "Target #{$r['id']} memiliki tautan pembayaran/AP tambahan.");
            }
        }
    }

    private function guardPosting(array $s, array $invoice, array $totals): array
    {
        $ids = self::json($invoice['profit_loss_entries'] ?? null);
        $warnings = [];
        foreach ($s['profit_loss_entries'] as $entry) {
            if (!$this->relevantMorph($entry) && !in_array((int) $entry['id'], array_map('intval', $ids), true)) {
                continue;
            }
            $this->check($entry['reference_type'] === 'shipment_profit' && (int) $entry['reference_id'] === 322 && $entry['entry_type'] === 'auto_shipment_profit', 'Posting terkait selain profit shipment ditemukan; perlu koreksi posting terpisah.');
            $this->check(!$this->containsReference(self::json($entry['additional_data'] ?? null)), 'Posting memiliki referensi item target.');
            $period = $this->one($s['profit_loss_periods'], (int) $entry['period_id']);
            $this->check(in_array($period['status'], ['draft', 'open'], true), 'Periode posting sudah ditutup; apply dihentikan.');
            $meta = self::json($entry['additional_data'] ?? null);
            if (array_map('intval', $meta['invoice_ids'] ?? []) === [308]) {
                $profit = self::cents($totals['gross_revenue']) - self::cents($totals['operational_costs']);
                if (self::cents($entry['amount']) !== $profit) {
                    $warnings[] = "Posting profit #{$entry['id']}=" . $entry['amount'] . ', basis item saat ini=' . self::money($profit) . '. Selisih lama di luar scope; basis profit tetap sama sesudah repair, posting dipertahankan.';
                }
            }
        }
        foreach ($ids as $id) {
            $this->one($s['profit_loss_entries'], (int) $id);
        }
        if (!empty($invoice['posted_to_profit_loss'])) {
            $this->check(count($ids) > 0, 'Invoice posted tetapi tidak memiliki referensi posting.');
        }
        foreach (['invoice_adjustments', 'accounting_postings', 'accounting_posting_lines', 'journal_entries', 'journal_lines'] as $table) {
            if (in_array($table, $this->tables, true) && $this->db->table($table)->exists()) {
                throw new RuntimeException("Schema posting baru berisi data ({$table}); script legacy tidak boleh mengoreksinya otomatis.");
            }
        }
        return $warnings;
    }

    private function relevantMorph(array $r): bool
    {
        $type = strtolower(str_replace('\\', '_', (string) ($r['reference_type'] ?? '')));
        $id = (int) ($r['reference_id'] ?? 0);
        foreach ([
            'reimbursement' => array_keys($this->referenceTargets), 'invoice_item' => array_column($this->referenceTargets, 'invoice_item'), 'invoiceitem' => array_column($this->referenceTargets, 'invoice_item'),
            'component' => array_column($this->referenceTargets, 'component'), 'payable' => array_column($this->referenceTargets, 'ap'), 'vendor_payment' => array_column($this->referenceTargets, 'ap'),
            'receivable' => [368], 'customer_payment' => [308, 368], 'invoice' => [308],
            'shipment_profit' => [322], 'sales_order' => [322], 'salesorder' => [322],
        ] as $needle => $ids) {
            if (str_contains($type, $needle) && in_array($id, $ids, true)) {
                return true;
            }
        }
        return false;
    }

    private function containsReference(array $data): bool
    {
        foreach ($data as $key => $value) {
            if (is_array($value) && $this->containsReference($value)) {
                return true;
            }
            if (in_array((string) $key, ['reimbursement_item_id', 'reimbursement_id'], true) && in_array((int) $value, array_keys($this->referenceTargets), true)) {
                return true;
            }
            if (in_array((string) $key, ['component_id', 'account_payable_component_id'], true) && in_array((int) $value, array_column($this->referenceTargets, 'component'), true)) {
                return true;
            }
            $pattern = '/(?:reimb(?:ursement)?[_-]?(?:' . implode('|', array_keys($this->referenceTargets)) . ')|ap_component_(?:' . implode('|', array_column($this->referenceTargets, 'component')) . '))(?:[^0-9]|$)/i';
            if (is_scalar($value) && preg_match($pattern, (string) $value)) {
                return true;
            }
        }
        return false;
    }

    private function unpaid(array $r, string $label): void
    {
        foreach ($r as $column => $value) {
            if (str_ends_with($column, 'paid_amount') && self::cents($value) !== 0) {
                throw new RuntimeException("{$label} memiliki pembayaran ({$column}); perlu penanganan histori terpisah.");
            }
            if (in_array($column, ['paid_at', 'customer_paid_at', 'buying_paid_at', 'selling_paid_at', 'payment_date', 'last_payment_date', 'vat_receivable_posted_at', 'vat_payable_posted_at', 'pph23_payable_posted_at'], true) && !empty($value)) {
                throw new RuntimeException("{$label} memiliki histori pembayaran/pajak ({$column}).");
            }
            if ($column === 'payment_history' && !empty(self::json($value))) {
                throw new RuntimeException("{$label} memiliki payment_history.");
            }
        }
        foreach (['status', 'payment_status', 'customer_payment_status', 'buying_payment_status', 'selling_payment_status'] as $column) {
            $this->check(!in_array($r[$column] ?? '', ['paid', 'partial', 'partially_paid'], true), "{$label} memiliki status pembayaran {$column}.");
        }
    }

    private function invoiceTotals(array $items): array
    {
        $totals = ['subtotal' => 0, 'reimbursement' => 0, 'gross_revenue' => 0, 'operational_costs' => 0];
        foreach ($items as $item) {
            $visible = (bool) $item['include_in_customer_invoice'] && !(bool) $item['is_hidden_from_customer'];
            $amount = self::cents($item['amount']);
            $totals['subtotal'] += $visible ? $amount : 0;
            $totals['reimbursement'] += $visible && $item['item_type'] === 'reimbursement' ? $amount : 0;
            $totals['gross_revenue'] += $item['item_type'] === 'billable' ? $amount : 0;
            $totals['operational_costs'] += $item['item_type'] === 'operational_cost' ? $amount : 0;
        }
        return array_map(fn ($v) => self::money($v), $totals);
    }

    private function cleanDescription(array $ap, array $remaining, array $before): string
    {
        $retained = array_map(fn ($r) => $r['description'], $remaining);
        $removed = array_map(fn ($r) => $r['description'], array_filter($before, fn ($r) => (int) $r['account_payable_id'] === (int) $ap['id'] && in_array((int) $r['id'], [5261, 5262, 5263], true)));
        $parts = preg_split('/\s*,\s*/', (string) $ap['service_description']);
        return implode(', ', array_values(array_filter($parts, fn ($p) => !in_array($p, $removed, true) || in_array($p, $retained, true))));
    }

    private function arStatus(?string $dueDate): string
    {
        return $dueDate && substr($dueDate, 0, 10) < date('Y-m-d') ? 'overdue' : 'outstanding';
    }

    private function writeBackup(array $plan): string
    {
        if (!is_dir($this->backupDirectory) && !mkdir($this->backupDirectory, 0700, true) && !is_dir($this->backupDirectory)) {
            throw new RuntimeException('Gagal membuat direktori backup.');
        }
        $path = $this->backupDirectory . '/so-322-tkbm-parkir-' . date('Ymd-His') . '-' . bin2hex(random_bytes(5)) . '.json';
        $payload = json_encode(['repair' => __FILE__, 'created_at' => date(DATE_ATOM), 'database' => $this->db->getDatabaseName(), 'plan' => $plan], JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR);
        $handle = fopen($path, 'xb');
        $this->check($handle !== false, 'Gagal membuat file backup.');
        try {
            $this->check(fwrite($handle, $payload) === strlen($payload) && fflush($handle), 'Backup tidak lengkap; repair dibatalkan.');
        } finally {
            fclose($handle);
        }
        @chmod($path, 0600);
        $this->check(hash_file('sha256', $path) === hash('sha256', $payload), 'Verifikasi file backup gagal.');
        return $path;
    }

    private function canonical(array $snapshot): string
    {
        foreach ($snapshot as &$rows) {
            foreach ($rows as &$row) {
                foreach ($row as $key => &$value) {
                    if ($value !== null && (str_ends_with($key, 'amount') || in_array($key, ['total', 'subtotal', 'quantity', 'rate'], true))) {
                        $value = self::money(self::cents($value));
                    }
                }
                unset($value);
                ksort($row);
            }
            unset($row);
        }
        unset($rows);
        ksort($snapshot);
        return json_encode($snapshot, JSON_THROW_ON_ERROR);
    }

    private function columnNames(string $table): array
    {
        return $this->columns[$table] ??= $this->db->getSchemaBuilder()->getColumnListing($table);
    }

    private function same(array $row, array $expected, string $label): void
    {
        foreach ($expected as $column => $value) {
            $actual = $row[$column] ?? null;
            $equal = is_numeric($value) ? is_numeric($actual) && abs((float) $actual - (float) $value) < 0.00001 : $actual === $value;
            $this->check($equal, "{$label}: {$column} berbeda dari identitas/nominal yang disepakati.");
        }
    }

    private function one(array $rows, int $id): array
    {
        foreach ($rows as $row) {
            if ((int) $row['id'] === $id) {
                return $row;
            }
        }
        throw new RuntimeException("Baris wajib #{$id} tidak ditemukan.");
    }

    private function sum(array $rows, string $column): string
    {
        return self::money(array_sum(array_map(fn ($r) => self::cents($r[$column]), $rows)));
    }

    private function equalMoney(mixed $a, mixed $b, string $message): void
    {
        $this->check(self::cents($a) === self::cents($b), $message);
    }

    private function check(bool $condition, string $message): void
    {
        if (!$condition) {
            throw new RuntimeException($message);
        }
    }

    private static function cents(mixed $value): int
    {
        if ($value === null || $value === '') {
            return 0;
        }
        if (!is_numeric($value) || !is_finite((float) $value)) {
            throw new RuntimeException('Nilai uang tidak valid.');
        }
        return (int) round((float) $value * 100);
    }

    private static function money(int|float $cents): string
    {
        return number_format(round($cents) / 100, 2, '.', '');
    }

    private static function json(mixed $value): array
    {
        if ($value === null || $value === '') {
            return [];
        }
        $decoded = is_array($value) ? $value : json_decode((string) $value, true, 512, JSON_THROW_ON_ERROR);
        if (!is_array($decoded)) {
            throw new RuntimeException('Metadata JSON bukan array/object.');
        }
        return $decoded;
    }
}

if (realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    try {
        $args = array_slice($argv, 1);
        foreach ($args as $arg) {
            if (!in_array($arg, ['--apply', '--help'], true)) {
                throw new RuntimeException("Opsi tidak dikenal: {$arg}");
            }
        }
        if (in_array('--help', $args, true)) {
            echo "Usage: php scripts/repair-so-ewilog2608166005-remove-duplicate-tkbm-parkir.php [--apply]\nScope: enam reimbursement final sesuai rencana 2026-10-19. Default: DRY-RUN, tanpa perubahan database/file. Tutup form SO/invoice lama sebelum apply.\n";
            exit(0);
        }
        require __DIR__ . '/../vendor/autoload.php';
        $app = require __DIR__ . '/../bootstrap/app.php';
        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
        $db = $app->make('db')->connection();
        if (!in_array($db->getDriverName(), ['mysql', 'sqlite'], true)) {
            throw new RuntimeException('Driver database tidak didukung.');
        }
        $repair = new RepairSo2608166005($db, storage_path('app/private/repair-backups'), true);
        $plan = $repair->plan();
        $apply = in_array('--apply', $args, true);
        echo ($apply ? 'APPLY' : 'DRY-RUN') . ' | database=' . $db->getDatabaseName() . " | SO EWILOG2608166005 | Invoice EWL2608166005\n";
        foreach ($plan['warnings'] as $warning) {
            echo "CATATAN: {$warning}\n";
        }
        if ($plan['clean']) {
            echo "SUDAH FINAL: enam sumber beserta invoice/AP/AR dan metadata sesuai; tidak ada perubahan kedua.\n";
        } else {
            foreach ($plan['deletes'] as $table => $ids) {
                echo "DELETE {$table}: " . implode(', ', $ids) . "\n";
            }
            foreach ($plan['updates'] as $table => $rows) {
                foreach ($rows as $id => $fields) {
                    $old = array_values(array_filter($plan['before'][$table], fn ($r) => (int) $r['id'] === (int) $id))[0];
                    echo "UPDATE {$table} #{$id}: " . json_encode(['before' => array_intersect_key($old, $fields), 'after' => $fields], JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR) . "\n";
                }
            }
            $beforeTotal = $plan['before']['invoices'][0]['total'];
            $afterTotal = $plan['after']['invoices'][0]['total'];
            echo 'Total invoice/AR: ' . $beforeTotal . ' -> ' . $afterTotal . '. Enam reimbursement final: Rp10.620.904. Bank, petty cash, snapshot CS, main invoice dan posting profit dipertahankan.' . "\n";
        }
        if ($apply) {
            $result = $repair->apply($plan);
            echo 'SELESAI. Backup: ' . ($result['backup'] ?? '(tidak diperlukan; sudah bersih)') . "\n";
        } else {
            echo "Tidak ada perubahan disimpan. Gunakan --apply hanya setelah hasil ditinjau.\n";
        }
    } catch (Throwable $e) {
        fwrite(STDERR, 'DIHENTIKAN: ' . $e->getMessage() . "\n");
        exit(1);
    }
}
