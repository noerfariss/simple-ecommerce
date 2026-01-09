<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Daily Sales Report</title>
</head>

<body>
    <h2>Daily Sales Report</h2>
    <p>Date: <strong>{{ $date }}</strong></p>

    <table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;">
        <thead>
            <tr style="background:#f3f4f6;">
                <th align="left">Product</th>
                <th align="right">Quantity Sold</th>
                <th align="right">Total Revenue</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($sales as $item)
                <tr>
                    <td>{{ $item->product_name }}</td>
                    <td align="right">{{ $item->total_qty }}</td>
                    <td align="right">
                        Rp {{ number_format($item->total_revenue) }}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <p style="margin-top:16px;">
        This is an automated daily sales report.
    </p>

</body>

</html>
