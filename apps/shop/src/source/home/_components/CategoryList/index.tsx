import React from 'react'
import { useRouter } from 'next/router'
import { useAppStore } from '@/source/home/_store'
import { useGetCategoryHooks } from '@/source/home/_hooks/useGetCategory'
import { Category } from '@/source/home/_api/get-category'

interface ProductCardProps {
  product: Category['products'][0]
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter()

  const handleProductClick = () => {
    // 使用商品ID作为路由参数跳转到商品详情页
    router.push(`/product/${product.id}`)
  }

  return (
    <div 
      className="border rounded-lg p-3 shadow-sm hover:shadow-md w-[223px] h-[271px]"
      onClick={handleProductClick}
    >
      <img 
        src={product.productImg} 
        alt={product.productName}
        className="w-223 h-223 object-cover rounded-md mb-3"
      />
      <h4 className="font-semibold text-base text-center">{product.productName}</h4>

    </div>
  )
}

const CategoryList: React.FC = () => {
  const { categories, selectedCategoryId, setSelectedCategoryId } = useAppStore()
  const { loading } = useGetCategoryHooks()
  console.log(categories)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>加载中...</p>
        </div>
      </div>
    )
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">暂无分类数据</p>
      </div>
    )
  }

  // 如果没有选中的分类，默认选中第一个分类
  const currentCategoryId = selectedCategoryId || categories[0].id
  const currentCategory = categories.find(category => category.id === currentCategoryId)
  return (
    <div className="mx-auto w-[960px]">
      {/* Tab 切换 */}
      <div className="flex flex-wrap border-b-[1px] font-[light] gap-[32px] font-bold pb-[28px]">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2  text-sm rounded-t-lg transition-colors ${
              currentCategoryId === category.id
                ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            {category.categoryName}
          </button>
        ))}
      </div>

      {/* 商品列表 */}
      {currentCategory && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
          {currentCategory.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryList
