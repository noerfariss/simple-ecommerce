<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->words(2, true);
        return [
            'name' => $name,
            'price' => fake()->numberBetween(500, 2000),
            'stock_quantity' => fake()->numberBetween(0, 8),
            'slug' => Str::slug($name) . '-' . rand(111, 999)
        ];
    }
}
