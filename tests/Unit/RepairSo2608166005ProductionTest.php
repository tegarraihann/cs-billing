<?php

declare(strict_types=1);

namespace Tests\Unit;

use Illuminate\Database\Capsule\Manager;
use Illuminate\Database\Connection;
use Illuminate\Database\Schema\Blueprint;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use RepairSo2608166005;
use RuntimeException;

require_once __DIR__ . '/../../scripts/repair-so-ewilog2608166005-remove-duplicate-tkbm-parkir.php';

final class RepairSo2608166005ProductionTest extends TestCase
{
    // Independently transcribed from the reviewed hosting outputs, not script constants.
    private const SOURCES = [
        [652, 'DELIVERY ORDER', 1, 7353728, 'SET', 19, 8644, 5684, 1067],
        [653, 'DEVOSIT CONTAINER', 1, 280000, 'SET', 19, 8645, 5685, 1067],
        [662, 'STORAGE', 1, 5677660, 'SET', 62, 8646, 5688, 1066],
        [663, 'UANG KULI', 1, 100000, 'SET', 19, 8647, 5686, 1067],
        [664, 'PARKIR 1', 1, 50000, 'SET', 102, 8648, 5693, 1095],
        [676, 'PARKIR 2', 1, 50000, '20GP', 101, 9175, 5690, 1093],
        [677, 'TKBM 1', 1, 150000, '20GP', 102, 9176, 5694, 1095],
        [683, 'TKBM 2', 1, 150000, '20GP', 101, 9512, 5691, 1093],
        [684, 'LOLO 1', 1, 821622, '20GP', 102, 9513, 5259, 1095],
        [685, 'LOLO 2', 1, 821622, '20GP', 101, 9561, 5692, 1093],
        [686, 'TKBM 1', 1, 150000, '20GP', 102, 9562, 5263, 1095],
        [687, 'TKBM', 2, 150000, '20GP', 101, 9563, 5261, 1093],
        [689, 'LOLO', 2, 821622, '20GP', 19, 9696, 5362, 1067],
        [690, 'TKBM STUFFING', 2, 50000, '20GP', 19, 9697, 5363, 1067],
        [691, 'PARKIR GUDANG', 2, 50000, '20GP', 19, 9698, 5364, 1067],
        [692, 'CHARGE LINER CONTAINER', 1, 2800000, 'SET', 19, 9699, 5365, 1067],
    ];

    private Connection $db;
    private RepairSo2608166005 $repair;
    private string $directory;
    private ?Connection $admin = null;
    private ?string $database = null;

    protected function setUp(): void
    {
        $capsule = new Manager();
        if (getenv('REPAIR_TEST_MYSQL') === '1') {
            // Only ephemeral schemas on the local MySQL server; never read application .env.
            $config = ['driver' => 'mysql', 'host' => '127.0.0.1', 'port' => 3306,
                'username' => getenv('REPAIR_TEST_MYSQL_USER') ?: 'root',
                'password' => getenv('REPAIR_TEST_MYSQL_PASSWORD') ?: '',
                'database' => 'information_schema', 'charset' => 'utf8mb4', 'collation' => 'utf8mb4_unicode_ci'];
            $capsule->addConnection($config, 'repair_admin');
            $this->admin = $capsule->getConnection('repair_admin');
            $this->database = 'office_repair_322_test_' . bin2hex(random_bytes(6));
            $this->admin->statement('CREATE DATABASE `' . $this->database . '` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
            $capsule->addConnection(array_replace($config, ['database' => $this->database]));
        } else {
            $capsule->addConnection(['driver' => 'sqlite', 'database' => ':memory:', 'prefix' => '']);
        }
        $capsule->bootEloquent();
        $this->db = $capsule->getConnection();
        $this->directory = sys_get_temp_dir() . '/repair-production-322-' . bin2hex(random_bytes(8));
        $this->repair = new RepairSo2608166005($this->db, $this->directory, true);
        $definitions = [
            'sales_orders' => 'order_number,cs_snapshot,updated_at',
            'invoices' => 'sales_order_id,invoice_number,invoice_type,currency,status,subtotal,total,paid_amount,vat_amount,pph23_amount,down_payment_amount,profit_loss_entries,posted_to_profit_loss,updated_at',
            'reimbursement_items' => 'sales_order_id,invoice_id,description,quantity,amount,unit,vendor_id,category,notes,status,customer_paid_amount,customer_outstanding_amount,customer_payment_status,receipt_info,linked_at,invoiced_at,created_at,updated_at',
            'invoice_items' => 'invoice_id,description,quantity,unit,rate,amount,vendor_id,item_ref,item_type,currency,include_in_customer_invoice,is_hidden_from_customer,paid_amount,outstanding_amount,updated_at',
            'account_payables' => 'sales_order_id,vendor_id,amount,paid_amount,outstanding_amount,status,service_description,vendor_invoice_number,vendor_invoice_date,updated_at',
            'account_payable_components' => 'account_payable_id,component_type,description,amount,paid_amount,outstanding_amount,status,vendor_id,related_items,updated_at',
            'account_receivables' => 'sales_order_id,invoice_id,invoice_amount,paid_amount,outstanding_amount,status,due_date,updated_at',
            'account_receivable_components' => 'account_receivable_id,component_type,amount,paid_amount,outstanding_amount,status,updated_at',
            'profit_loss_entries' => 'period_id,reference_type,reference_id,entry_type,amount,additional_data',
            'profit_loss_periods' => 'status',
            'bank_transactions' => 'reference_type,reference_id,amount',
            'petty_cash_transactions' => 'invoice_item_id,reference_type,reference_id,amount',
            'account_payable_notes' => 'account_payable_id,component_id,note',
        ];
        foreach ($definitions as $name => $columns) {
            $this->db->getSchemaBuilder()->create($name, function (Blueprint $table) use ($columns) {
                $table->engine = 'InnoDB';
                $table->integer('id')->primary();
                foreach (explode(',', $columns) as $column) {
                    if (str_ends_with($column, '_id')) {
                        $table->integer($column)->nullable();
                    } else {
                        $table->text($column)->nullable();
                    }
                }
            });
        }
        $this->put('sales_orders', ['id' => 322, 'order_number' => 'EWILOG2608166005', 'cs_snapshot' => '{"historical":"preserved"}']);
        $this->put('invoices', ['id' => 308, 'sales_order_id' => 322, 'invoice_number' => 'EWL2608166005', 'invoice_type' => 'combined', 'currency' => 'IDR', 'status' => 'sent', 'subtotal' => '31995876.00', 'total' => '31995876.00', 'paid_amount' => 0, 'vat_amount' => 0, 'down_payment_amount' => 0, 'profit_loss_entries' => '[1341]', 'posted_to_profit_loss' => 1]);
        foreach (self::SOURCES as [$id, $name, $qty, $rate, $unit, $vendor, $item, $component, $ap]) {
            $meta = ['quantity' => $qty, 'unit' => $unit, 'unit_price' => $rate];
            $this->put('reimbursement_items', ['id' => $id, 'sales_order_id' => 322, 'invoice_id' => 308, 'description' => $name, 'quantity' => $qty, 'unit' => $unit, 'amount' => $rate, 'vendor_id' => $vendor, 'status' => 'invoiced', 'customer_paid_amount' => 0, 'customer_outstanding_amount' => $qty * $rate, 'receipt_info' => json_encode($meta + ['currency' => 'IDR'])]);
            $this->item($item, 'Reimbursement - ' . $name, $qty, $rate, $unit, $vendor, 'reimbursement_' . $id, 'reimbursement');
            $this->put('account_payable_components', ['id' => $component, 'account_payable_id' => $ap, 'component_type' => 'reimbursement', 'description' => $name, 'amount' => $qty * $rate, 'paid_amount' => 0, 'outstanding_amount' => $qty * $rate, 'status' => 'unpaid', 'vendor_id' => $vendor, 'related_items' => json_encode($meta + ['source' => 'reimbursement_items', 'reimbursement_item_id' => $id, 'lookup_ref' => 'reimbursement_' . $id])]);
        }
        // Non-reimbursement totals are test fixtures; production dry-run must verify actual components.
        foreach ([[5151, 1067, 'HANDLING FIRST', 100000, 19], [5157, 1067, 'REFUND', 200000, 19], [5689, 1067, 'MATERAI', 10000, 19], [5223, 1093, 'TRUCKING DADAP', 3500000, 101], [5228, 1095, 'TRCKING NAROGONG', 3800000, 102], [5264, 1068, 'SUBMIT DOC', 100000, 99], [5260, 1111, 'PIB EDI', 166500, 15]] as [$id, $ap, $name, $amount, $vendor]) {
            $this->put('account_payable_components', ['id' => $id, 'account_payable_id' => $ap, 'component_type' => 'vendor_payment', 'description' => $name, 'amount' => $amount, 'paid_amount' => 0, 'outstanding_amount' => $amount, 'status' => 'unpaid', 'vendor_id' => $vendor, 'related_items' => '{}']);
        }
        foreach ([1066 => 62, 1067 => 19, 1068 => 99, 1093 => 101, 1095 => 102, 1111 => 15] as $id => $vendor) {
            $components = $this->db->table('account_payable_components')->where('account_payable_id', $id);
            $amount = number_format((float) (clone $components)->sum('amount'), 2, '.', '');
            $this->put('account_payables', ['id' => $id, 'sales_order_id' => 322, 'vendor_id' => $vendor, 'amount' => $amount, 'paid_amount' => 0, 'outstanding_amount' => $amount, 'status' => 'unpaid', 'service_description' => implode(', ', $components->orderBy('id')->pluck('description')->all())]);
        }
        foreach ([[10972, 'HANDLING FIRST', 450000, 19], [10974, 'NEXT HANDLING', 400000, 19], [10975, 'PIB EDI', 450000, 15], [10977, 'MATERAI', 48000, 19], [10979, 'TRUCKING DADAP', 4500000, 101], [10981, 'TRCKING NAROGONG', 4500000, 102], [10983, 'ADD ON & MULTIDROP 2 LOKASI', 700000, 19], [10984, 'SUBMIT DOC', 250000, 99], [10986, 'GEMBOK ADD ON', 150000, 102]] as [$id, $name, $rate, $vendor]) {
            $this->item($id, $name, 1, $rate, 'SET', $vendor, 'vendor_' . $vendor, 'billable');
        }
        foreach ([[10973, 'HANDLING FIRST', 100000, 19], [10976, 'PIB EDI', 166500, 15], [10978, 'MATERAI', 10000, 19], [10980, 'TRUCKING DADAP', 3500000, 101], [10982, 'TRCKING NAROGONG', 3800000, 102], [10985, 'SUBMIT DOC', 100000, 99]] as [$id, $name, $rate, $vendor]) {
            $this->item($id, $name . ' - Buying Cost (COGS)', 1, $rate, 'SET', $vendor, 'cogs_vendor_' . $vendor, 'operational_cost');
        }
        $this->item(8655, 'Other Cost - REFUND', 2, 200000, 'SET', 19, 'other_cost_0', 'operational_cost');
        $this->put('account_receivables', ['id' => 368, 'sales_order_id' => 322, 'invoice_id' => 308, 'invoice_amount' => '31995876.00', 'paid_amount' => 0, 'outstanding_amount' => '31995876.00', 'status' => 'overdue']);
        foreach ([537 => ['debit_note', '20547876.00'], 538 => ['main', '11448000.00']] as $id => [$type, $amount]) {
            $this->put('account_receivable_components', ['id' => $id, 'account_receivable_id' => 368, 'component_type' => $type, 'amount' => $amount, 'paid_amount' => 0, 'outstanding_amount' => $amount, 'status' => 'overdue']);
        }
        $this->put('profit_loss_periods', ['id' => 36, 'status' => 'draft']);
        $this->put('profit_loss_entries', ['id' => 1341, 'period_id' => 36, 'reference_type' => 'shipment_profit', 'reference_id' => 322, 'entry_type' => 'auto_shipment_profit', 'amount' => '3341500.00', 'additional_data' => '{"invoice_ids":[308]}']);
        $this->put('bank_transactions', ['id' => 1, 'reference_type' => 'manual', 'reference_id' => 1, 'amount' => '123.00']);
        $this->put('sales_orders', ['id' => 999, 'order_number' => 'UNRELATED']);
        $this->put('reimbursement_items', ['id' => 9999, 'sales_order_id' => 999, 'description' => 'PARKIR', 'amount' => 123]);
    }

    protected function tearDown(): void
    {
        if (isset($this->db)) {
            $this->db->disconnect();
        }
        if ($this->admin && $this->database && preg_match('/^office_repair_322_test_[a-f0-9]{12}$/', $this->database)) {
            $this->admin->statement('DROP DATABASE `' . $this->database . '`');
            $this->admin->disconnect();
        }
        if (isset($this->directory)) {
            foreach (glob($this->directory . '/*.json') ?: [] as $file) {
                unlink($file);
            }
            if (is_dir($this->directory)) {
                rmdir($this->directory);
            }
        }
    }

    public function test_production_dry_run_selects_reviewed_mapping_and_writes_nothing(): void
    {
        $before = $this->dump();
        $plan = $this->repair->plan();
        self::assertSame('production-2026-10-28', $plan['profile']);
        self::assertFalse($plan['clean']);
        self::assertSame([652, 664, 676, 677, 683, 684, 685, 686, 687, 692], $plan['deletes']['reimbursement_items']);
        self::assertSame([8644, 8648, 9175, 9176, 9512, 9513, 9561, 9562, 9563, 9699], $plan['deletes']['invoice_items']);
        self::assertSame([5684, 5693, 5690, 5694, 5691, 5259, 5692, 5263, 5261, 5365], $plan['deletes']['account_payable_components']);
        self::assertSame('22068904.00', $plan['updates']['invoices'][308]['total']);
        self::assertSame('10620904.00', $plan['updates']['account_receivable_components'][537]['amount']);
        self::assertSame('150000.00', $plan['updates']['reimbursement_items'][690]['amount']);
        self::assertSame($before, $this->dump());
        self::assertDirectoryDoesNotExist($this->directory);
    }

    public function test_apply_repairs_six_rows_all_links_and_vendor_totals_without_touching_protected_data(): void
    {
        $before = $this->dump();
        $result = $this->repair->apply($this->repair->plan());
        self::assertFileExists($result['backup']);
        $backup = json_decode(file_get_contents($result['backup']), true, 512, JSON_THROW_ON_ERROR);
        self::assertSame('production-2026-10-28', $backup['plan']['profile']);
        self::assertCount(16, $backup['plan']['before']['reimbursement_items']);
        $rows = $this->db->table('reimbursement_items')->where('sales_order_id', 322)->orderBy('id')->get();
        self::assertSame([653, 662, 663, 689, 690, 691], $rows->pluck('id')->all());
        foreach ([653 => ['DEPOSIT KONTAINER', 1, 2800000, 19], 662 => ['STORAGE', 1, 5677660, 62], 663 => ['EXTRA KULI', 1, 100000, 19], 689 => ['LOLO', 2, 821622, 19], 690 => ['TKBM', 2, 150000, 19], 691 => ['PARKIR', 2, 50000, 19]] as $id => [$name, $qty, $rate, $vendor]) {
            $r = $rows->firstWhere('id', $id);
            self::assertSame($name, $r->description);
            self::assertEquals($qty, $r->quantity);
            self::assertEquals($rate, $r->amount);
            self::assertEquals($vendor, $r->vendor_id);
            self::assertEquals($qty * $rate, $r->customer_outstanding_amount);
            $meta = json_decode($r->receipt_info, true);
            self::assertEquals($qty, $meta['quantity']);
            self::assertEquals($rate, $meta['unit_price']);
            $item = $this->db->table('invoice_items')->where('item_ref', 'reimbursement_' . $id)->first();
            self::assertSame('Reimbursement - ' . $name, $item->description);
            self::assertEquals($qty, $item->quantity);
            self::assertEquals($rate, $item->rate);
            self::assertEquals($qty * $rate, $item->amount);
            self::assertEquals($item->amount, $item->outstanding_amount);
            $source = array_values(array_filter(self::SOURCES, fn ($s) => $s[0] === $id))[0];
            $c = $this->db->table('account_payable_components')->find($source[7]);
            self::assertSame($name, $c->description);
            self::assertEquals($qty * $rate, $c->amount);
            self::assertEquals($vendor, $c->vendor_id);
            self::assertEquals($id, json_decode($c->related_items, true)['reimbursement_item_id']);
            self::assertEquals($qty, json_decode($c->related_items, true)['quantity']);
            self::assertEquals($rate, json_decode($c->related_items, true)['unit_price']);
        }
        foreach ([1066 => 5677660, 1067 => 5253244, 1068 => 100000, 1093 => 3500000, 1095 => 3800000, 1111 => 166500] as $id => $amount) {
            $ap = $this->db->table('account_payables')->find($id);
            self::assertEquals($amount, $ap->amount);
            self::assertEquals($amount, $ap->outstanding_amount);
            self::assertEquals($amount, $this->db->table('account_payable_components')->where('account_payable_id', $id)->sum('amount'));
        }
        self::assertSame('22068904.00', $this->db->table('invoices')->where('id', 308)->value('total'));
        self::assertSame('22068904.00', $this->db->table('account_receivables')->where('id', 368)->value('outstanding_amount'));
        foreach (['sales_orders', 'profit_loss_entries', 'profit_loss_periods', 'bank_transactions', 'petty_cash_transactions'] as $table) {
            self::assertSame($before[$table], $this->dump()[$table]);
        }
        self::assertSame($before['account_receivable_components'][538], $this->dump()['account_receivable_components'][538]);
        self::assertSame($before['reimbursement_items'][9999], $this->dump()['reimbursement_items'][9999]);
        foreach ($before['invoice_items'] as $id => $row) {
            if ($row['item_type'] !== 'reimbursement') {
                self::assertSame($row, $this->dump()['invoice_items'][$id]);
            }
        }
        foreach ($before['account_payable_components'] as $id => $row) {
            if ($row['component_type'] !== 'reimbursement') {
                self::assertSame($row, $this->dump()['account_payable_components'][$id]);
            }
        }
        $after = $this->dump();
        self::assertTrue($this->repair->plan()['clean']);
        self::assertNull($this->repair->apply($this->repair->plan())['backup']);
        self::assertSame($after, $this->dump());
        self::assertCount(1, glob($this->directory . '/*.json'));
    }

    #[DataProvider('rejectedChanges')]
    public function test_changed_or_mixed_data_is_rejected_without_writes(string $table, int $id, array $fields, string $message): void
    {
        $this->db->table($table)->where('id', $id)->update($fields);
        $before = $this->dump();
        try {
            $this->repair->apply($this->repair->plan());
            self::fail('Changed baseline accepted');
        } catch (RuntimeException $e) {
            self::assertStringContainsString($message, $e->getMessage());
        }
        self::assertSame($before, $this->dump());
        self::assertDirectoryDoesNotExist($this->directory);
    }

    public static function rejectedChanges(): array
    {
        return [
            'keeper paid' => ['reimbursement_items', 690, ['customer_paid_amount' => 1], 'memiliki pembayaran'],
            'deleted source paid' => ['reimbursement_items', 685, ['customer_paid_amount' => 1], 'memiliki pembayaran'],
            'master vendor' => ['reimbursement_items', 690, ['vendor_id' => 101], 'identitas/nominal'],
            'mixed local name' => ['reimbursement_items', 664, ['description' => 'UANG KULI'], 'identitas/nominal'],
            'mixed profile anchor' => ['reimbursement_items', 663, ['description' => 'TKBM'], 'Referensi AP'],
            'master rate' => ['reimbursement_items', 653, ['amount' => 280001], 'identitas/nominal'],
            'invoice vendor' => ['invoice_items', 9561, ['vendor_id' => 102], 'identitas/nominal'],
            'invoice foreign' => ['invoice_items', 9561, ['invoice_id' => 999], 'di luar pemetaan'],
            'invoice quantity' => ['invoice_items', 9697, ['quantity' => 1], 'identitas/nominal'],
            'main classification' => ['invoice_items', 10979, ['item_type' => 'operational_cost'], 'baseline billable'],
            'invoice paid' => ['invoice_items', 8645, ['paid_amount' => 1], 'memiliki pembayaran'],
            'AP paid' => ['account_payables', 1093, ['paid_amount' => 1], 'memiliki pembayaran'],
            'component paid' => ['account_payable_components', 5692, ['paid_amount' => 1], 'memiliki pembayaran'],
            'AP baseline' => ['account_payables', 1093, ['amount' => 4821623], 'berbeda dari komponen'],
            'AP vendor' => ['account_payables', 1093, ['vendor_id' => 19], 'identitas/nominal'],
            'component AP' => ['account_payable_components', 5692, ['account_payable_id' => 1095], 'identitas/nominal'],
            'vendor invoice' => ['account_payables', 1067, ['vendor_invoice_number' => 'NEW-INVOICE'], 'invoice vendor'],
            'AR paid' => ['account_receivables', 368, ['paid_amount' => 1], 'memiliki pembayaran'],
            'AR total' => ['account_receivables', 368, ['invoice_amount' => 31995877], 'baseline'],
            'main changed' => ['account_receivable_components', 538, ['amount' => 11348000], 'AR main'],
            'tax changed' => ['invoices', 308, ['vat_amount' => 1], 'PPN berubah'],
            'DP changed' => ['invoices', 308, ['down_payment_amount' => 1], 'DP berubah'],
            'closed period' => ['profit_loss_periods', 36, ['status' => 'closed'], 'Periode posting'],
            'receipt quantity' => ['reimbursement_items', 690, ['receipt_info' => '{"quantity":1,"unit":"20GP","unit_price":50000,"currency":"IDR"}'], 'Receipt #690'],
            'receipt payment history' => ['reimbursement_items', 690, ['receipt_info' => '{"quantity":2,"unit":"20GP","unit_price":50000,"currency":"IDR","payment_history":[{"status":"paid"}]}'], 'histori pembayaran'],
            'component metadata' => ['account_payable_components', 5363, ['related_items' => '{"source":"reimbursement_items","reimbursement_item_id":690,"lookup_ref":"reimbursement_690","quantity":1,"unit":"20GP","unit_price":50000}'], 'Referensi AP #5363'],
        ];
    }

    public function test_partial_or_additional_sources_are_rejected(): void
    {
        $this->db->table('reimbursement_items')->where('id', 685)->delete();
        $this->expectExceptionMessage('Daftar sumber berbeda/parsial');
        $this->repair->plan();
    }

    public function test_new_reference_in_other_invoice_is_rejected(): void
    {
        $this->item(9998, 'Extra', 1, 1, 'SET', 19, 'reimb_690', 'reimbursement');
        $this->db->table('invoice_items')->where('id', 9998)->update(['invoice_id' => 999]);
        $this->expectExceptionMessage('Referensi invoice');
        $this->repair->plan();
    }

    public function test_external_ap_component_and_financial_notes_are_rejected(): void
    {
        $c = (array) $this->db->table('account_payable_components')->find(5363);
        $this->put('account_payable_components', array_replace($c, ['id' => 9998, 'account_payable_id' => 999]));
        $this->expectExceptionMessage('Referensi AP');
        $this->repair->plan();
    }

    public function test_component_note_prevents_deletion(): void
    {
        $this->put('account_payable_notes', ['id' => 1, 'component_id' => 5692, 'account_payable_id' => 1093, 'note' => 'review']);
        $this->expectExceptionMessage('Referensi tambahan');
        $this->repair->plan();
    }

    public function test_vendor_allocation_prevents_deletion(): void
    {
        $this->db->getSchemaBuilder()->create('vendor_invoice_items', function (Blueprint $t) {
            $t->integer('id')->primary();
            $t->integer('account_payable_component_id');
        });
        $this->put('vendor_invoice_items', ['id' => 1, 'account_payable_component_id' => 5692]);
        $this->expectExceptionMessage('Referensi tambahan');
        $this->repair->plan();
    }

    public function test_bank_reference_prevents_repair_even_when_header_paid_is_zero(): void
    {
        $this->put('bank_transactions', ['id' => 2, 'reference_type' => 'vendor_payment', 'reference_id' => 1093, 'amount' => 100]);
        $this->expectExceptionMessage('Transaksi/posting');
        $this->repair->plan();
    }

    public function test_stale_plan_is_rejected_before_backup_or_writes(): void
    {
        $plan = $this->repair->plan();
        $this->db->table('sales_orders')->where('id', 322)->update(['updated_at' => 'newer']);
        $before = $this->dump();
        try {
            $this->repair->apply($plan);
            self::fail('Stale plan accepted');
        } catch (RuntimeException $e) {
            self::assertStringContainsString('Data berubah', $e->getMessage());
        }
        self::assertSame($before, $this->dump());
        self::assertDirectoryDoesNotExist($this->directory);
    }

    public function test_backup_failure_prevents_all_changes(): void
    {
        $repair = new RepairSo2608166005($this->db, __FILE__, true);
        $before = $this->dump();
        try {
            @$repair->apply($repair->plan());
            self::fail('Backup failure accepted');
        } catch (RuntimeException $e) {
            self::assertStringContainsString('backup', strtolower($e->getMessage()));
        }
        self::assertSame($before, $this->dump());
    }

    public function test_update_failure_rolls_back_deletes_and_prior_updates(): void
    {
        $plan = $this->repair->plan();
        $before = $this->dump();
        $sql = $this->db->getDriverName() === 'mysql'
            ? "CREATE TRIGGER fail_repair BEFORE UPDATE ON invoices FOR EACH ROW SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'simulated failure'"
            : "CREATE TRIGGER fail_repair BEFORE UPDATE ON invoices BEGIN SELECT RAISE(ABORT, 'simulated failure'); END";
        $this->db->unprepared($sql);
        try {
            $this->repair->apply($plan);
            self::fail('Failure not raised');
        } catch (\Illuminate\Database\QueryException $e) {
            self::assertStringContainsString('simulated failure', $e->getMessage());
        }
        self::assertSame($before, $this->dump());
    }

    public function test_corrupt_final_metadata_is_not_accepted_as_clean(): void
    {
        $this->repair->apply($this->repair->plan());
        $this->db->table('invoice_items')->where('id', 9697)->update(['outstanding_amount' => 0]);
        $this->expectExceptionMessage('kondisi parsial');
        $this->repair->plan();
    }

    public function test_legacy_invoice_pdf_and_unchanged_so_resave_helpers_keep_six_rows(): void
    {
        // Load the repair worktree's legacy classes, not the main workspace's unfinished models.
        foreach (['Models/Invoice', 'Models/InvoiceItem', 'Models/SalesOrder', 'Models/ReimbursementItem', 'Models/AccountReceivable', 'Models/AccountReceivableComponent', 'Http/Controllers/AdminKeuangan/InvoiceController', 'Http/Controllers/AdminKeuangan/SalesOrderController'] as $file) {
            require_once __DIR__ . '/../../app/' . $file . '.php';
        }
        self::assertSame(realpath(__DIR__ . '/../../app/Http/Controllers/AdminKeuangan/InvoiceController.php'), (new \ReflectionClass(\App\Http\Controllers\AdminKeuangan\InvoiceController::class))->getFileName());
        $this->repair->apply($this->repair->plan());
        $previous = \Illuminate\Container\Container::getInstance();
        $previousFacadeApp = \Illuminate\Support\Facades\Facade::getFacadeApplication();
        $container = new \Illuminate\Container\Container();
        $auth = $this->createMock(\Illuminate\Contracts\Auth\Guard::class);
        $auth->method('id')->willReturn(3);
        $container->instance(\Illuminate\Contracts\Auth\Factory::class, $auth);
        \Illuminate\Container\Container::setInstance($container);
        \Illuminate\Support\Facades\Facade::setFacadeApplication($container);
        \Illuminate\Support\Facades\Date::clearResolvedInstance('date');
        try {
            $controller = new \App\Http\Controllers\AdminKeuangan\InvoiceController();
            $payloadMethod = new \ReflectionMethod($controller, 'prepareReimbursementInvoicePayload');
            $soController = new \App\Http\Controllers\AdminKeuangan\SalesOrderController();
            $updateMethod = new \ReflectionMethod($soController, 'updateReimbursementItems');
            $syncMethod = new \ReflectionMethod($soController, 'syncOperationalAndReimbursementToInvoices');
            for ($i = 0; $i < 3; $i++) {
                $invoice = \App\Models\Invoice::findOrFail(308);
                $invoice->setRelation('items', \App\Models\InvoiceItem::where('invoice_id', 308)->get());
                $invoice->setRelation('salesOrder', (new \App\Models\SalesOrder())->forceFill(['id' => 322, 'created_by' => 3]));
                $invoice->setRelation('customer', null);
                $payload = $payloadMethod->invoke($controller, $invoice);
                self::assertCount(6, $payload['entries']);
                self::assertEquals(10620904, $payload['entries']->sum('amount'));
                self::assertEquals(10620904, $payload['invoice']->total);
                self::assertSame('EWL2608166005-R', $payload['invoice']->invoice_number);
                self::assertSame(['DEPOSIT KONTAINER', 'EXTRA KULI', 'LOLO', 'PARKIR', 'STORAGE', 'TKBM'], $payload['entries']->pluck('description')->sort()->values()->all());
                self::assertSame(6, $this->db->table('reimbursement_items')->where('sales_order_id', 322)->count());
                self::assertSame('22068904.00', $this->db->table('invoices')->where('id', 308)->value('total'));
                self::assertTrue($this->repair->plan()['clean']);
                $so = \App\Models\SalesOrder::findOrFail(322);
                $so->other_costs = [['description' => 'REFUND', 'quantity' => 2, 'amount' => 200000, 'unit' => 'SET', 'vendor_id' => 19]];
                $incoming = $this->db->table('reimbursement_items')->where('sales_order_id', 322)->get()->map(fn ($row) => (array) $row)->all();
                $updateMethod->invoke($soController, $so, $incoming);
                $syncMethod->invoke($soController, $so);
                self::assertSame(6, $this->db->table('reimbursement_items')->where('sales_order_id', 322)->count());
                self::assertTrue($this->repair->plan()['clean']);
            }
        } finally {
            \Illuminate\Support\Facades\Date::clearResolvedInstance('date');
            \Illuminate\Support\Facades\Facade::setFacadeApplication($previousFacadeApp);
            \Illuminate\Container\Container::setInstance($previous);
        }
    }

    private function item(int $id, string $name, int $qty, int $rate, string $unit, int $vendor, string $ref, string $type): void
    {
        $this->put('invoice_items', ['id' => $id, 'invoice_id' => 308, 'description' => $name, 'quantity' => $qty, 'unit' => $unit, 'rate' => $rate, 'amount' => $qty * $rate, 'paid_amount' => 0, 'outstanding_amount' => $qty * $rate, 'vendor_id' => $vendor, 'item_ref' => $ref, 'item_type' => $type, 'currency' => 'IDR', 'include_in_customer_invoice' => $type === 'operational_cost' ? 0 : 1, 'is_hidden_from_customer' => $type === 'operational_cost' ? 1 : 0]);
    }

    private function put(string $table, array $row): void
    {
        $this->db->table($table)->insert($row);
    }

    private function dump(): array
    {
        $result = [];
        $schema = $this->db->getDriverName() === 'mysql' ? $this->db->getDatabaseName() : null;
        foreach ($this->db->getSchemaBuilder()->getTableListing($schema, false) as $table) {
            $result[$table] = $this->db->table($table)->orderBy('id')->get()->keyBy('id')->map(fn ($r) => (array) $r)->all();
        }
        return $result;
    }
}
