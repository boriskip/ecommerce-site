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
use App\Http\Controllers\BenefitsController;
use App\Http\Controllers\NewArrivalsController;
use App\Http\Controllers\FooterController;
use App\Http\Controllers\HeaderController;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\BenefitController as AdminBenefitController;
use App\Http\Controllers\Admin\FooterController as AdminFooterController;
use App\Http\Controllers\Admin\HeaderController as AdminHeaderController;
use App\Http\Controllers\Admin\HeroController as AdminHeroController;

// use App\Http\Controllers\WishlistController;


// ✅ Открытые маршруты
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::get('/products/public', [ProductController::class, 'publicIndex']);
Route::get('/benefits', [BenefitsController::class, 'index']); // Публичный доступ к Benefits
Route::get('/new-arrivals', [NewArrivalsController::class, 'index']); // Публичный доступ к New Arrivals
Route::get('/footer', [FooterController::class, 'index']); // Публичный доступ к Footer
Route::get('/header', [HeaderController::class, 'index']); // Публичный доступ к Header
Route::get('/hero', [HeroController::class, 'index']); // Публичный доступ к Hero
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
    
    // 🛍 Products User
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
     Route::get('/orders', [OrderController::class, 'index']); //Get all orders
     Route::post('/orders', [OrderController::class, 'store']); // Create cash order

    // Route::post('/orders/complete-checkout', [OrderController::class, 'completeAfterStripe']); //Moved to stripe section for clarity.

     Route::patch('/orders/{order}/cancel', [OrderController::class, 'cancel']); // Cancel order
     Route::patch('/orders/{order}/pay-card', [OrderController::class, 'payWithCard']); // Pay without Stripe - possible admin option.

    //  Stripe Payment Routes
    Route::post('/stripe/checkout', [StripeController::class, 'createCheckoutSession']); // Create the Stripe checkout session

    Route::post('/stripe/pay-order', [StripeController::class, 'payOrderWithStripe']); // Pay order with stripe
    Route::post('/stripe/checkout/order', [StripeController::class, 'payOrderWithStripe']); //duplicate route
    Route::post('/stripe/complete', [StripeController::class, 'completeCheckout']); // After stripe redirect
    Route::post('/orders/complete-checkout', [OrderController::class, 'completeAfterStripe']);

    Route::get('/notifications', [NotificationController::class, 'index']);

    // Admin dashboard - с аутентификацией
    Route::prefix('admin')->group(function () {
        Route::apiResource('products', AdminProductController::class);
        Route::apiResource('new-arrivals', \App\Http\Controllers\Admin\NewArrivalController::class);
        Route::apiResource('benefits', AdminBenefitController::class);
        Route::get('/footer', [AdminFooterController::class, 'index']);
        Route::put('/footer', [AdminFooterController::class, 'update']);
        Route::get('/header', [AdminHeaderController::class, 'index']);
        Route::put('/header', [AdminHeaderController::class, 'update']);
        Route::get('/hero', [AdminHeroController::class, 'index']);
        Route::put('/hero', [AdminHeroController::class, 'update']);
    });
});
