import React from 'react'
import { useRouter } from 'next/router'
import ProductDetail from '@/ProductDetail'
import { useGetProductDetailHooks } from '@/source/home/_hooks/useGetProductDetail'

function ProductDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const { productData, loading } = useGetProductDetailHooks(id as string)

  const handleAddToCart = (sku: any) => {
    console.log('添加到购物车:', sku)
    // 这里可以添加购物车逻辑
    alert(`已添加到购物车：${sku.quantity} 件商品`)
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4'></div>
          <p>加载商品详情...</p>
        </div>
      </div>
    )
  }

  if (!productData) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>商品不存在</h2>
          <button
            onClick={() => router.push('/')}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        <div className='mb-6'>
          <button
            onClick={() => router.push('/')}
            className='text-blue-500 hover:text-blue-600 flex items-center gap-2'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            返回商品列表
          </button>
        </div>

        <ProductDetail
          productData={productData}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  )
}

export default ProductDetailPage
