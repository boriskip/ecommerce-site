<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Benefit;
use Illuminate\Http\Request;

class BenefitController extends Controller
{
    public function index() {
        return Benefit::all();
    }

    public function store(Request $request) 
    {
        $request->validate([
            'icon' => 'required|string',
            'title' => 'required|string',
            'subtitle' => 'required|string',
        ]);
        return Benefit::create($request->all());
    }

    public function update(Request $request, Benefit $benefit)
    {
        $benefit->update($request->only(['icon', 'title', 'subtitle']));

        return response()->json(['message' => 'Updated']); 
    }

    public function destroy(Benefit $benefit)
    {
        $benefit->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
