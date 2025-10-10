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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* 商品标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {productData.name}
        </h1>
        <div className="flex items-center gap-4">
          {selectedSku && (
            <>
              <span className="text-2xl font-bold text-red-600">
                ¥{selectedSku.price.toLocaleString()}
              </span>
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
            </>
          )}
        </div>
      </div>

      {/* 属性选择 */}
      <div className="space-y-6 mb-8">
        {Object.entries(productData.attributes).map(([attrKey, attrValues]) => (
          <div key={attrKey} className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              {getAttributeDisplayName(attrKey)}
            </h3>
            <div className="flex flex-wrap gap-2">
            {attrValues?.map((value: string) => {
                const isSelected = selectedAttributes[attrKey] === value
                const isAvailable = isAttributeAvailable(attrKey, value)
                
                return (
                  <button
                    key={value}
                    className={cn(
                      'px-4 py-2 border rounded-md text-sm font-medium transition-colors',
                      isSelected 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : isAvailable
                          ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    )}
                    onClick={() => isAvailable && handleAttributeChange(attrKey, value)}
                    disabled={!isAvailable}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

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

      {/* 当前选择的SKU信息 */}
      {selectedSku && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">当前选择：</h4>
          <div className="text-sm text-gray-600 space-y-1">
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
            <div>
              <span className="font-medium">总价：</span>
              <span className="text-red-600 font-semibold">
                ¥{(selectedSku.price * quantity).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 商品规格信息 */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">商品规格</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">属性</th>
                <th className="text-left py-2 px-3">可选值</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(productData.attributes).map(([attrKey, attrValues]) => (
                <tr key={attrKey} className="border-b">
                  <td className="py-2 px-3 font-medium">
                    {getAttributeDisplayName(attrKey)}
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex flex-wrap gap-1">
                      {attrValues?.map((value: string) => (
                        <span 
                          key={value}
                          className="px-2 py-1 bg-white border rounded text-xs"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

// 导出类型定义供其他组件使用
export type { ProductData, SkuItem, ProductAttribute }
