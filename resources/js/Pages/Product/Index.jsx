import ProductHomeComponent from '@/Components/ProductHomeComponent'
import Layouts from '@/Layouts/Layouts'
import { Link, router, usePage, WhenVisible } from '@inertiajs/react'
import { BellPlus, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Index = ({ newproducts, cheap, flashsale }) => {
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

    return (
        <Layouts>
            <h2 className='text-2xl mt-6 mb-24 font-bold text-center'>Welcome to Simple e-Commerce</h2>

            <WhenVisible data={'newproducts'} fallback={() => <div>Loading...</div>}>
                <div className='flex justify-between'>
                    <h3 className='font-bold flex gap-2 items-center mb-2'><BellPlus size={16} />New Products</h3>
                    <Link href={route('product.all')} className='flex items-center gap-2 text-blue-700'>Show more <ChevronRight size={16} /></Link>
                </div>

                <div className='grid grid-cols-12 gap-6 mb-24'>
                    <ProductHomeComponent
                        products={newproducts}
                        isLoading={isLoading}
                        handleAddToCart={(e) => handleAddToCart(e)}
                    />
                </div>
            </WhenVisible>

            <WhenVisible data={'cheap'} fallback={() => <div>Loading...</div>}>
                <div className='flex justify-between'>
                    <h3 className='font-bold flex gap-2 items-center mb-2'><BellPlus size={16} />Super Cheap this Week!</h3>
                    <Link href={route('product.all')} className='flex items-center gap-2 text-blue-700'>Show more <ChevronRight size={16} /></Link>
                </div>

                <div className='grid grid-cols-12 gap-6 mb-24'>
                    <ProductHomeComponent
                        products={cheap}
                        isLoading={isLoading}
                        handleAddToCart={(e) => handleAddToCart(e)}
                    />
                </div>
            </WhenVisible>

            <WhenVisible data={'flashsale'} fallback={() => <div>Loading...</div>}>
                <div className='flex justify-between'>
                    <h3 className='font-bold flex gap-2 items-center mb-2'><BellPlus size={16} />Flash Sale</h3>
                    <Link href={route('product.all')} className='flex items-center gap-2 text-blue-700'>Show more <ChevronRight size={16} /></Link>
                </div>

                <div className='grid grid-cols-12 gap-6 mb-24'>
                    <ProductHomeComponent
                        products={flashsale}
                        isLoading={isLoading}
                        handleAddToCart={(e) => handleAddToCart(e)}
                    />
                </div>
            </WhenVisible>
        </Layouts>
    )
}

export default Index
