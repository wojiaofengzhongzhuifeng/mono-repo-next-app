import React from 'react'
import { useAppStore } from '@/source/home/_store'
import { useGetCategoryHooks } from '@/source/home/_hooks/useGetCategory'
import { Category } from '@/source/home/_api/get-category'

interface ProductCardProps {
  product: Category['products'][0]
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <img 
        src={product.productImg} 
        alt={product.productName}
        className="w-full h-32 object-cover rounded-md mb-4"
      />
      <h4 className="font-semibold text-lg text-left">{product.productName}</h4>
    </div>
  )
}

interface CategorySectionProps {
  category: Category
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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



  return (
<div style={{ 
}}>
</div>)
}

export default CategoryList
