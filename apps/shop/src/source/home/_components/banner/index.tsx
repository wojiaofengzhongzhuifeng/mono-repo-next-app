import React from 'react'
import { useAppStore } from '@/source/home/_store'
import { useGetBannerHooks } from '@/source/home/_hooks/useGetBanner'
import { Banner } from '@/source/home/_api/get-banner'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

const BannerComponent: React.FC = () => {
  const { banners } = useAppStore()
  const { loading } = useGetBannerHooks()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">轮播图加载中...</p>
        </div>
      </div>
    )
  }

  if (!banners || banners.length === 0) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-6xl mb-4">🖼️</div>
          <p className="text-gray-500 text-lg font-medium">暂无轮播图数据</p>
        </div>
      </div>
    )
  }

  return (
    <div className=" center-container w-[960px] py-[12px] px-[8px]" >
      <div className="relative group ">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 3,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="banner-swiper rounded-2xl overflow-hidden shadow-2xl"
          loop={true}
          grabCursor={true}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <img 
                  src={banner.imageUrl} 
                  alt={`轮播图-${banner.id}`}
                  className="w-full h-full object-contain"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                  onLoad={() => {
                    console.log(`图片加载成功: ${banner.imageUrl}`)
                  }}
                  onError={(e) => {
                    console.error(`图片加载失败: ${banner.imageUrl}`, e)
                    // 图片加载失败时显示占位图
                    const target = e.target as HTMLImageElement
                    target.src = `https://via.placeholder.com/1200x500/4F46E5/white?text=Banner+${banner.id}`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="max-w-4xl mx-auto">
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* 自定义导航按钮 */}
        <button className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default BannerComponent
