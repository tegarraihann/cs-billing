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

final class RepairSo2608166005FinalTest extends TestCase
{
    private Connection $db;
    private RepairSo2608166005 $repair;
    private string $directory;

    protected function setUp(): void
    {
        $capsule = new Manager();
        $capsule->addConnection(['driver' => 'sqlite', 'database' => ':memory:', 'prefix' => '']);
        $this->db = $capsule->getConnection();
        $this->directory = sys_get_temp_dir() . '/repair-final-322-' . bin2hex(random_bytes(8));
        $this->repair = new RepairSo2608166005($this->db, $this->directory, true);
        $definitions = [
            'sales_orders' => 'order_number,cs_snapshot,updated_at',
            'invoices' => 'sales_order_id,invoice_number,invoice_type,status,subtotal,total,paid_amount,vat_amount,down_payment_amount,profit_loss_entries,posted_to_profit_loss,updated_at',
            'reimbursement_items' => 'sales_order_id,invoice_id,description,quantity,amount,unit,vendor_id,status,customer_paid_amount,customer_outstanding_amount,receipt_info,updated_at',
            'invoice_items' => 'invoice_id,description,quantity,unit,rate,amount,vendor_id,item_ref,item_type,currency,include_in_customer_invoice,is_hidden_from_customer,paid_amount,outstanding_amount,updated_at',
            'account_payables' => 'sales_order_id,vendor_id,amount,paid_amount,outstanding_amount,status,service_description,updated_at',
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
                $table->integer('id')->primary();
                foreach (explode(',', $columns) as $column) {
                    $table->text($column)->nullable();
                }
            });
        }
        $this->put('sales_orders', ['id' => 322, 'order_number' => 'EWILOG2608166005', 'cs_snapshot' => '{"historical":"untouched"}']);
        $this->put('invoices', ['id' => 308, 'sales_order_id' => 322, 'invoice_number' => 'EWL2608166005', 'invoice_type' => 'combined', 'status' => 'sent', 'subtotal' => '32417498.00', 'total' => '32417498.00', 'paid_amount' => 0, 'vat_amount' => 0, 'down_payment_amount' => 0, 'profit_loss_entries' => '[1341]', 'posted_to_profit_loss' => 1]);
        foreach ([
            [652, 'DELIVERY ORDER', 1, 7353728, 'SET', 19, 8644, 5684, 1067],
            [653, 'DEVOSIT CONTAINER', 1, 280000, 'SET', 19, 8645, 5685, 1067],
            [662, 'STORAGE', 1, 5677660, 'SET', 62, 8646, 5688, 1066],
            [663, 'TKBM', 1, 300000, 'SET', 19, 8647, 5686, 1067],
            [664, 'UANG KULI', 1, 100000, 'SET', 19, 8648, 5160, 1067],
            [676, 'LOLO', 1, 1643244, '20GP', 102, 9175, 5232, 1095],
            [677, 'LOLO 2', 1, 821622, '20GP', 101, 9176, 5227, 1093],
            [683, 'PARKIR', 1, 100000, 'SET', 19, 9512, 5687, 1067],
            [684, 'TBM 1', 1, 150000, '20GP', 102, 9513, 5259, 1095],
            [689, 'LOLO', 2, 821622, '20GP', 19, 9696, 5362, 1067],
            [690, 'TKBM STUFFING', 2, 50000, '20GP', 19, 9697, 5363, 1067],
            [691, 'PARKIR GUDANG', 2, 50000, '20GP', 19, 9698, 5364, 1067],
            [692, 'CHARGE LINER CONTAINER', 1, 2800000, 'SET', 19, 9699, 5365, 1067],
        ] as $source) {
            $this->source($source);
        }
        foreach ([
            [5151, 1067, 'HANDLING FIRST', 100000, 19], [5157, 1067, 'REFUND', 200000, 19],
            [5689, 1067, 'MATERAI', 10000, 19], [5223, 1093, 'TRUCKING DADAP', 3500000, 101],
            [5228, 1095, 'TRCKING NAROGONG', 3800000, 102], [5264, 1068, 'SUBMIT DOC', 100000, 99],
            [5260, 1111, 'PIB EDI', 166500, 15],
        ] as [$id, $ap, $description, $amount, $vendor]) {
            $this->put('account_payable_components', ['id' => $id, 'account_payable_id' => $ap, 'component_type' => 'vendor_payment', 'description' => $description, 'amount' => $amount, 'outstanding_amount' => $amount, 'paid_amount' => 0, 'status' => 'unpaid', 'vendor_id' => $vendor, 'related_items' => '{}']);
        }
        foreach ([1066 => 62, 1067 => 19, 1093 => 101, 1095 => 102, 1068 => 99, 1111 => 15] as $id => $vendor) {
            $components = $this->db->table('account_payable_components')->where('account_payable_id', $id);
            $amount = number_format((float) (clone $components)->sum('amount'), 2, '.', '');
            $this->put('account_payables', ['id' => $id, 'sales_order_id' => 322, 'vendor_id' => $vendor, 'amount' => $amount, 'outstanding_amount' => $amount, 'paid_amount' => 0, 'status' => 'unpaid', 'service_description' => implode(', ', $components->orderBy('id')->pluck('description')->all())]);
        }
        $this->item(8000, 'MAIN', 1, 11348000, 'SET', 19, 'vendor_19', 'billable');
        $this->item(8001, 'COGS', 1, 8076500, 'SET', 19, 'cogs_19', 'operational_cost');
        $this->put('account_receivables', ['id' => 368, 'sales_order_id' => 322, 'invoice_id' => 308, 'invoice_amount' => '32417498.00', 'outstanding_amount' => '32417498.00', 'paid_amount' => 0, 'status' => 'overdue', 'due_date' => '2026-09-30']);
        foreach ([537 => ['debit_note', '21069498.00'], 538 => ['main', '11348000.00']] as $id => [$type, $amount]) {
            $this->put('account_receivable_components', ['id' => $id, 'account_receivable_id' => 368, 'component_type' => $type, 'amount' => $amount, 'outstanding_amount' => $amount, 'paid_amount' => 0, 'status' => 'overdue']);
        }
        $this->put('profit_loss_periods', ['id' => 36, 'status' => 'draft']);
        $this->put('profit_loss_entries', ['id' => 1341, 'period_id' => 36, 'reference_type' => 'shipment_profit', 'reference_id' => 322, 'entry_type' => 'auto_shipment_profit', 'amount' => '3341500.00', 'additional_data' => '{"invoice_ids":[308]}']);
        $this->put('bank_transactions', ['id' => 1, 'reference_type' => 'manual', 'reference_id' => 1, 'amount' => '98765.00']);
        // Existing invoice outstanding values are stale, despite zero payments.
        $this->db->table('invoice_items')->where('id', 8646)->update(['outstanding_amount' => '200000.00']);
    }

    protected function tearDown(): void
    {
        $this->db->disconnect();
        foreach (glob($this->directory . '/*.json') ?: [] as $file) {
            unlink($file);
        }
        if (is_dir($this->directory)) {
            rmdir($this->directory);
        }
    }

    public function test_dry_run_is_read_only_and_does_not_deduct_previous_cleanup_twice(): void
    {
        $before = $this->dump();
        $plan = $this->repair->plan();
        self::assertSame([652, 676, 677, 684, 690, 691, 692], $plan['deletes']['reimbursement_items']);
        self::assertSame('21968904.00', $plan['updates']['invoices'][308]['total']);
        self::assertSame($before, $this->dump());
        self::assertDirectoryDoesNotExist($this->directory);
    }

    public function test_final_items_related_balances_metadata_and_protected_data(): void
    {
        $before = $this->dump();
        $result = $this->repair->apply($this->repair->plan());
        self::assertFileExists($result['backup']);
        self::assertSame([653, 662, 663, 664, 683, 689], $this->db->table('reimbursement_items')->orderBy('id')->pluck('id')->all());
        foreach ([653 => ['DEPOSIT KONTAINER', 1, 2800000], 664 => ['EXTRA KULI', 1, 100000], 662 => ['STORAGE', 1, 5677660], 689 => ['LOLO', 2, 821622], 683 => ['PARKIR', 2, 50000], 663 => ['TKBM', 2, 150000]] as $id => [$name, $qty, $rate]) {
            $r = $this->db->table('reimbursement_items')->find($id);
            self::assertSame($name, $r->description);
            self::assertEquals($qty, $r->quantity);
            self::assertEquals($rate, $r->amount);
            self::assertEquals($qty * $rate, $r->customer_outstanding_amount);
            $meta = json_decode($r->receipt_info, true);
            self::assertEquals($qty, $meta['quantity']);
            self::assertEquals($rate, $meta['unit_price']);
            $item = $this->db->table('invoice_items')->where('item_ref', 'reimbursement_' . $id)->first();
            self::assertEquals($qty * $rate, $item->amount);
            self::assertSame((float) $item->amount, (float) $item->outstanding_amount);
        }
        foreach ([1066 => 5677660, 1067 => 5253244, 1093 => 3500000, 1095 => 3800000] as $id => $amount) {
            self::assertEquals($amount, $this->db->table('account_payables')->where('id', $id)->value('amount'));
        }
        self::assertSame('10620904.00', $this->db->table('account_receivable_components')->where('id', 537)->value('amount'));
        self::assertSame('21968904.00', $this->db->table('account_receivables')->where('id', 368)->value('outstanding_amount'));
        foreach (['sales_orders', 'profit_loss_entries', 'profit_loss_periods', 'bank_transactions', 'petty_cash_transactions'] as $table) {
            self::assertSame($before[$table], $this->dump()[$table]);
        }
        foreach ([5151, 5157, 5689, 5223, 5228, 5264, 5260] as $id) {
            self::assertEquals($before['account_payable_components'][$id], (array) $this->db->table('account_payable_components')->find($id));
        }
        self::assertEquals($before['account_receivable_components'][538], (array) $this->db->table('account_receivable_components')->find(538));
        $after = $this->dump();
        self::assertTrue($this->repair->plan()['clean']);
        self::assertNull($this->repair->apply($this->repair->plan())['backup']);
        self::assertSame($after, $this->dump());
    }

    public function test_original_sixteen_item_state_also_produces_same_final_result(): void
    {
        foreach ([[685, 'PARKIR 1', 1, 50000, '20GP', 102, 9561, 5262, 1095], [686, 'TKBM 1', 1, 150000, '20GP', 102, 9562, 5263, 1095], [687, 'TKBM', 2, 150000, '20GP', 101, 9563, 5261, 1093]] as $source) {
            $this->source($source);
        }
        foreach ([1093 => 300000, 1095 => 200000] as $id => $delta) {
            $amount = (float) $this->db->table('account_payables')->where('id', $id)->value('amount') + $delta;
            $this->db->table('account_payables')->where('id', $id)->update(['amount' => $amount, 'outstanding_amount' => $amount]);
        }
        $this->db->table('invoices')->where('id', 308)->update(['subtotal' => '32917498.00', 'total' => '32917498.00']);
        $this->db->table('account_receivables')->where('id', 368)->update(['invoice_amount' => '32917498.00', 'outstanding_amount' => '32917498.00']);
        $this->db->table('account_receivable_components')->where('id', 537)->update(['amount' => '21569498.00', 'outstanding_amount' => '21569498.00']);
        $plan = $this->repair->plan();
        self::assertCount(10, $plan['deletes']['reimbursement_items']);
        $this->repair->apply($plan);
        self::assertTrue($this->repair->plan()['clean']);
        self::assertSame('21968904.00', $this->db->table('invoices')->where('id', 308)->value('total'));
    }

    public function test_payment_on_keeper_prevents_repair(): void
    {
        $this->db->table('reimbursement_items')->where('id', 653)->update(['customer_paid_amount' => 100]);
        $this->expectExceptionMessage('memiliki pembayaran');
        $this->repair->plan();
    }

    public function test_extra_source_prevents_repair(): void
    {
        $this->put('reimbursement_items', ['id' => 9999, 'sales_order_id' => 322]);
        $this->expectExceptionMessage('Daftar sumber berbeda/parsial');
        $this->repair->plan();
    }

    public function test_changed_source_prevents_repair(): void
    {
        $this->db->table('reimbursement_items')->where('id', 653)->update(['amount' => 280001]);
        $this->expectExceptionMessage('identitas/nominal');
        $this->repair->plan();
    }

    public function test_partial_deletion_prevents_repair(): void
    {
        $this->db->table('reimbursement_items')->where('id', 652)->delete();
        $this->expectExceptionMessage('Daftar sumber berbeda/parsial');
        $this->repair->plan();
    }

    public function test_changed_quantity_metadata_prevents_repair(): void
    {
        $this->db->table('reimbursement_items')->where('id', 689)->update(['receipt_info' => '{"quantity":1,"unit":"20GP","unit_price":821622,"currency":"IDR"}']);
        $this->expectExceptionMessage('Receipt #689');
        $this->repair->plan();
    }

    public function test_closed_period_prevents_final_repair(): void
    {
        $this->db->table('profit_loss_periods')->where('id', 36)->update(['status' => 'closed']);
        $this->expectExceptionMessage('Periode posting sudah ditutup');
        $this->repair->plan();
    }

    public function test_notes_on_newly_affected_component_prevent_repair(): void
    {
        $this->put('account_payable_notes', ['id' => 1, 'component_id' => 5685, 'account_payable_id' => 1067, 'note' => 'vendor invoice received']);
        $this->expectExceptionMessage('Referensi tambahan');
        $this->repair->plan();
    }

    public function test_vendor_invoice_allocation_prevents_final_repair(): void
    {
        $this->db->getSchemaBuilder()->create('vendor_invoice_items', function (Blueprint $table) {
            $table->integer('id')->primary();
            $table->integer('account_payable_component_id');
        });
        $this->put('vendor_invoice_items', ['id' => 1, 'account_payable_component_id' => 5685]);
        $this->expectExceptionMessage('Referensi tambahan');
        $this->repair->plan();
    }

    public function test_bank_payment_on_newly_affected_ap_prevents_repair(): void
    {
        $this->put('bank_transactions', ['id' => 2, 'reference_type' => 'vendor_payment', 'reference_id' => 1067, 'amount' => 1]);
        $this->expectExceptionMessage('Transaksi/posting');
        $this->repair->plan();
    }

    public function test_external_invoice_alias_prevents_repair(): void
    {
        $this->item(9999, 'Extra', 1, 100, 'SET', 19, 'reimb_653', 'reimbursement');
        $this->expectExceptionMessage('Referensi invoice');
        $this->repair->plan();
    }

    public function test_stale_plan_prevents_all_writes(): void
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

    public function test_failure_after_deletes_rolls_back_every_table(): void
    {
        $plan = $this->repair->plan();
        $before = $this->dump();
        $this->db->unprepared("CREATE TRIGGER fail_update BEFORE UPDATE ON invoices BEGIN SELECT RAISE(ABORT, 'simulated failure'); END");
        try {
            $this->repair->apply($plan);
            self::fail('Failure not raised');
        } catch (\Illuminate\Database\QueryException $e) {
            self::assertStringContainsString('simulated failure', $e->getMessage());
        }
        self::assertSame($before, $this->dump());
    }

    public function test_incomplete_final_metadata_is_not_silently_accepted(): void
    {
        $this->repair->apply($this->repair->plan());
        $this->db->table('invoice_items')->where('id', 8645)->update(['outstanding_amount' => 0]);
        $this->expectExceptionMessage('kondisi parsial');
        $this->repair->plan();
    }

    public function test_backup_failure_prevents_all_writes(): void
    {
        $repair = new RepairSo2608166005($this->db, __FILE__, true);
        $before = $this->dump();
        try {
            @$repair->apply($repair->plan());
            self::fail('Backup failure not raised');
        } catch (RuntimeException $e) {
            self::assertStringContainsString('backup', strtolower($e->getMessage()));
        }
        self::assertSame($before, $this->dump());
    }

    private function source(array $values): void
    {
        [$id, $description, $qty, $rate, $unit, $vendor, $item, $component, $ap] = $values;
        $meta = ['quantity' => $qty, 'unit' => $unit, 'unit_price' => $rate];
        $this->put('reimbursement_items', ['id' => $id, 'sales_order_id' => 322, 'invoice_id' => 308, 'description' => $description, 'quantity' => $qty, 'amount' => $rate, 'unit' => $unit, 'vendor_id' => $vendor, 'status' => 'invoiced', 'customer_paid_amount' => 0, 'customer_outstanding_amount' => $qty * $rate, 'receipt_info' => json_encode($meta + ['currency' => 'IDR'])]);
        $this->item($item, 'Reimbursement - ' . $description, $qty, $rate, $unit, $vendor, 'reimbursement_' . $id, 'reimbursement');
        $this->put('account_payable_components', ['id' => $component, 'account_payable_id' => $ap, 'component_type' => 'reimbursement', 'description' => $description, 'amount' => $qty * $rate, 'outstanding_amount' => $qty * $rate, 'paid_amount' => 0, 'status' => 'unpaid', 'vendor_id' => $vendor, 'related_items' => json_encode($meta + ['source' => 'reimbursement_items', 'reimbursement_item_id' => $id, 'lookup_ref' => 'reimbursement_' . $id])]);
    }

    private function item(int $id, string $description, int $qty, int $rate, string $unit, int $vendor, string $ref, string $type): void
    {
        $this->put('invoice_items', ['id' => $id, 'invoice_id' => 308, 'description' => $description, 'quantity' => $qty, 'unit' => $unit, 'rate' => $rate, 'amount' => $qty * $rate, 'outstanding_amount' => $qty * $rate, 'paid_amount' => 0, 'vendor_id' => $vendor, 'item_ref' => $ref, 'item_type' => $type, 'currency' => 'IDR', 'include_in_customer_invoice' => $type === 'operational_cost' ? 0 : 1, 'is_hidden_from_customer' => $type === 'operational_cost' ? 1 : 0]);
    }

    private function put(string $table, array $row): void
    {
        $this->db->table($table)->insert($row);
    }

    private function dump(): array
    {
        $result = [];
        foreach ($this->db->getSchemaBuilder()->getTableListing(null, false) as $table) {
            $result[$table] = $this->db->table($table)->orderBy('id')->get()->keyBy('id')->map(fn ($r) => (array) $r)->all();
        }
        return $result;
    }
}
