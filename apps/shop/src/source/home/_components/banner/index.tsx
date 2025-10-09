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
    <div className="mx-auto w-[960px] " style={{width:"960px"}} >
      <div className="relative overflow-hidden rounded-lg bg-gray-100" style={{width:"960px" , padding:"20px"}}>
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
            '--swiper-pagination-bullet-inactive-color': '#ffffff80',
            '--swiper-pagination-bullet-inactive-opacity': '0.5',
            '--swiper-pagination-bullet-size': '8px',
            '--swiper-pagination-bullet-horizontal-gap': '4px',
          } as React.CSSProperties}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="w-full h-[450px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <img 
                  src={banner.imageUrl} 
                  alt={`轮播图-${banner.id}`}
                  className="object-contain rounded-xl shadow-lg"
                  style={{
                    width: '850px',
                    height: '380px',
                    objectFit: 'contain',
                    objectPosition: 'center'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/8 to-transparent pointer-events-none rounded-xl"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default BannerComponent
