import React from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
const Header = () => {
    const user = useSelector(state => state?.user?.user)

    console.log("user header", user)
    return (
        <>
            <header className='h-16 shadow-md bg-white '>
                <div className='h-full container mx-auto flex  px-4 justify-between'>
                    <div className=''>
                        <Link to={'/'}>
                            <Logo w={100} h={60} />
                        </Link>

                    </div>

                    <div className='hidden md:flex mt-4 h-[30px] items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2 ' >
                        <input type='text' placeholder='Search Product here.....' className='w-full bg-white outline-none pl-2 text-black ' />
                        <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full 
                    text-white'>
                            <FaSearch />
                        </div>
                    </div>

                    <div className='flex items-center gap-5 pr-9 '>
                        <div className='text-3xl cursor-pointer'>
                            <FaRegCircleUser />
                        </div>
                        <div className='text-2xl cursor-pointer relative'>
                            <span> <FaShoppingCart /></span>
                            <div className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                                <p>
                                    0
                                </p>
                            </div>
                        </div>
                        <div>
                            <Link to={'/Login'} className='px-3 py-1 text-white bg-red-600 hover:bg-red-400 rounded-full'>Login</Link>
                        </div>
                    </div>

                </div>

            </header>
        </>

    )
}

export default Header