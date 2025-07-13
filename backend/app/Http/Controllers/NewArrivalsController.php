<?php

namespace App\Http\Controllers;

use App\Models\NewArrival;
use Illuminate\Http\Request;

class NewArrivalsController extends Controller
{
    public function index()
    {
        try {
            $newArrivals = NewArrival::all()->map(function ($item) {
                $item->image_url = $item->image 
                    ? asset('storage/' . $item->image) 
                    : null;
                return $item;
            });

            return response()->json($newArrivals);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
} 