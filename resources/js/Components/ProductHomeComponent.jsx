import React from 'react'
import Card from './Card'
import { Box } from 'lucide-react'

const ProductHomeComponent = ({ products, handleAddToCart, isLoading = false }) => {
    return (
        <>
            {
                products.length > 0
                    ?
                    products.map((item) => {
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
        </>
    )
}

export default ProductHomeComponent
