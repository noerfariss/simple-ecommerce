<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;


Route::get('/', [ProductController::class, 'index'])->name('product.index');
Route::get('/products', [ProductController::class, 'all'])->name('product.all');

Route::middleware('auth')->prefix('auth')->group(function () {
    Route::get('/', [ProfileController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // cart
    Route::prefix('cart')->name('cart.')->group(function () {
        Route::get('/', [CartController::class, 'index'])->name('index');
        Route::get('/{product}/add', [CartController::class, 'add'])->name('add');
        Route::put('/{product}', [CartController::class, 'update'])->name('update');
        Route::delete('/{product}', [CartController::class, 'remove'])->name('remove');
    });
});

require __DIR__ . '/auth.php';
