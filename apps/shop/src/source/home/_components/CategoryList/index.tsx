import React from 'react'
import { useAppStore } from '@/source/home/_store'
import { useGetCategoryHooks } from '@/source/home/_hooks/useGetCategory'
import { Category } from '@/source/home/_api/get-category'

interface ProductCardProps {
  product: Category['products'][0]
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <img 
        src={product.productImg} 
        alt={product.productName}
        className="w-full h-32 object-cover rounded-md mb-3"
      />
      <h4 className="font-semibold text-lg mb-2">{product.productName}</h4>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.productDesc}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-red-600">¥{product.price}</span>
        <span className="text-sm text-gray-500">库存: {product.stock}</span>
      </div>
    </div>
  )
}

interface CategorySectionProps {
  category: Category
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{category.categoryName}</h2>
        <p className="text-gray-600">{category.categoryDesc}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

const CategoryList: React.FC = () => {
  const { categories, selectedCategoryId, setSelectedCategoryId } = useAppStore()
  const { loading } = useGetCategoryHooks()

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

  // 获取当前选中的分类
  const selectedCategory = selectedCategoryId 
    ? categories.find(category => category.id === selectedCategoryId)
    : null

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">商品分类</h1>
      
      {/* 分类导航 */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          onClick={() => setSelectedCategoryId(null)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedCategoryId === null
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          全部商品
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategoryId === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.categoryName}
          </button>
        ))}
      </div>
      
      {/* 显示产品 */}
      {selectedCategory ? (
        <CategorySection category={selectedCategory} />
      ) : (
        <div className="space-y-12">
          {categories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryList
