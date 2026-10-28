<?php

declare(strict_types=1);

namespace Tests\Unit;

use Illuminate\Database\Capsule\Manager;
use Illuminate\Database\Connection;
use Illuminate\Database\Schema\Blueprint;
use PHPUnit\Framework\TestCase;
use RepairSo2608166005;
use RuntimeException;

require_once __DIR__ . '/../../scripts/repair-so-ewilog2608166005-remove-duplicate-tkbm-parkir.php';

final class RepairSo2608166005Test extends TestCase
{
    private Connection $db;
    private RepairSo2608166005 $repair;
    private string $backupDirectory;

    protected function setUp(): void
    {
        parent::setUp();
        $capsule = new Manager();
        $capsule->addConnection(['driver' => 'sqlite', 'database' => ':memory:', 'prefix' => '']);
        $this->db = $capsule->getConnection();
        $this->backupDirectory = sys_get_temp_dir() . '/repair-so-322-test-' . bin2hex(random_bytes(8));
        $this->repair = new RepairSo2608166005($this->db, $this->backupDirectory);
        $definitions = [
            'sales_orders' => 'order_number,cs_snapshot,updated_at',
            'invoices' => 'sales_order_id,invoice_number,invoice_type,status,subtotal,total,paid_amount,vat_amount,down_payment_amount,pph23_amount,posted_to_profit_loss,profit_loss_entries,updated_at',
            'invoice_items' => 'invoice_id,description,quantity,unit,rate,amount,vendor_id,item_ref,item_type,currency,include_in_customer_invoice,is_hidden_from_customer,paid_amount,outstanding_amount,updated_at',
            'reimbursement_items' => 'sales_order_id,invoice_id,description,quantity,amount,vendor_id,status,customer_paid_amount,receipt_info,updated_at',
            'account_payables' => 'sales_order_id,vendor_id,amount,paid_amount,outstanding_amount,status,service_description,updated_at',
            'account_payable_components' => 'account_payable_id,component_type,description,amount,paid_amount,outstanding_amount,status,vendor_id,related_items,updated_at',
            'account_receivables' => 'sales_order_id,invoice_id,invoice_amount,paid_amount,outstanding_amount,status,due_date,updated_at',
            'account_receivable_components' => 'account_receivable_id,component_type,amount,paid_amount,outstanding_amount,status,due_date,updated_at',
            'profit_loss_entries' => 'period_id,reference_type,reference_id,entry_type,amount,additional_data,updated_at',
            'profit_loss_periods' => 'status',
            'bank_transactions' => 'reference_type,reference_id,amount',
            'petty_cash_transactions' => 'invoice_item_id,reference_type,reference_id,amount',
            'account_payable_notes' => 'component_id,account_payable_id,note',
        ];
        foreach ($definitions as $name => $columns) {
            $this->db->getSchemaBuilder()->create($name, function (Blueprint $table) use ($columns) {
                $table->integer('id')->primary();
                foreach (explode(',', $columns) as $column) {
                    $table->text($column)->nullable();
                }
            });
        }
        $this->insert('sales_orders', ['id' => 322, 'order_number' => 'EWILOG2608166005', 'cs_snapshot' => '{"reimbursement_items":[]}']);
        $this->insert('invoices', ['id' => 308, 'sales_order_id' => 322, 'invoice_number' => 'EWL2608166005', 'invoice_type' => 'combined', 'status' => 'sent', 'subtotal' => '32917498.00', 'total' => '32917498.00', 'paid_amount' => '0.00', 'vat_amount' => '0.00', 'down_payment_amount' => '0.00', 'pph23_amount' => '123.00', 'posted_to_profit_loss' => 1, 'profit_loss_entries' => '[1341]']);
        foreach ([
            [663, 'TKBM', 1, 300000, 19, 8647], [683, 'PARKIR', 1, 100000, 19, 9512],
            [684, 'TBM 1', 1, 150000, 102, 9513], [685, 'PARKIR 1', 1, 50000, 102, 9561],
            [686, 'TKBM 1', 1, 150000, 102, 9562], [687, 'TKBM', 2, 150000, 101, 9563],
            [690, 'TKBM STUFFING', 2, 50000, 19, 9697], [691, 'PARKIR GUDANG', 2, 50000, 19, 9698],
            [652, 'REIMBURSEMENT LAIN', 1, 20319498, 19, 8644],
        ] as [$id, $description, $qty, $rate, $vendor, $item]) {
            $this->insert('reimbursement_items', ['id' => $id, 'sales_order_id' => 322, 'invoice_id' => 308, 'description' => $description, 'quantity' => $qty, 'amount' => $rate, 'vendor_id' => $vendor, 'status' => 'invoiced', 'customer_paid_amount' => 0, 'receipt_info' => '{}']);
            $this->item($item, 'Reimbursement - ' . $description, $qty, $rate, $vendor, 'reimbursement_' . $id, 'reimbursement');
        }
        $this->item(9300, 'MAIN', 1, 11348000, 19, 'vendor_19', 'billable');
        $this->item(9301, 'COGS', 1, 8076500, 19, 'cogs_vendor_19', 'operational_cost');
        foreach ([
            [1093, 101, '4621622.00', 'TRUCKING DADAP, LOLO 2, TKBM'],
            [1095, 102, '5793244.00', 'TRCKING NAROGONG, LOLO, TBM 1, PARKIR 1, TKBM 1'],
        ] as [$id, $vendor, $amount, $description]) {
            $this->insert('account_payables', ['id' => $id, 'sales_order_id' => 322, 'vendor_id' => $vendor, 'amount' => $amount, 'paid_amount' => 0, 'outstanding_amount' => $amount, 'status' => 'unpaid', 'service_description' => $description]);
        }
        foreach ([
            [5223, 1093, 'TRUCKING DADAP', 3500000, 101, null], [5227, 1093, 'LOLO 2', 821622, 101, 677],
            [5261, 1093, 'TKBM', 300000, 101, 687], [5228, 1095, 'TRCKING NAROGONG', 3800000, 102, null],
            [5232, 1095, 'LOLO', 1643244, 102, 676], [5259, 1095, 'TBM 1', 150000, 102, 684],
            [5262, 1095, 'PARKIR 1', 50000, 102, 685], [5263, 1095, 'TKBM 1', 150000, 102, 686],
        ] as [$id, $ap, $description, $amount, $vendor, $reimbursement]) {
            $related = $reimbursement ? ['source' => 'reimbursement_items', 'reimbursement_item_id' => $reimbursement, 'lookup_ref' => 'reimbursement_' . $reimbursement] : [];
            $this->insert('account_payable_components', ['id' => $id, 'account_payable_id' => $ap, 'component_type' => $reimbursement ? 'reimbursement' : 'vendor_payment', 'description' => $description, 'amount' => $amount, 'paid_amount' => 0, 'outstanding_amount' => $amount, 'status' => 'unpaid', 'vendor_id' => $vendor, 'related_items' => json_encode($related)]);
        }
        $this->insert('account_receivables', ['id' => 368, 'invoice_id' => 308, 'sales_order_id' => 322, 'invoice_amount' => '32917498.00', 'paid_amount' => 0, 'outstanding_amount' => '32917498.00', 'status' => 'overdue', 'due_date' => '2020-09-30']);
        foreach ([537 => ['debit_note', '21569498.00'], 538 => ['main', '11348000.00']] as $id => [$type, $amount]) {
            $this->insert('account_receivable_components', ['id' => $id, 'account_receivable_id' => 368, 'component_type' => $type, 'amount' => $amount, 'paid_amount' => 0, 'outstanding_amount' => $amount, 'status' => 'overdue', 'due_date' => '2020-09-30']);
        }
        $this->insert('profit_loss_periods', ['id' => 36, 'status' => 'draft']);
        $this->insert('profit_loss_entries', ['id' => 1341, 'period_id' => 36, 'reference_type' => 'shipment_profit', 'reference_id' => 322, 'entry_type' => 'auto_shipment_profit', 'amount' => '3341500.00', 'additional_data' => '{"invoice_ids":[308]}']);
        $this->insert('bank_transactions', ['id' => 1, 'reference_type' => 'manual', 'reference_id' => 99, 'amount' => '12345.00']);
    }

    protected function tearDown(): void
    {
        $this->db->disconnect();
        foreach (glob($this->backupDirectory . '/*.json') ?: [] as $file) {
            unlink($file);
        }
        if (is_dir($this->backupDirectory)) {
            rmdir($this->backupDirectory);
        }
        parent::tearDown();
    }

    public function test_dry_run_never_writes_and_lists_only_agreed_ids(): void
    {
        $before = $this->dump();
        $plan = $this->repair->plan();
        self::assertSame([685, 686, 687], $plan['deletes']['reimbursement_items']);
        self::assertSame('32417498.00', $plan['updates']['invoices'][308]['total']);
        self::assertSame($before, $this->dump());
        self::assertDirectoryDoesNotExist($this->backupDirectory);
    }

    public function test_apply_updates_related_totals_preserves_other_data_and_is_idempotent(): void
    {
        $before = $this->dump();
        $result = $this->repair->apply($this->repair->plan());
        self::assertFileExists($result['backup']);
        $backup = json_decode(file_get_contents($result['backup']), true, 512, JSON_THROW_ON_ERROR);
        self::assertCount(9, $backup['plan']['before']['reimbursement_items']);
        self::assertSame(0, $this->db->table('reimbursement_items')->whereIn('id', [685, 686, 687])->count());
        self::assertSame('32417498.00', $this->db->table('invoices')->where('id', 308)->value('total'));
        self::assertSame('21069498.00', $this->db->table('account_receivable_components')->where('id', 537)->value('amount'));
        self::assertSame('4321622.00', $this->db->table('account_payables')->where('id', 1093)->value('amount'));
        self::assertSame('5593244.00', $this->db->table('account_payables')->where('id', 1095)->value('amount'));
        self::assertSame('TRCKING NAROGONG, LOLO, TBM 1', $this->db->table('account_payables')->where('id', 1095)->value('service_description'));
        foreach (['sales_orders', 'profit_loss_entries', 'bank_transactions'] as $table) {
            self::assertSame($before[$table], $this->dump()[$table]);
        }
        self::assertSame('123.00', $this->db->table('invoices')->where('id', 308)->value('pph23_amount'));
        self::assertSame(5, $this->db->table('reimbursement_items')->whereIn('id', [663, 683, 684, 690, 691])->count());
        $after = $this->dump();
        self::assertTrue($this->repair->plan()['clean']);
        self::assertNull($this->repair->apply($this->repair->plan())['backup']);
        self::assertSame($after, $this->dump());
    }

