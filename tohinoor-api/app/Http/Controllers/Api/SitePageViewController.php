<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SitePageView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SitePageViewController extends Controller
{
    /**
     * ثبت بازدید یک صفحه از سایت عمومی
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'path' => [
                'required',
                'string',
                'max:255',
                'starts_with:/',
                'not_regex:/[?#]/',
            ],
            'visitor_id' => [
                'required',
                'uuid',
            ],
        ]);

        SitePageView::create([
            'path' => $validated['path'],
            'visitor_hash' => hash(
                'sha256',
                $validated['visitor_id']
            ),
        ]);

        return response()->json([
            'message' => 'Page view recorded.',
        ], 201);
    }

    /**
     * دریافت آمار بازدید برای داشبورد مدیریت
     */
    public function stats(): JsonResponse
    {
        $today = now()->startOfDay();
        $now = now();

        // آمار امروز
        $todayViews = SitePageView::where(
            'created_at',
            '>=',
            $today
        )->count();

        $todayUniqueVisitors = SitePageView::where(
            'created_at',
            '>=',
            $today
        )
            ->distinct('visitor_hash')
            ->count('visitor_hash');

        // آمار کلی از ابتدای ثبت بازدید
        $totalPageViews = SitePageView::count();

        $totalUniqueVisitors = SitePageView::query()
            ->distinct('visitor_hash')
            ->count('visitor_hash');

        // آمار هفت روز اخیر، شامل امروز
        $startDate = $today->copy()->subDays(6);

        $dailyRows = DB::table('site_page_views')
            ->selectRaw(
                'DATE(created_at) as date,
                COUNT(*) as page_views,
                COUNT(DISTINCT visitor_hash) as unique_visitors'
            )
            ->whereBetween('created_at', [
                $startDate,
                $now,
            ])
            ->groupByRaw('DATE(created_at)')
            ->orderBy('date')
            ->get()
            ->keyBy('date');

        $lastSevenDays = [];

        for ($i = 0; $i < 7; $i++) {
            $date = $startDate->copy()
                ->addDays($i)
                ->toDateString();

            $row = $dailyRows->get($date);

            $lastSevenDays[] = [
                'date' => $date,
                'page_views' => (int) ($row->page_views ?? 0),
                'unique_visitors' => (int) (
                    $row->unique_visitors ?? 0
                ),
            ];
        }

        // ده صفحه پربازدید در ۳۰ روز اخیر
        $topPages30Days = SitePageView::query()
            ->select('path')
            ->selectRaw('COUNT(*) as views')
            ->where(
                'created_at',
                '>=',
                $today->copy()->subDays(29)
            )
            ->groupBy('path')
            ->orderByDesc('views')
            ->limit(10)
            ->get();

        // ده صفحه پربازدید از ابتدای ثبت آمار
        $topPagesAllTime = SitePageView::query()
            ->select('path')
            ->selectRaw('COUNT(*) as views')
            ->groupBy('path')
            ->orderByDesc('views')
            ->limit(10)
            ->get();

        return response()->json([
            'data' => [
                'today' => [
                    'page_views' => $todayViews,
                    'unique_visitors' => $todayUniqueVisitors,
                ],
                'all_time' => [
                    'page_views' => $totalPageViews,
                    'unique_visitors' => $totalUniqueVisitors,
                ],
                'last_7_days' => $lastSevenDays,
                'top_pages_30_days' => $topPages30Days,
                'top_pages_all_time' => $topPagesAllTime,
            ],
        ]);
    }
}
