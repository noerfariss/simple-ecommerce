import ProductHomeComponent from '@/Components/ProductHomeComponent'
import Layouts from '@/Layouts/Layouts'
import { Link, WhenVisible } from '@inertiajs/react'
import { BellPlus, ChevronRight } from 'lucide-react'
import React from 'react'

const Index = ({ newproducts, cheap, flashsale }) => {
    const handleAddToCart = (product) => {
        console.log(product);
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
                        handleAddToCart={(e) => handleAddToCart(e)}
                    />
                </div>
            </WhenVisible>

            <WhenVisible  data={'flashsale'} fallback={() => <div>Loading...</div>}>
                <div className='flex justify-between'>
                    <h3 className='font-bold flex gap-2 items-center mb-2'><BellPlus size={16} />Flash Sale</h3>
                    <Link href={route('product.all')} className='flex items-center gap-2 text-blue-700'>Show more <ChevronRight size={16} /></Link>
                </div>

                <div className='grid grid-cols-12 gap-6 mb-24'>
                    <ProductHomeComponent
                        products={flashsale}
                        handleAddToCart={(e) => handleAddToCart(e)}
                    />
                </div>
            </WhenVisible>
        </Layouts>
    )
}

export default Index
