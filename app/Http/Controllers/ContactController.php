<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Contact/Index');
    }
}
