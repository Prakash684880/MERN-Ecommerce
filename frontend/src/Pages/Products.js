import React, { useState } from 'react'
import UploadProduct from '../Components/UploadProduct'

const Products = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false)

  return (
    <>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>
          All Product
        </h2>
        <button
          className='border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all py-1 px-2'
          onClick={() => setOpenUploadProduct(true)}
        >
          Add Product
        </button>
      </div>

      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} />
        )
      }

    </>
  )
}

export default Products