<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User; 

class AddressSeeder extends Seeder
{
    public function run(): void
    {
                $user = User::where('is_admin', false)->first();

        if (!$user) {
            echo "❗ Нет обычного пользователя для создания адреса.\n";
            return;
        }
        DB::table('addresses')->insert([
            [
               'user_id'     => $user->id,
                'street'      => '123 King St',
                'city'        => 'New York',
                'state'       => 'NY',
                'postal_code' => '10001',
                'country'     => 'USA',
                'is_default'  => true,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ]);
    }
}
