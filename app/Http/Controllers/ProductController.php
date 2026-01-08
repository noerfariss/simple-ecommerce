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
        $products = Product::query()->with('images')->where('stock_quantity', '<>', 0)->where('status', true);

        $newproducts = (clone $products)->orderBy('created_at', 'desc')->limit(6)->get();
        $cheap = (clone $products)->orderBy('price', 'asc')->limit(6)->get();

        $flashsale = (clone $products)->whereBetween('stock_quantity', [1, 5])->limit(6)->get();

        return Inertia::render('Product/Index', [
            'newproducts' => Inertia::optional(fn() => $newproducts),
            'cheap' => Inertia::optional(fn() => $cheap),
            'flashsale' => Inertia::optional(fn() => $flashsale)
        ]);
    }

    public function all(ProductFilterRequest $request)
    {
        $search = $request->search;
        $min = $request->min;
        $max = $request->max;

        $products = Product::query()
            ->when($search, fn($e, $search) => $e->where('name', 'like', "%{$search}%"))
            ->when($min, fn($e, $min) => $e->where('price', '>=', $min))
            ->when($max, fn($e, $max) => $e->where('price', '<=', $max))
            ->with(['images'])
            ->where('status', true)
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
