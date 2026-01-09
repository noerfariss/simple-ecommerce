<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Low Stock Notification</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0; padding:0; background:#f3f4f6; font-family:Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 0;">
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background:#ffffff; border-radius:8px; overflow:hidden;">

                    {{-- Header --}}
                    <tr>
                        <td style="background:#dc2626; padding:20px;">
                            <h1 style="color:#ffffff; margin:0; font-size:20px;">
                                ⚠️ Low Stock Alert
                            </h1>
                        </td>
                    </tr>

                    {{-- Body --}}
                    <tr>
                        <td style="padding:24px; color:#111827;">
                            <p style="margin:0 0 16px;">
                                Hello,
                            </p>

                            <p style="margin:0 0 16px;">
                                The following product has reached a low stock level and is now below the minimum
                                threshold:
                            </p>

                            <table width="100%" cellpadding="8" cellspacing="0"
                                style="border-collapse:collapse; margin-bottom:16px;">
                                <tr style="background:#f9fafb;">
                                    <td style="border:1px solid #e5e7eb;"><strong>Product</strong></td>
                                    <td style="border:1px solid #e5e7eb;"><strong>Current Stock</strong></td>
                                    <td style="border:1px solid #e5e7eb;"><strong>Minimum Stock</strong></td>
                                </tr>

                                @foreach ($products as $product)
                                    <tr>
                                        <td style="border:1px solid #e5e7eb;">{{ $product->name }}</td>
                                        <td style="border:1px solid #e5e7eb;">{{ $product->stock_quantity }}</td>
                                        <td style="border:1px solid #e5e7eb;">
                                            {{ $threshold }}
                                        </td>
                                    </tr>
                                @endforeach

                            </table>

                            <p style="margin:0 0 24px;">
                                Please review this item and restock it as soon as possible to avoid any disruption to
                                sales.
                            </p>
                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td
                            style="background:#f9fafb; padding:16px; text-align:center;
                               font-size:12px; color:#6b7280;">
                            This is an automated notification email.<br>
                            © {{ date('Y') }} {{ config('app.name') }}
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>

</html>
