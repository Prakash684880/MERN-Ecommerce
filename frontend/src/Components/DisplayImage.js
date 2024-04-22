import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-slate-100 shadow-lg rounded max-w-5xl mx-auto p-4 my-40 max-h-[60%] '>
                <div className='w-fit ml-auto text-2xl hover:text-red-400 cursor-pointer ' onClick={onClose}>
                    <CgClose />
                </div>
                <div className='flex justify-center p-4 max-w-[50vh] max-h-[50vh]'>
                    <img src={imgUrl} alt='img' className='w-full h-full' />
                </div>
            </div>
        </div>

    )
}

export default DisplayImage