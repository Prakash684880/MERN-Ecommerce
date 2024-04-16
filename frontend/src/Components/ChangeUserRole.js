import React, { useState } from 'react'

import Role from '../common/role';
import { IoCloseSharp } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';



const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunction
}) => {


    const [userRole, setUserRole] = useState(role)

    const handleChangeSelect = (e) => {
        setUserRole(e.target.value)

        console.log(e.target.value)
    }

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.UpdateUser.url, {
            method: SummaryApi.UpdateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole,
            })
        })

        const dataResponse = await fetchResponse.json()
        console.log("Role Data Response", dataResponse)

        if (dataResponse.success) {
            toast.success(dataResponse.message)
            onClose()
            callFunction()
        }


    }


    return (
        <div className='fixed flex w-full h-full z-10 justify-center items-center top- 0 bottom-0 left-0 right-0 '>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

                <button className='block  ml-auto pb-5' onClick={onClose}>
                    <IoCloseSharp />
                </button>

                <h1 className='pb-4 text-lg font-medium'> Change User Role</h1>
                <p>Name : {name} </p>
                <p>Email : {email}</p>
                <div className='flex gap-2 pt-2'>
                    <p>Role:</p>
                    <select className='bg-white border h-6 w-fit px-1' value={userRole} onChange={handleChangeSelect}>
                        {
                            Object.values(Role).map(el => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='pt-5'>
                    <button className='w-fit mx-auto block py-1 px-3 rounded-full hover:bg-slate-700 hover:text-white cursor-pointer bg-red-500' onClick={updateUserRole}>Change Role</button>
                </div>

            </div>
        </div>
    )
}

export default ChangeUserRole