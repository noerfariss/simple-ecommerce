<?php

namespace App\Services;

use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class CartCacheService
{
    protected function cacheID(): string
    {
        return 'cart-' . Auth::id();
    }

    public function exists()
    {
        return Cache::has($this->cacheID());
    }

    public function refresh()
    {
        Cache::forget($this->cacheID());
        $this->get();
    }

    public function get()
    {
        $data = Cache::remember($this->cacheID(), 60 * 24, function () {
            return Cart::query()
                ->with('product')
                ->where('user_id', Auth::id())
                ->get();
        });

        return $data;
    }
}
