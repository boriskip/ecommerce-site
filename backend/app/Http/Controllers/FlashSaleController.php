<?php

namespace App\Http\Controllers;

use App\Models\FlashSale;
use Illuminate\Http\Request;


class FlashSaleController extends Controller
{
       public function index() {
        return FlashSale::with('product')->latest()->get();
    }
}
