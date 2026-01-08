import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'

const Layouts = ({ children }) => {
    return (
        <div className='mx-auto bg-blue-50 min-h-dvh flex flex-col'>
            <Header />

            <div className='mx-auto w-full max-w-6xl mt-16'>
                {children}
            </div>

            <Footer />

            <ToastContainer />
        </div>
    )
}

export default Layouts
