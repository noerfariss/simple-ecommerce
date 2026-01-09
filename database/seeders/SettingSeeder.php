<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Min. stock
        Setting::create(['label' => 'min_stock', 'value' => 2]);
        Setting::create(['label' => 'email_notification', 'value' => 'noerfaris.solusi@gmail.com']);
        Setting::create(['label' => 'email_notification', 'value' => 'noerfaris@gmail.com']);
    }
}
