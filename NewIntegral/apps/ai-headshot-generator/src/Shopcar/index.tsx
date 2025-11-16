import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/source/home/_store'
import { useRouter } from 'next/router'

interface CartItem {
  id: string
  attrs: Record<string, string>
  price: number
  stock: number
  quantity: number
}

const Shopcar: React.FC = () => {
  const router = useRouter()
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } =
    useAppStore()
  const [loading, setLoading] = useState(false)

  const getAttributeDisplayName = (attrKey: string): string => {
    const displayNameMap: Record<string, string> = {
      color: '颜色',
      storage: '存储容量',
      size: '尺寸',
      version: '版本',
      lightMode: '灯光模式',
      filterType: '滤网类型',
      roast: '烘焙程度',
      package: '包装',
      giftBox: '礼盒类型',
      capacity: '容量',
      binding: '装帧',
      tip: '笔尖',
      pageType: '页面类型',
    }
    return displayNameMap[attrKey] || attrKey
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateCartItemQuantity(itemId, newQuantity)
    }
  }

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId)
  }

  const handleClearCart = () => {
    if (window.confirm('确定要清空购物车吗？')) {
      clearCart()
    }
  }

  const handleCheckout = () => {
    setLoading(true)
    // 这里可以添加结算逻辑
    setTimeout(() => {
      alert('结算功能开发中...')
      setLoading(false)
    }, 1000)
  }

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    )
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0)
  }

  if (cartItems.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <div className='bg-white rounded-lg shadow-lg p-8 text-center'>
              <h1 className='text-2xl font-bold text-gray-900 mb-4'>购物车</h1>
              <div className='text-gray-500 mb-6'>
                <svg
                  className='w-24 h-24 mx-auto mb-4 text-gray-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                <p className='text-lg'>您的购物车是空的</p>
              </div>
              <Button
                onClick={() => router.push('/')}
                className='bg-blue-500 hover:bg-blue-600'
              >
                继续购物
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* 购物车标题 */}
          <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
            <div className='flex justify-between items-center'>
              <h1 className='text-2xl font-bold text-gray-900'>购物车</h1>
              <div className='flex items-center gap-4'>
                <span className='text-gray-600'>
                  共 {getTotalItems()} 件商品
                </span>
                <Button
                  variant='outline'
                  onClick={handleClearCart}
                  className='text-red-500 border-red-500 hover:bg-red-50'
                >
                  清空购物车
                </Button>
              </div>
            </div>
          </div>

          {/* 购物车商品列表 */}
          <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
            <div className='space-y-6'>
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className='border-b pb-6 last:border-b-0'>
                  <div className='flex gap-6'>
                    {/* 商品图片占位 */}
                    <div className='w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center'>
                      <span className='text-gray-400 text-sm'>商品图片</span>
                    </div>

                    {/* 商品信息 */}
                    <div className='flex-1'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* 商品属性 */}
                        <div>
                          <h3 className='font-semibold text-gray-900 mb-2'>
                            商品属性
                          </h3>
                          <div className='space-y-1 text-sm text-gray-600'>
                            {Object.entries(item.attrs).map(([key, value]) => (
                              <div key={key}>
                                <span className='font-medium'>
                                  {getAttributeDisplayName(key)}：
                                </span>
                                <span>{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 价格和数量 */}
                        <div>
                          <div className='space-y-4'>
                            <div>
                              <span className='font-medium text-gray-900'>
                                单价：
                              </span>
                              <span className='text-red-600 font-semibold'>
                                ¥{item.price.toLocaleString()}
                              </span>
                            </div>

                            <div>
                              <span className='font-medium text-gray-900'>
                                数量：
                              </span>
                              <div className='inline-flex items-center border rounded-md ml-2'>
                                <button
                                  className='px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50'
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      (item.quantity || 1) - 1
                                    )
                                  }
                                  disabled={(item.quantity || 1) <= 1}
                                >
                                  -
                                </button>
                                <span className='px-3 py-1 border-x text-center min-w-[50px]'>
                                  {item.quantity || 1}
                                </span>
                                <button
                                  className='px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50'
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      (item.quantity || 1) + 1
                                    )
                                  }
                                  disabled={
                                    (item.quantity || 1) >= (item.stock || 999)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div>
                              <span className='font-medium text-gray-900'>
                                小计：
                              </span>
                              <span className='text-red-600 font-semibold'>
                                ¥
                                {(
                                  item.price * (item.quantity || 1)
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 删除按钮 */}
                      <div className='mt-4'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleRemoveItem(item.id)}
                          className='text-red-500 border-red-500 hover:bg-red-50'
                        >
                          删除商品
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 购物车总结 */}
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <div className='flex justify-between items-center'>
              <div>
                <div className='text-lg text-gray-600'>
                  总计：
                  <span className='text-2xl font-bold text-red-600'>
                    ¥{getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <div className='text-sm text-gray-500'>
                  共 {getTotalItems()} 件商品
                </div>
              </div>
              <div className='flex gap-4'>
                <Button
                  variant='outline'
                  onClick={() => router.push('/')}
                  className='border-gray-300 text-gray-700 hover:bg-gray-50'
                >
                  继续购物
                </Button>
                <Button
                  onClick={handleCheckout}
                  disabled={loading || cartItems.length === 0}
                  className='bg-red-500 hover:bg-red-600 px-8'
                >
                  {loading ? '处理中...' : '立即结算'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shopcar
