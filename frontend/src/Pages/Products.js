import React, { useEffect, useState } from 'react'
import UploadProduct from '../Components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../Components/AdminProductCard';

const Products = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.GetAllProduct.url, {
      method: SummaryApi.GetAllProduct.method
    })
    const responseData = await response.json()

    setAllProduct(responseData?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  })
  return (
    <>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button
          className='border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all py-1 px-2'
          onClick={() => setOpenUploadProduct(true)}
        >
          Add Product
        </button>
      </div>

      <div className='flex items-center flex-wrap gap-2 p-5 h-[calc(100vh-200px)] overflow-y-scroll'>

        {allProduct.map((product, index) => (
          <AdminProductCard key={index + "allProduct"} data={product} fetchdata={fetchAllProduct} />

        ))}
      </div>

      {/* Renden UploadProduct component conditionally */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}


    </>
  );
};

export default Products;
