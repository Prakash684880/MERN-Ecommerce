import React, { useState } from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../Store/userSlice';

const Header = () => {
    const user = useSelector(state => state?.user?.user)

    console.log("user header", user)

    const dispatch = useDispatch();
    const [menuDisplay, setMenuDisplay] = useState(false)

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.Logout.url, {
            method: SummaryApi.Logout.method,
            credentials: 'include',
        })

        const data = await fetchData.json();

        if (data.success) {
            toast.success(data.message)
            dispatch(setUserDetails(null))
        }
        if (data.error) {
            toast.error(data.message)
        }
    }


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

                        <div className='relative flex justify-center' >
                            <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>

                                {
                                    user?.profilePic ? (
                                        <img src={user?.profilePic} alt={user?.name}
                                            className='w-10 h-10 rounded-full' />
                                    ) : (
                                        <FaRegCircleUser />
                                    )
                                }

                            </div>
                            {
                                menuDisplay && (
                                    <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                                        <nav>
                                            <Link to={"admin-panel"} className='whitespace-nowrap md:block hidden hover:bg-slate-100 p-1' onClick={() => setMenuDisplay(prev => !prev)} >
                                                Admin Panel

                                            </Link>
                                        </nav>
                                    </div>
                                )
                            }

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
                            {
                                user?._id ? (<button className='px-3 py-1 text-white bg-red-600 hover:bg-red-400 rounded-full'
                                    onClick={handleLogout}>Logout</button>)
                                    : (
                                        <Link to={'/Login'} className='px-3 py-1 text-white bg-red-600 hover:bg-red-400 rounded-full'>Login</Link>
                                    )
                            }

                        </div>
                    </div>

                </div>

            </header >
        </>

    )
}

export default Header