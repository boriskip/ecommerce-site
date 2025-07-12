<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
   public function index(Request $request)
    {
        return $request->user()->payments;
    }

        public function store(Request $request)
    {
        $validated = $request->validate([
            'card_holder' => 'required|string|max:255',
            'card_number' => 'required|string|max:16',
            'expiry_date' => 'required|string|max:7',
            'cvv' => 'nullable|string|max:4',
        ]);

          return $request->user()->payments()->create($validated);
}
 public function destroy($id)
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();

        return response()->json(['message' => 'Payment deleted']);
    }
}