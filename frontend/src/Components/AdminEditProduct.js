import React, { useState } from 'react'
import uploadImage from '../helpers/uploadImage'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { CgClose } from 'react-icons/cg'
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import DisplayImage from './DisplayImage'

const AdminEditProduct = ({
    onClose,
    productdata,
    fetchdata,
}) => {

    const [data, setData] = useState({
        ...productdata,
        productName: productdata?.productName,
        brandName: productdata?.brandName,
        category: productdata?.category,
        productImage: productdata?.productImage || [],
        description: productdata?.description,
        price: productdata?.price,
        sellingPrice: productdata?.sellingPrice,
    })

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)

    const [fullScreenImage, setFullScreenImage] = useState("")



    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]


        const uploadImageCloudinary = await uploadImage(file)

        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })


    }

    const handleDeleteProductImage = async (index) => {
        console.log("image index", index)
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)
        setData((prev) => {
            return {
                ...prev,
                productImage: [...newProductImage]
            }
        })
    }

    const handleProductSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(SummaryApi.UpdateProduct.url, {
            method: SummaryApi.UpdateProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()
        console.log("response data", responseData)
        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchdata()
        }
        if (responseData.error) {
            toast.error(responseData?.message)
        }

    }


    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full my-32 max-h-[70%]
            overflow-hidden
            '>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Edit Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-400 cursor-pointer ' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-3 overflow-y-scroll h-full' onSubmit={handleProductSubmit}>
                    <label htmlFor='productName'>
                        Product Name :
                    </label>
                    <input
                        type='text'
                        id='productName'
                        name='productName'
                        value={data.productName}
                        placeholder='Enter the Product name'
                        onChange={handleOnChange}
                        className='bg-slate-200 p-2 rounded border-2 hover:border-cyan-100'
                        required
                    />

                    <label htmlFor='brandName' className='mt-2'>
                        Brand Name :
                    </label>
                    <input type='text' id='brandName'
                        name='brandName'
                        value={data.brandName}
                        placeholder='Enter the Brand name'
                        onChange={handleOnChange}
                        className='bg-slate-200 p-2 rounded border-2 hover:border-cyan-100'
                        required
                    />
                    <label htmlFor='category' className='mt-2'>
                        Category :
                    </label>
                    <select required value={data.category} className='bg-slate-200 p-2 rounded border-2 hover:border-cyan-100' name='category' onChange={handleOnChange}>
                        <option value={""} >
                            Select Category
                        </option>
                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>
                                        {el.label}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='productImage' className='mt-2'>
                        Product Image :
                    </label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-200 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-600 flex justify-center items-center flex-col'>
                                <span className='text-4xl'>
                                    <FaCloudUploadAlt />
                                </span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file' id='uploadImageInput'
                                    className='hidden'
                                    onChange={handleUploadProduct}></input>
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.productImage.map((el, index) => {
                                            return (
                                                <div className='relative group'>
                                                    <img alt={el} src={el} width={80} height={80} className='bg-slate-200 border rounded cursor-pointer' onClick={() => {
                                                        setOpenFullScreenImage(true)
                                                        setFullScreenImage(el)

                                                    }} />
                                                    <div className='absolute bottom-0 right-0  text-white bg-red-500 cursor-pointer p-1 rounded-full hidden group-hover:block' onClick={() => handleDeleteProductImage(index)}

                                                    >
                                                        <MdDelete />
                                                    </div>
                                                </div>

                                            )
                                        })}
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Please Upload Product Image*</p>
                            )
                        }

                    </div>

                    <label htmlFor='Price' className='mt-2'>
                        Price :
                    </label>
                    <input type='number' id='price'
                        value={data.price}
                        name='price'
                        placeholder='Enter the Price of Product'
                        onChange={handleOnChange}
                        className='bg-slate-200 p-2 rounded border-2 hover:border-cyan-100'
                        required
                    />

                    <label htmlFor='SellingPrice' className='mt-2'>
                        Selling Price :
                    </label>
                    <input type='number' id='sellingPrice'
                        value={data.sellingPrice}
                        name='sellingPrice'
                        placeholder='Enter the Selling Price of Product'
                        onChange={handleOnChange}
                        className='bg-slate-200 p-2 rounded border-2 hover:border-cyan-100' required
                    />

                    <label htmlFor='description' className='mt-2'>
                        Description :
                    </label>
                    <textarea className='h-32 resize-none rounded bg-slate-200 border ' rows={3}
                        id='description' name='description'
                        value={data.description} onChange={handleOnChange}></textarea>



                    <button className='px-3 py-3 bg-red-500 text-white rounded mb-12 hover:bg-red-900'>Update Product</button>

                </form>
            </div>


            {/* display full image */}

            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                )
            }

        </div>
    )
}

export default AdminEditProduct