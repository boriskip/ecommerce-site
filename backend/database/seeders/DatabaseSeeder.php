<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Создаём или получаем админа (если он уже существует)
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'], // Условие поиска
            [
                'name' => 'Admin',
                'password' => Hash::make('password'), // Используем Hash::make() для совместимости
                'email_verified_at' => now(),
                'remember_token' => \Str::random(10),
                'is_admin' => true,
            ]
        );

        User::factory(5)->create();

        // Запуск сидера для продуктов
        $this->call([
            ProductSeeder::class,
            ReviewSeeder::class,
            // 👇 Добавим AddressSeeder
            AddressSeeder::class,
        ]);
    }
}
