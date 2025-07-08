<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $notifications = $user->notifications()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'count' => $notifications->count(),
            'notifications' => $notifications,
    ]);

        $existingMessages = $user->notifications()->pluck('message')->toArray();

        $orders = $user->orders()->where('status', '!=', 'delivered')->get();
        foreach ($orders as $order) {
            $message = "Order #{$order->id} is not yet delivered.";

            if (!in_array($message, $existingMessages)) {
                $user->notifications()->create([
                    'type' => 'order',
                    'message' => $message,
                ]);
                $existingMessages[] = $message;
            }

            $notifications[] = [
                'type' => 'order',
                'message' => $message,
            ];
        }

        $cancellations = $user->orders()->where('status', 'cancelled')->get();
        foreach ($cancellations as $order) {
            $message = "Order #{$order->id} has been cancelled.";

            if (!in_array($message, $existingMessages)) {
                $user->notifications()->create([
                    'type' => 'cancel',
                    'message' => $message,
                ]);
                $existingMessages[] = $message;
            }

            $notifications[] = [
                'type' => 'cancel',
                'message' => $message,
            ];
        }

        $reviews = $user->reviews()->whereNull('read_at')->get();
        foreach ($reviews as $review) {
            $message = "You have an unread review for product #{$review->product_id}.";

            if (!in_array($message, $existingMessages)) {
                $user->notifications()->create([
                    'type' => 'review',
                    'message' => $message,
                ]);
                $existingMessages[] = $message;
            }

            $notifications[] = [
                'type' => 'review',
                'message' => $message,
            ];
        }

        return response()->json([
            'count' => count($notifications),
            'notifications' => $notifications,
        ]);
    }
}
