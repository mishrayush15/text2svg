import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className='w-screen h-screen bg-slate-700 flex flex-col sm:justify-center items-center sm:space-y-7 space-y-7'>
            <div className='texts flex mt-72 sm:mt-0 '>
                <h1 className='text-red-600 text-5xl sm:text-9xl'>text</h1>
                <h4 className='text-white sm:mt-20 mt-6 text-3xl sm:text-7xl'>2</h4>
                <h1 className='text-green-500 text-5xl sm:text-9xl'>SVG</h1>
            </div>
            <div className='button'>
                <button onClick={()=>navigate('/login/google')} className='rounded-full bg-black border-2 hover:bg-gradient-to-r hover:from-red-600 hover:to-green-600 hover:text-white sm:hover:bg-white sm:hover:text-black sm:hover:border-black sm:hover:shadow-red-600 text-white w-[150px] sm:w-[300px] h-[40px] sm:h-[50px] sm:font-sm font-medium transition-all duration-300'>
                    Get Started
                </button>

            </div>
        </div>
    )
}

export default LandingPage
