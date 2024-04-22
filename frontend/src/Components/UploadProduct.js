import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage'
import { MdDelete } from "react-icons/md";

const UploadProduct = ({
    onClose,
}) => {

    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: '',
        selling: "",
    })

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)

    const [fullScreenImage, setFullScreenImage] = useState("")



    const handleOnChange = (e) => {

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

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full my-32 max-h-[70%]
            overflow-hidden
            '>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Upload Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-400 cursor-pointer ' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-3 overflow-y-scroll h-full'>
                    <label htmlFor='productName'>
                        Product Name :
                    </label>
                    <input type='text' id='productName'
                        value={data.productName}
                        placeholder='Enter the Product name'
                        onChange={handleOnChange}
                        className='bg-slate-200 p-2 rounded border-2 hover:border-cyan-100'
                    />

                    <label htmlFor='brandName' className='mt-2'>
                        Brand Name :
                    </label>
                    <input type='text' id='brandName'
                        value={data.brandName}
                        placeholder='Enter the Brand name'
                        onChange={handleOnChange}
                        className='bg-slate-200 p-2 rounded border-2 hover:border-cyan-100'
                    />
                    <label htmlFor='category' className='mt-2'>
                        Category :
                    </label>
                    <select value={data.category} className='bg-slate-200 p-2 rounded border-2 hover:border-cyan-100' onChange={handleOnChange}>
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
                                        data.productImage.map(el => {
                                            return (
                                                <div className='relative group'>
                                                    <img alt={el} src={el} width={80} height={80} className='bg-slate-200 border rounded cursor-pointer' onClick={() => {
                                                        setOpenFullScreenImage(true)
                                                        setFullScreenImage(el)

                                                    }} />
                                                    <div className='absolute bottom-0 right-0  text-white bg-red-500 cursor-pointer p-1 rounded-full hidden group-hover:block'>
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

                    <button className='px-3 py-3 bg-red-500 text-white rounded mb-12 hover:bg-red-900'>Upload Product</button>

                </form>
            </div>

            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                )
            }

        </div>
    )
}

export default UploadProduct