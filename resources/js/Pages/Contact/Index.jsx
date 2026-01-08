import Card from '@/Components/Card'
import Layouts from '@/Layouts/Layouts'
import { Link } from '@inertiajs/react'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

const Index = () => {
    return (
        <Layouts>
            <h2 className='text-xl font-bold mb-6'>Contact us</h2>

            <Card className='p-4'>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-start gap-2'>
                        <label htmlFor="" className='w-20 font-bold'>Fullname</label>
                        <div>:</div>
                        <h4 className=''>Nur Faris Prastyo</h4>
                    </div>
                    <div className='flex items-center justify-start gap-2'>
                        <label htmlFor="" className='w-20 font-bold'>Nickname</label>
                        <div>:</div>
                        <h4 className=''>Faris</h4>
                    </div>
                    <div className='flex items-center justify-start gap-2'>
                        <label htmlFor="" className='w-20 font-bold'>Email</label>
                        <div>:</div>
                        <h4 className=''>noerfaris.solusi@gmail.com</h4>
                    </div>
                    <div className='flex items-center justify-start gap-2'>
                        <label htmlFor="" className='w-20 font-bold'>LinkedIn</label>
                        <div>:</div>
                        <a href={'https://www.linkedin.com/in/nurfaris'} target='_blank' className='flex items-center gap-2 hover:underline'>
                            https://www.linkedin.com/in/nurfaris
                            <ArrowUpRight/>
                        </a>
                    </div>
                    <div className='flex items-center justify-start gap-2'>
                        <label htmlFor="" className='w-20 font-bold'>Country</label>
                        <div>:</div>
                        <h4 className=''>Indonesia</h4>
                    </div>
                </div>
            </Card>

        </Layouts>
    )
}

export default Index
