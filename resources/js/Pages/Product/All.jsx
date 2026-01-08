import Card from '@/Components/Card'
import Layouts from '@/Layouts/Layouts'
import { InfiniteScroll, router, useForm, usePage } from '@inertiajs/react';
import { Box } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';

const All = ({ products, filters }) => {
    const { flash } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (flash.error) {
            toast.error(flash.error);
        }

        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash])

    const handleAddToCart = (product) => {
        setIsLoading(true);

        router.get(route('cart.add', { product }), {
            product
        }, {
            preserveScroll: true,
            onFinish: () => {
                setIsLoading(false);
            }
        })
    }

    const { data, setData, get, processing, errors } = useForm({
        search: filters.search || '',
        min: filters.min || '',
        max: filters.max || ''
    })

    const handleFilter = (e) => {
        e.preventDefault();
        get(route('product.all'));
    }

    return (
        <Layouts>
            <h2 className='text-lg mb-6 font-bold'>All Products</h2>

            <div className='grid grid-cols-12 gap-6'>
                <div className='col-span-3'>
                    <Sidebar data={data} setData={setData} onFilter={handleFilter} />
                </div>

                <div className='col-span-9'>
                    <InfiniteScroll data='products'>
                        <div className='grid grid-cols-12 gap-4'>

                            {
                            products.data.length > 0
                            ?
                            products.data.map((item) => {
                                return (
                                    <div key={item.id} className='col-span-4'>
                                        <Card className='p-4'>
                                            <h2 className='font-semibold text-lg capitalize'>{item.name}</h2>
                                            <p className='font-bold text-blue-700 mb-6'>
                                                {new Intl.NumberFormat('de-DE', {
                                                    style: 'currency',
                                                    currency: 'EUR',
                                                    minimumFractionDigits: 2
                                                }).format(item.price)}
                                            </p>

                                            <div className='flex justify-between'>
                                                <p className='text-gray-700 bg-gray-200 px-2 text-xs inline-flex items-center justify-center rounded-md gap-2'>
                                                    <Box size={14} /> Stock: {item.stock_quantity}
                                                </p>

                                                <button
                                                    disabled={isLoading || item.stock_quantity == 0}
                                                    type='button'
                                                    className={`${isLoading || item.stock_quantity == 0 ? 'bg-gray-200 text-gray-500' : 'bg-blue-700 text-white'} text-sm font-semibold px-2 rounded-sm py-1 ${item.stock_quantity != 0 && 'hover:bg-green-700'}`}
                                                    onClick={() => handleAddToCart(item.slug)}
                                                >
                                                    {isLoading ? 'Loading...' : ' Add to Cart'}
                                                </button>
                                            </div>
                                        </Card>
                                    </div>
                                )
                            })
                            : <h4 className='w-full col-span-12 text-center py-6 bg-gray-100 rounded-lg border border-gray-300'>Product is not available</h4>
                            }

                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </Layouts>
    )
}

export default All
