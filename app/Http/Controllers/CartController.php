<?php

namespace App\Http\Controllers;

use App\Class\CartCacheClass;
use App\Facade\CartCache;
use App\Models\Cart;
use App\Models\Product;
use App\Services\CartCacheService;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    protected $defaultQty = 1;

    public function index()
    {
        return 'cart';
    }

    public function add(Product $product, CartCacheService $cartservice)
    {
        $currentStock = $product->stock_quantity;
        $checkCart = collect($cartservice->get())->where('product_id', $product->id)->first();
        $updateQty = $checkCart ? $checkCart->qty + $this->defaultQty : $this->defaultQty;

        if ($currentStock < $updateQty) {
            return redirect()->back()->with('error', "Product {$product->name} Out of Stock!");
        }

        DB::beginTransaction();
        try {

            Cart::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'product_id' => $product->id,
                ],
                [
                    'qty' => $updateQty,
                    'subtotal' => $product->price * $updateQty,
                ]
            );

            $cartservice->refresh();

            DB::commit();

            return redirect()->back()->with('success', 'Product has been added');
        } catch (\Throwable $th) {
            Log::warning($th->getMessage());
            DB::rollBack();

            return redirect()->back()->with('error', 'Something not working properly, contact admin!');
        }

        return 'cart';
    }

    public function update(Product $product, Request $request)
    {
        return 'update';
    }

    public function remove(Product $product)
    {
        return 'cart';
    }
}
