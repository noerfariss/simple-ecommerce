import { Link } from '@inertiajs/react'
import { ShoppingBasket } from 'lucide-react'
import React from 'react'

const Header = () => {
    return (
        <div className='bg-gray-50 py-3 shadow-md border-b border-b-gray-300'>
            <div className='mx-auto max-w-6xl '>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Link as={'button'} href={route('product.index')} className='px-2 border-r border-r-gray-300'>Home</Link>
                        <Link as={'button'} href={route('product.all')} className='px-2 border-r border-r-gray-300'>Product</Link>
                        <Link as={'button'} href={route('product.index')} className='px-2'>Contact us</Link>
                    </div>

                    <div>
                        <Link as={'button'} href={route('product.index')} className='flex items-center gap-1'>
                            <ShoppingBasket />Cart
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
