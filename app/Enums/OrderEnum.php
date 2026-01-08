<?php

namespace App\Enums;

enum OrderEnum: int
{
    case PENDING  = 0;
    case PAID     = 1;
    case CANCELED = 2;

    public function label(): string
    {
        return match ($this) {
            self::PENDING  => 'Pending',
            self::PAID     => 'Paid',
            self::CANCELED => 'Canceled',
        };
    }
}
