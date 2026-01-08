import Layouts from '@/Layouts/Layouts'
import { InfiniteScroll, router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import ProductComponent from '@/Components/ProductComponent';

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
                            <ProductComponent
                                products={products}
                                isLoading={isLoading}
                                handleAddToCart={(e) => handleAddToCart(e)}
                            />
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </Layouts>
    )
}

export default All
