<?php

namespace App\Console\Commands;

use App\Mail\LowStockMail;
use App\Models\Product;
use App\Models\Setting;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class CheckLowStock extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stock:check-low';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check low stock every night';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $minStock = Setting::where('label', 'min_stock')->value('value');

        if ($minStock === null) {
            $this->warn('Minimum stock setting not found.');
            return Command::SUCCESS;
        }

        $emails = Setting::where('label', 'email_notification')
            ->pluck('value')
            ->toArray();

        if (empty($emails)) {
            $this->warn('No email notification recipients found.');
            return Command::SUCCESS;
        }

        $products = Product::where('stock_quantity', '<=', $minStock)->get();

        if ($products->isEmpty()) {
            $this->info('No low stock products found.');
            return Command::SUCCESS;
        }

        foreach ($emails as $email) {
            Mail::to($email)->send(new LowStockMail($products, $minStock));
            sleep(3); // ⏳ delay 3 second
        }

        $this->info('Low stock notification emails sent successfully.');

        return Command::SUCCESS;
    }
}
