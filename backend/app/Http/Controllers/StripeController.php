<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; // 👈 вот это добавь


class StripeController extends Controller
{
    public function createCheckoutSession(Request $request)
    {

            Log::info('📦 Payload received', $request->all());
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => 'Demo Product',
                    ],
                    'unit_amount' => 1999, // в центах (19.99€)
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => 'http://localhost:8080/success',
            'cancel_url' => 'http://localhost:8080/cancel',
        ]);

        return response()->json(['url' => $session->url]);
    }
}
