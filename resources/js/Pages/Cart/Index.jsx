import Card from '@/Components/Card'
import Layouts from '@/Layouts/Layouts'
import { Link, router, usePage } from '@inertiajs/react'
import { Trash } from 'lucide-react'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const Index = ({ datacart = [] }) => {

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success)
        }

        if (flash.error) {
            toast.error(flash.error)
        }
    }, [flash])

    const total = datacart.reduce(
        (sum, item) => sum + Number(item.subtotal),
        0
    )

    return (
        <Layouts>
            <h2 className="text-2xl mt-6 mb-10 font-bold text-center">
                🛒 Cart
            </h2>

            <div className="max-w-4xl mx-auto space-y-4">
                {datacart.length === 0 && (
                    <Card className="p-6 text-center text-gray-500">
                        Cart is empty

                        <div className='mt-12 mb-6'>
                            <Link href={route('product.all')} className='bg-blue-700 text-white px-3 py-2 rounded-md'>Continue Shopping</Link>
                        </div>
                    </Card>
                )}

                {datacart.map(item => (
                    <Card
                        key={item.id}
                        className="p-4 flex items-center justify-between gap-4"
                    >
                        {/* Product info */}
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                                {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                                Price:
                                {
                                    new Intl.NumberFormat('de-DE', {
                                        style: 'currency',
                                        currency: 'EUR',
                                        minimumFractionDigits: 2
                                    }).format(item.product.price)
                                }
                            </p>
                        </div>

                        {/* Qty */}
                        <div className="flex items-center gap-2">
                            <button
                                type='button'
                                className="w-8 h-8 border rounded hover:bg-gray-100"
                                onClick={() => router.put(route('cart.update', { 'product': item.product.slug }), {
                                    type: 'remove'
                                })}
                            >
                                −
                            </button>

                            <span className="min-w-[24px] text-center">
                                {item.qty}
                            </span>

                            <button
                                type='button'
                                className="w-8 h-8 border rounded hover:bg-gray-100"
                                onClick={() => router.put(route('cart.update', { 'product': item.product.slug }), {
                                    type: 'add'
                                })}
                            >
                                +
                            </button>
                        </div>

                        {/* Subtotal */}
                        <div className="w-32 text-right font-semibold">
                            {
                                new Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'EUR',
                                    minimumFractionDigits: 2
                                }).format(item.subtotal)
                            }
                        </div>

                        {/* Remove */}
                        <button
                            className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                            onClick={() => router.delete(route('cart.remove', { 'product': item.product.slug }))}
                        >
                            <Trash size={16} /> Delete
                        </button>
                    </Card>
                ))}

                {/* Total */}
                {datacart.length > 0 && (
                    <Card className="p-6 flex justify-between items-center border-b-2 border-b-blue-700 text-blue-700">
                        <span className="text-lg font-semibold">
                            Total
                        </span>
                        <span className="text-xl font-bold">
                            {
                                new Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'EUR',
                                    minimumFractionDigits: 2
                                }).format(total)
                            }
                        </span>
                    </Card>
                )}
            </div>

            {
                datacart.length > 0 && (
                    <div className='flex w-full justify-center mt-12'>
                        <button type='button' className='bg-blue-700 text-center items-center text-white px-12 py-2 rounded-md hover:bg-green-700'>
                            Process Order
                        </button>
                    </div>
                )
            }

        </Layouts>
    )
}

export default Index
