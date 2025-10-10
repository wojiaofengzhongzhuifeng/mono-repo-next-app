import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// 定义商品SKU相关的类型
interface ProductAttribute {
  color?: string[]
  storage?: string[]
  size?: string[]
  version?: string[]
  lightMode?: string[]
  filterType?: string[]
  roast?: string[]
  package?: string[]
  giftBox?: string[]
  capacity?: string[]
  binding?: string[]
  tip?: string[]
  pageType?: string[]
}

interface SkuItem {
  id: string
  attrs: Record<string, string>
  price: number
  stock: number
  quantity?: number
}

interface ProductData {
  name: string
  image?: string
  attributes: ProductAttribute
  skus: SkuItem[]
}

interface ProductDetailProps {
  productData: ProductData
  onAddToCart?: (sku: SkuItem) => void
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  productData, 
  onAddToCart = () => {} 
}) => {
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({})
  const [selectedSku, setSelectedSku] = useState<SkuItem | null>(null)
  const [quantity, setQuantity] = useState(1)

  // 初始化选中的属性
  useEffect(() => {
    const initialSelected: Record<string, string> = {}
    Object.keys(productData.attributes).forEach(attrKey => {
      const values = productData.attributes[attrKey as keyof ProductAttribute]
      if (values && values.length > 0) {
        initialSelected[attrKey] = values[0]
      }
    })
    setSelectedAttributes(initialSelected)
  }, [productData])

  // 根据选中的属性找到对应的SKU
  useEffect(() => {
    const matchingSku = productData.skus.find(sku => {
      return Object.keys(selectedAttributes).every(attrKey => {
        return sku.attrs[attrKey] === selectedAttributes[attrKey]
      })
    })
    setSelectedSku(matchingSku || null)
  }, [selectedAttributes, productData.skus])

  const handleAttributeChange = (attributeKey: string, value: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeKey]: value
    }))
    // 切换属性时重置数量为1
    setQuantity(1)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (selectedSku?.stock || 999)) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (selectedSku) {
      onAddToCart({ ...selectedSku, quantity })
    }
  }

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
      pageType: '页面类型'
    }
    return displayNameMap[attrKey] || attrKey
  }

  const isAttributeAvailable = (attrKey: string, attrValue: string): boolean => {
    const tempSelected = { ...selectedAttributes, [attrKey]: attrValue }
    return productData.skus.some(sku => {
      return Object.keys(tempSelected).every(key => {
        return sku.attrs[key] === tempSelected[key]
      })
    })
  }
  console.log('productData',productData)
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* 商品图片和标题 */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* 商品图片 */}
        <div className="md:w-1/2 flex items-center justify-center">
          {productData.image ? (
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 w-full max-w-md">
              <img
                src={productData.image}
                alt={productData.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center w-full max-w-md">
              <span className="text-gray-400 text-sm">暂无商品图片</span>
            </div>
          )}
        </div>
        
        {/* 商品标题和价格 */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {productData.name}
          </h1>
        <div className="flex items-center gap-4">
          {selectedSku && (
            <>
              <span className="text-2xl font-bold text-red-600">
                ¥{selectedSku.price.toLocaleString()}
                              <span className={cn(
                'text-sm px-2 py-1 rounded',
                selectedSku.stock > 10 ? 'bg-green-100 text-green-800' :
                selectedSku.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              )}>
                {selectedSku.stock > 10 ? '库存充足' :
                 selectedSku.stock > 0 ? `仅剩 ${selectedSku.stock} 件` :
                 '暂时缺货'}
              </span>
              </span>

            </>
          )}
        </div>
      </div>
      </div>

     

              {/* 当前选择的SKU信息 */}
      {selectedSku && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">当前选择：</h4>
          <div className="text-sm text-gray-600 space-y-1 flex gap-20">
            {Object.entries(selectedSku.attrs).map(([key, value]) => (
              <div key={key}>
                <span className="font-medium">{getAttributeDisplayName(key)}：</span>
                <span>{value}</span>
              </div>
            ))}
            <div>
              <span className="font-medium">单价：</span>
              <span className="text-red-600">¥{selectedSku.price.toLocaleString()}</span>
            </div>
              <span className='font-medium'>数量：{quantity}</span>
              <span className="font-medium">总价：</span>
              <span className="text-red-600 font-semibold">
                ¥{(selectedSku.price * quantity).toLocaleString()}
              </span>
          </div>
        </div>
      )}

      {/* 数量选择和购买按钮 */}
      <div className="border-t pt-6">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-gray-700 font-medium">数量：</span>
          <div className="flex items-center border rounded-md">
            <button
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-4 py-2 border-x text-center min-w-[60px]">
              {quantity}
            </span>
            <button
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= (selectedSku?.stock || 0)}
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-500">
            {selectedSku && `最多可购买 ${selectedSku.stock} 件`}
          </span>
        </div>

        <div className="flex gap-4">
          <Button
            size="lg"
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            onClick={handleAddToCart}
            disabled={!selectedSku || selectedSku.stock === 0}
          >
            加入购物车
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
            disabled={!selectedSku || selectedSku.stock === 0}
          >
            立即购买
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

// 导出类型定义供其他组件使用
export type { ProductData, SkuItem, ProductAttribute }
