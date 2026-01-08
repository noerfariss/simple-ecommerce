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
use Inertia\Inertia;

class CartController extends Controller
{
    protected $defaultQty = 1;

    public function index(CartCacheService $cartservice)
    {
        return Inertia::render('Cart/Index', [
            'datacart' => $cartservice->get()
        ]);
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

            DB::commit();

            $cartservice->refresh();

            return redirect()->back()->with('success', 'Product has been added');
        } catch (\Throwable $th) {
            Log::warning($th->getMessage());
            DB::rollBack();

            return redirect()->back()->with('error', 'Something not working properly, contact admin!');
        }

        return 'cart';
    }

    public function update(Product $product, Request $request, CartCacheService $cartservice)
    {
        DB::beginTransaction();
        try {
            $cart = Cart::where('user_id', Auth::id())
                ->where('product_id', $product->id)
                ->lockForUpdate()
                ->first();

            if (! $cart) {
                abort(404, 'Cart item not found');
            }

            $qty = $cart->qty;

            if ($request->type === 'add') {
                if ($qty >= $product->stock_quantity) {
                    return redirect()->back()->with('error', 'Stock not enough');
                }

                $qty++;
            } else {
                $qty--;

                if ($qty <= 0) {
                    $cart->delete();
                    $cartservice->refresh();

                    DB::commit();
                    return redirect()->back()->with('success', 'Item removed');
                }
            }

            $cart->update([
                'qty' => $qty,
                'subtotal' => $qty * $product->price,
            ]);

            DB::commit();

            $cartservice->refresh();

            return redirect()->back()->with('success', 'Cart updated');

        } catch (\Throwable $th) {
            Log::warning($th->getMessage());
            DB::rollBack();

            return redirect()->back()->with('error', 'Process failed');
        }
    }

    public function remove(Product $product, CartCacheService $cartservice)
    {
        DB::beginTransaction();
        try {

            Cart::where('product_id', $product->id)->where('user_id', Auth::id())->delete();
            DB::commit();

            $cartservice->refresh();

            return redirect()->back()->with('success', 'Item has been removed');
        } catch (\Throwable $th) {
            Log::warning($th->getMessage());
            DB::rollBack();

            return redirect()->back()->with('error', 'Process failed');
        }
    }
}
