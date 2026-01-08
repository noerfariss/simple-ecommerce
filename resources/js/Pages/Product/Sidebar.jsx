
import { router } from '@inertiajs/react'
import { RotateCcw, Search } from 'lucide-react'
import React from 'react'

const Sidebar = ({ data, setData, onFilter, processing, onReset }) => {
    return (
        <form onSubmit={onFilter}>
            <div className='flex flex-col gap-4'>
                <input type="text"
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                    className='border border-gray-300 rounded-md py-1 bg-gray-100 w-full'
                    placeholder='Search product..' />

                <div className='flex flex-row gap-4'>
                    <input type="number"
                        className='border border-gray-300 rounded-md py-1 bg-gray-100 w-full'
                        placeholder='Min. Price'
                        value={data.min}
                        onChange={(e) => setData('min', e.target.value)}
                    />

                    <input type="number"
                        className='border border-gray-300 rounded-md py-1 bg-gray-100 w-full'
                        placeholder='Max. Price'
                        value={data.max}
                        onChange={(e) => setData('max', e.target.value)}
                    />
                </div>

                <div className='flex gap-4'>
                    <button type='submit'
                        disabled={processing}
                        className={`${processing ? 'bg-gray-200 text-gray-500' : 'bg-blue-700 text-white'} w-full flex justify-center items-center  gap-2 py-1 rounded-md shadow-sm hover:bg-green-700`}
                    >
                        <Search size={16} /> {processing ? 'Loading...' : 'Search'}
                    </button>

                    <button type='button'
                        onClick={() => router.get(route('product.all'))}
                        className={'bg-gray-200 px-2 rounded-md hover:bg-gray-500'}
                    >
                        <RotateCcw size={16}/>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Sidebar
