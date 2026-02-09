<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Services\FinancialPositionService;
use App\Models\EquityYearClosing;
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
        $year = $request->input('year');
        $cutoffDate = $request->input('date');

        if ($year) {
            $cutoffDate = Carbon::createFromDate((int) $year, 12, 31)->toDateString();
        }

        if (!$cutoffDate) {
            $cutoffDate = now()->toDateString();
        }

        $statement = $this->financialPositionService->getStatement($cutoffDate);
        $closedYears = EquityYearClosing::query()
            ->orderByDesc('year')
            ->pluck('year')
            ->unique()
            ->values();

        if ($request->wantsJson()) {
            return response()->json($statement);
        }

        return Inertia::render('Admin/AdminKeuangan/FinancialPosition/Index', [
            'statement' => $statement,
            'filters' => [
                'date' => $cutoffDate,
                'year' => $year,
            ],
            'closedYears' => $closedYears,
        ]);
    }

    public function downloadPdf(Request $request)
    {
        $year = $request->input('year');
        $cutoffDate = $request->input('date');

        if ($year) {
            $cutoffDate = Carbon::createFromDate((int) $year, 12, 31)->toDateString();
        }

        if (!$cutoffDate) {
            $cutoffDate = now()->toDateString();
        }
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
