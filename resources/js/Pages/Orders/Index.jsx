import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Index({ orders }) {
    const [openOrder, setOpenOrder] = useState(null);

    const toggleOrder = (id) => {
        setOpenOrder(openOrder === id ? null : id);
    };

    const statusLabel = (status) => {
        switch (status) {
            case 0: return 'Pending';
            case 1: return 'Paid';
            case 2: return 'Canceled';
            default: return '-';
        }
    };

    const statusColor = (status) => {
        switch (status) {
            case 0: return 'bg-yellow-100 text-yellow-800';
            case 1: return 'bg-green-100 text-green-800';
            case 2: return 'bg-red-100 text-red-800';
            default: return '';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Orders
                </h2>
            }
        >
            <Head title="My Orders" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="space-y-4">
                        {orders.length === 0 && (
                            <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                                You have no orders yet.
                            </div>
                        )}

                        {orders.map(order => (
                            <div
                                key={order.id}
                                className="bg-white shadow-sm rounded-lg border"
                            >
                                <div
                                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                                    onClick={() => toggleOrder(order.id)}
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {order.invoice}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {order.created_at}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`px-3 py-1 text-sm rounded-full ${statusColor(order.status)}`}
                                        >
                                            {statusLabel(order.status)}
                                        </span>

                                        <p className="font-semibold">
                                            Rp {order.total.toLocaleString()}
                                        </p>

                                        <ChevronRight
                                            className={`transition ${openOrder === order.id ? 'rotate-90' : ''
                                                }`}
                                        />
                                    </div>
                                </div>

                                {openOrder === order.id && (
                                    <div className="border-t p-4">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="text-left text-gray-500">
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Qty</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items.map(item => (
                                                    <tr key={item.id} className="border-t">
                                                        <td className="py-2">
                                                            {item.product.name}
                                                        </td>
                                                        <td>
                                                            Rp {item.price.toLocaleString()}
                                                        </td>
                                                        <td>{item.qty}</td>
                                                        <td>
                                                            Rp {item.subtotal.toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
