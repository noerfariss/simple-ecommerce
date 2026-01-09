<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $setting = Setting::query();

        $minStock = (clone $setting)->where('label', 'min_stock')->first()->value;
        $emails = (clone $setting)->where('label', 'email_notification')->get()->pluck('value');

        return Inertia::render('Setting/Index', [
            'setting' => [
                'min_stock' => $minStock,
                'emails' => $emails ?? []
            ]
        ]);
    }

    public function update(Request $request)
    {
        Setting::updateOrCreate(
            ['label' => 'min_stock'],
            ['value' => $request->min_stock]
        );

        Setting::where('label', 'email_notification')->delete();

        foreach ($request->emails as $email) {
            Setting::create([
                'label' => 'email_notification',
                'value' => $email,
            ]);
        }

        return back()->with('success', 'Setting updated');
    }
}
