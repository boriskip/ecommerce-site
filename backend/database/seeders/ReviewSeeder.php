<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        // ⚠️ Если хочешь каждый раз с чистого листа — раскомментируй
        // Review::truncate();

        $reviews = [
            [
                'user_id' => 1,
                'product_id' => 2,
                'rating' => 4,
                'comment' => 'Очень хороший товар!',
            ],
            [
                'user_id' => 1,
                'product_id' => 3,
                'rating' => 5,
                'comment' => 'Потрясающий продукт!',
            ],
            [
                'user_id' => 2,
                'product_id' => 2,
                'rating' => 3,
                'comment' => 'Ожидал большего, но сойдет.',
            ],
        ];

        foreach ($reviews as $review) {
            Review::firstOrCreate(
                [
                    'user_id' => $review['user_id'],
                    'product_id' => $review['product_id'],
                ],
                [
                    'rating' => $review['rating'],
                    'comment' => $review['comment'],
                ]
            );
        }
    }
}
