<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductFilterRequest;
use App\Models\Product;
use App\Services\CartCacheService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Product/Index', [
            'products' => null
        ]);
    }

    public function all(ProductFilterRequest $request, CartCacheService $cartservice)
    {
        $search = $request->search;
        $min = $request->min;
        $max = $request->max;

        $products = Product::query()
            ->when($search, fn($e, $search) => $e->where('name', 'like', "%{$search}%"))
            ->when($min, fn($e, $min) => $e->where('price','>=', $min))
            ->when($max, fn($e, $max) => $e->where('price', '<=', $max))
            ->with(['images'])
            ->paginate(6);


        return Inertia::render('Product/All', [
            'products' => Inertia::scroll($products),
            'filters' => [
                'search' => $search,
                'min' => $min,
                'max' => $max
            ]
        ]);
    }
}
