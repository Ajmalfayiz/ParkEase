import React from 'react'



import logo from "../assets/header.png"
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <header>
                <div className="container mx-auto px-4 md:px-4 lg:px-16">
                    <nav className="ms-auto items-center flex justify-between ">
                        {/* logo */}

                        <Link to="/" className="text-4xl md:text-6xl  lg:text-4xl font-extrabold  "> <img src={logo} alt='parkEase' width='200px' /></Link>
                        <div className=' lg:flex items-center gap-8 font-stretch-expanded'>
                            <Link to='/' className='text-sm '>Home</Link>
                            <Link to='/listing' className='text-sm '>Listing</Link>
                            <Link to='/details' className='text-sm '>Details</Link>
                        </div>

                        <div className='hidden lg:flex items-center gap-5'>
                            <Link to='/login' className='text-sm '>Login</Link>
                            <Link to='/signup' className='btn-1 text-white px-7  py-3 rounded-full shadow-md text-sm '>SignUp </Link>
                        </div>

                    </nav>

                </div>

            </header>

        </>
    )
}

export default Header