    public function test_partial_cleanup_is_rejected(): void
    {
        $this->db->table('reimbursement_items')->where('id', 685)->delete();
        $this->expectExceptionMessage('sebagian');
        $this->repair->plan();
    }

    public function test_payment_on_target_is_rejected(): void
    {
        $this->db->table('reimbursement_items')->where('id', 687)->update(['customer_paid_amount' => '100.00']);
        $this->expectExceptionMessage('memiliki pembayaran');
        $this->repair->plan();
    }

    public function test_changed_target_amount_is_rejected(): void
    {
        $this->db->table('reimbursement_items')->where('id', 685)->update(['amount' => '50001.00']);
        $this->expectExceptionMessage('identitas/nominal');
        $this->repair->plan();
    }

    public function test_additional_invoice_reference_blocks_deletion(): void
    {
        $this->item(99999, 'PARKIR 1', 1, 50000, 102, 'reimbursement_685', 'reimbursement', 999);
        $this->expectExceptionMessage('Referensi invoice');
        $this->repair->plan();
    }

    public function test_notes_on_component_block_deletion(): void
    {
        $this->insert('account_payable_notes', ['id' => 1, 'component_id' => 5262, 'account_payable_id' => 1095, 'note' => 'Payment history']);
        $this->expectExceptionMessage('Referensi tambahan');
        $this->repair->plan();
    }

    public function test_bank_payment_blocks_repair(): void
    {
        $this->insert('bank_transactions', ['id' => 2, 'reference_type' => 'vendor_payment', 'reference_id' => 1095, 'amount' => 50000]);
        $this->expectExceptionMessage('Transaksi/posting');
        $this->repair->plan();
    }

    public function test_closed_period_blocks_repair(): void
    {
        $this->db->table('profit_loss_periods')->where('id', 36)->update(['status' => 'closed']);
        $this->expectExceptionMessage('Periode posting sudah ditutup');
        $this->repair->plan();
    }

