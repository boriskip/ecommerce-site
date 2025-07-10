<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\NotificationController;
// use App\Http\Controllers\WishlistController;


// ✅ Открытые маршруты
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::get('/products/public', [ProductController::class, 'publicIndex']);
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrf' => 'ok']);
});

// 🔒 Защищённые маршруты
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::get('/user', fn(Request $request) => $request->user());

    // карзина
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::delete('/cart/clear', [CartController::class, 'clear']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    
    // 🛍 Products CRUD
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // address book
    Route::get('/addresses', [AddressController::class, 'index']);
    Route::post('/addresses', [AddressController::class, 'store']);
    Route::put('/addresses/{id}', [AddressController::class, 'update']);
    Route::delete('/addresses/{id}', [AddressController::class, 'destroy']);

    //profile
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);

    //Payment
    Route::get('/payment-methods', [PaymentMethodController::class, 'index']);
    Route::post('/payment-methods', [PaymentMethodController::class, 'store']);
    Route::delete('/payment-methods/{id}', [PaymentMethodController::class, 'destroy']);

   // Orders
     Route::post('/orders', [OrderController::class, 'store']);
     Route::post('/orders/complete-checkout', [OrderController::class, 'completeAfterStripe']);
     Route::get('/orders', [OrderController::class, 'index']);
     Route::post('/orders/{order}/cancel', [OrderController::class, 'cancel']);


    //  strip payment 
    Route::post('/stripe/checkout', [StripeController::class, 'createCheckoutSession']);
     Route::patch('/orders/{order}/pay-card', [OrderController::class, 'payWithCard']);
     Route::post('/stripe/checkout/order', [StripeController::class, 'payOrderWithStripe']);
     Route::post('/orders/complete-checkout', [StripeController::class, 'completeCheckout']);


Route::get('/notifications', [NotificationController::class, 'index']);

});
