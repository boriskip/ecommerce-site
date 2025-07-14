<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FlashSale;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class FlashSaleController extends Controller
{
    // Получить только активные flash sales
    public function index()
    {
        $now = Carbon::now();
        $flashSales = FlashSale::with('product')
            ->where('starts_at', '<=', $now)
            ->where('ends_at', '>=', $now)
            ->orderBy('ends_at')
            ->get();
        return response()->json($flashSales);
    }
} 