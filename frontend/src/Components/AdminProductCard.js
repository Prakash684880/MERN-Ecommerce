import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data, fetchdata
}) => {

    const [editProduct, setEditProduct] = useState(false)

    return (
        <div className=' bg-white p-4 rounded'>
            <div className='w-40'>
                <img
                    src={data?.productImage[0]}
                    alt={data?.productName}
                    height={120}
                    width={120}
                    className='w-fit mx-auto'
                />
                <h1 className=''>{data.productName}</h1>
            </div>


            <div className=''>
                <p className='text-sm font-semibold'>
                    {
                        displayCurrency(data.sellingPrice)
                    }
                </p>
                <div className='flex gap-2'>
                    <div className='w-fit ml-auto p-2 bg-red-100 rounded-full hover:bg-red-500 hover:text-white cursor-pointer'>
                        <MdDelete />
                    </div>

                    <div
                        className='w-fit p-2 bg-green-100 rounded-full hover:bg-green-500 hover:text-white cursor-pointer'
                        onClick={() => setEditProduct(true)}
                    >
                        <MdModeEdit />
                    </div>
                </div>

                {
                    editProduct && (
                        <AdminEditProduct productdata={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
                    )
                }

            </div>

        </div>
    )
}

export default AdminProductCard