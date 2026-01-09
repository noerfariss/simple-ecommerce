<?php

namespace App\Console\Commands;

use App\Mail\DailySalesMail;
use App\Models\OrderItem;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class SendDailySalesReport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'report:daily-sales';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'daily sales';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $emails = Setting::where('label', 'email_notification')
            ->pluck('value')
            ->toArray();

        if (empty($emails)) {
            $this->warn('No email recipients configured.');
            return self::SUCCESS;
        }

        $date = Carbon::today()->toDateString();

        $sales = OrderItem::query()
            ->select(
                'products.name as product_name',
                DB::raw('SUM(order_items.qty) as total_qty'),
                DB::raw('SUM(order_items.subtotal) as total_revenue')
            )
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->join('products', 'products.id', '=', 'order_items.product_id')
            ->whereDate('orders.created_at', $date)
            // ->where('orders.status', 1) // PAID
            ->groupBy('products.name')
            ->orderByDesc('total_qty')
            ->get();

        if ($sales->isEmpty()) {
            $this->info('No sales found for ' . $date);
            return self::SUCCESS;
        }

        foreach ($emails as $email) {
            Mail::to($email)->send(new DailySalesMail($sales, $date));
        }

        $this->info('Daily sales report email sent.');

        return self::SUCCESS;
    }
}
