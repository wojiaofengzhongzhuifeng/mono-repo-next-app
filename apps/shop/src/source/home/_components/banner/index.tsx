import React from 'react'
import { useAppStore } from '@/source/home/_store'
import { useGetBannerHooks } from '@/source/home/_hooks/useGetBanner'
import { Banner } from '@/source/home/_api/get-banner'

const BannerComponent: React.FC = () => {
  const { banners } = useAppStore()
  const { loading } = useGetBannerHooks()
console.log('banners',banners)
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

  if (!banners || banners.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">暂无轮播图数据</p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-[960px]">
      {banners.map((banner) => (
        <div key={banner.id} className="mb-4">
          <img 
            src={banner.imageUrl} 
            alt={`轮播图-${banner.id}`}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  )
}

export default BannerComponent
