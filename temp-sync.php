<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
use App\Models\AccountPayable;

$ids = [108,109,110];
$out = [];
foreach ($ids as $id) {
    $p = AccountPayable::with('components')->find($id);
    if (!$p) { continue; }
    $p->syncComponents();
    $p->refresh()->load('components');
    $out[$id] = [
        'amount' => $p->amount,
        'paid' => $p->paid_amount,
        'outstanding' => $p->outstanding_amount,
        'status' => $p->status,
        'components' => $p->components->map(function($c){
            return [
                'id' => $c->id,
                'type' => $c->component_type,
                'desc' => $c->description,
                'amount' => $c->amount,
                'paid' => $c->paid_amount,
                'outstanding' => $c->outstanding_amount,
            ];
        }),
    ];
}

echo json_encode($out, JSON_PRETTY_PRINT);
