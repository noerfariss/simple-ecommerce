<?php

namespace App\Http\Controllers;

use App\Models\Product;
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

    public function all()
    {
        $products = Product::query()
            ->with(['images'])
            ->paginate(6);


        return Inertia::render('Product/All', [
            'products' => Inertia::scroll($products)
        ]);
    }
}
