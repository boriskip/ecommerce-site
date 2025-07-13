<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Benefit;
use Illuminate\Http\Request;

class BenefitController extends Controller
{
    public function index() {
        try {
            return Benefit::all();
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request) 
    {
        try {
            $request->validate([
                'icon' => 'required|string|max:50',
                'title' => 'required|string|max:255',
                'subtitle' => 'required|string|max:500',
            ]);
            
            return Benefit::create($request->all());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, Benefit $benefit)
    {
        try {
            $request->validate([
                'icon' => 'required|string|max:50',
                'title' => 'required|string|max:255',
                'subtitle' => 'required|string|max:500',
            ]);
            
            $benefit->update($request->only(['icon', 'title', 'subtitle']));

            return response()->json(['message' => 'Updated']); 
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Benefit $benefit)
    {
        try {
            $benefit->delete();
            return response()->json(['message' => 'Deleted']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