    public function test_missing_invoice_target_is_rejected(): void
    {
        $this->db->table('invoice_items')->where('id', 9562)->delete();
        $this->expectExceptionMessage('Referensi invoice');
        $this->repair->plan();
    }

    public function test_petty_cash_link_blocks_deletion(): void
    {
        $this->insert('petty_cash_transactions', ['id' => 1, 'invoice_item_id' => 9561, 'amount' => 50000]);
        $this->expectExceptionMessage('Referensi tambahan');
        $this->repair->plan();
    }

    public function test_additional_accounting_posting_blocks_repair(): void
    {
        $this->insert('profit_loss_entries', ['id' => 2000, 'period_id' => 36, 'reference_type' => 'invoice', 'reference_id' => 308, 'entry_type' => 'invoice_posting', 'amount' => 500000]);
        $this->expectExceptionMessage('Posting terkait selain profit shipment');
        $this->repair->plan();
    }

    public function test_header_difference_outside_scope_is_not_silently_repaired(): void
    {
        $this->db->table('account_payables')->where('id', 1093)->update(['amount' => '4621623.00']);
        $this->expectExceptionMessage('tidak cocok dengan komponennya');
        $this->repair->plan();
    }

    public function test_unknown_foreign_key_link_blocks_deletion(): void
    {
        $this->db->getSchemaBuilder()->create('custom_receipts', function (Blueprint $table) {
            $table->integer('id')->primary();
            $table->integer('source_line');
            $table->foreign('source_line')->references('id')->on('invoice_items')->cascadeOnDelete();
        });
        $this->insert('custom_receipts', ['id' => 1, 'source_line' => 9561]);
        $this->expectExceptionMessage('Foreign key tambahan');
        $this->repair->plan();
    }

    public function test_modified_data_since_review_is_rejected_without_backup_or_deletion(): void
    {
        $plan = $this->repair->plan();
        $this->db->table('sales_orders')->where('id', 322)->update(['updated_at' => 'changed']);
        $before = $this->dump();
        try {
            $this->repair->apply($plan);
            self::fail('Expected rejection');
        } catch (RuntimeException $e) {
            self::assertStringContainsString('Data berubah', $e->getMessage());
        }
        self::assertSame($before, $this->dump());
        self::assertDirectoryDoesNotExist($this->backupDirectory);
    }

    public function test_failure_after_invoice_and_ap_deletion_rolls_everything_back(): void
    {
        $before = $this->dump();
        $this->db->unprepared("CREATE TRIGGER prevent_target_delete BEFORE DELETE ON reimbursement_items BEGIN SELECT RAISE(ABORT, 'simulated failure'); END");
        try {
            $this->repair->apply($this->repair->plan());
            self::fail('Expected rollback');
        } catch (\Illuminate\Database\QueryException $e) {
            self::assertStringContainsString('simulated failure', $e->getMessage());
        }
        self::assertSame($before, $this->dump());
        self::assertCount(1, glob($this->backupDirectory . '/*.json'));
    }

    private function insert(string $table, array $row): void
    {
        $this->db->table($table)->insert($row);
    }

    private function item(int $id, string $description, int $quantity, int $rate, int $vendor, string $ref, string $type, int $invoice = 308): void
    {
        $this->insert('invoice_items', ['id' => $id, 'invoice_id' => $invoice, 'description' => $description, 'quantity' => $quantity, 'unit' => 'SET', 'rate' => $rate, 'amount' => $quantity * $rate, 'vendor_id' => $vendor, 'item_ref' => $ref, 'item_type' => $type, 'currency' => 'IDR', 'include_in_customer_invoice' => $type === 'operational_cost' ? 0 : 1, 'is_hidden_from_customer' => $type === 'operational_cost' ? 1 : 0, 'paid_amount' => 0, 'outstanding_amount' => $quantity * $rate]);
    }

    private function dump(): array
    {
        $rows = [];
        foreach ($this->db->getSchemaBuilder()->getTableListing(null, false) as $table) {
            $rows[$table] = $this->db->table($table)->orderBy('id')->get()->map(fn ($r) => (array) $r)->all();
        }
        return $rows;
    }
}
