import React from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

const AdminPanel = () => {

    const user = useSelector(state => state?.user?.user)

    console.log("username", user?.name)

    return (
        <div className='min-h-[calc(100vh-120px)] bg-red-200 text-black md:flex hidden'>
            <aside className='bg-white min-h-full max-w-60 w-full customShadow'>
                <div className='h-40 w-full flex justify-center items-center flex-col' >
                    <div className='text-3xl cursor-pointer relative flex justify-center'>
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} alt={user?.name}
                                    className='w-20 h-20 rounded-full ' />
                            ) : (
                                <FaRegCircleUser />
                            )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='capitalize'>{user?.role}</p>
                </div>
                <div>
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-500'>
                            All Users
                        </Link>
                        <Link to={"products"} className='px-2 py-1 hover:bg-slate-500'>
                            Products
                        </Link>
                    </nav>
                </div>
            </aside>

            <main className='w-full h-full p-5'>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminPanel