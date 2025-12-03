<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Services\FinancialPositionService;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinancialPositionController extends Controller
{
    public function __construct(
        private readonly FinancialPositionService $financialPositionService
    ) {
    }

    public function index(Request $request)
    {
        $cutoffDate = $request->input('date', now()->toDateString());

        $statement = $this->financialPositionService->getStatement($cutoffDate);

        if ($request->wantsJson()) {
            return response()->json($statement);
        }

        return Inertia::render('Admin/AdminKeuangan/FinancialPosition/Index', [
            'statement' => $statement,
            'filters' => [
                'date' => $cutoffDate,
            ],
        ]);
    }

    public function downloadPdf(Request $request)
    {
        $cutoffDate = $request->input('date', now()->toDateString());
        $statement = $this->financialPositionService->getStatement($cutoffDate);
        $cutoffCarbon = Carbon::parse($cutoffDate);

        $pdf = Pdf::loadView('admin.admin-keuangan.financial-position.pdf-simple', [
            'statement' => $statement,
            'cutoffDate' => $cutoffCarbon,
            'generatedAt' => Carbon::now(),
            'companyName' => config('app.company_name', config('app.name', 'Perusahaan')),
        ])->setPaper('A4', 'portrait');

        $fileName = 'statement-of-financial-position-' . $cutoffCarbon->format('Ymd') . '.pdf';

        return $pdf->download($fileName);
    }
}
