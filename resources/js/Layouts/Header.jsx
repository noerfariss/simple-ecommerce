import { Link, router, usePage } from '@inertiajs/react'
import { LogIn, LogOut, ShoppingBasket, User } from 'lucide-react'
import React from 'react'

const Header = () => {
    const { auth, cart } = usePage().props;

    return (
        <div className='bg-gray-50 py-3 shadow-md border-b border-b-gray-300 fixed w-full'>
            <div className='mx-auto max-w-6xl '>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Link as={'button'} href={route('product.index')} className='px-2 border-r border-r-gray-300'>Home</Link>
                        <Link as={'button'} href={route('product.all')} className='px-2 border-r border-r-gray-300'>All Products</Link>
                        <Link as={'button'} href={route('contact')} className='px-2'>Contact us</Link>
                    </div>

                    <div className='flex gap-4'>
                        <Link as={'button'} href={route('cart.index')} className='flex items-center gap-1 relative bg-blue-100 pr-4 rounded-full hover:bg-blue-700 hover:text-white'>
                            <span className={`w-6 h-6 text-xs font-bold  ${auth.user ? 'bg-red-700 text-white' : 'bg-gray-200'} items-center justify-center flex rounded-full`}>{cart}</span>
                            <ShoppingBasket size={16} />Cart
                        </Link>

                        {
                            auth.user && (
                                <Link as={'button'} href={route('profile.edit')} className='flex items-center gap-1'>
                                    <User size={16} />{auth.user.name}
                                </Link>
                            )
                        }

                        {
                            auth.user
                                ? <Link href={route('logout')} method="post" as="button" className='flex items-center gap-1 text-red-700'>
                                    <LogOut size={16} />Logout
                                </Link>
                                : <Link href={route('login')} className='flex items-center gap-1'>
                                    <LogIn size={16} />Login
                                </Link>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
