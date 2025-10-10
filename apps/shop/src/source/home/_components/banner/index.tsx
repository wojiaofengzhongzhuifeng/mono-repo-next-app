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

  console.log('BannerComponent: 渲染中', { banners, loading })

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

  console.log('BannerComponent: 准备渲染 Swiper，banners 长度:', banners.length)
  console.log('BannerComponent: banners 数据详情:', banners)
  
  // 详细检查每个banner的imageUrl
  banners.forEach((banner, index) => {
    console.log(`Banner ${index + 1}:`, {
      id: banner.id,
      imageUrl: banner.imageUrl,
      imageUrlType: typeof banner.imageUrl,
      imageUrlLength: banner.imageUrl?.length,
      hasValidProtocol: banner.imageUrl?.startsWith('http')
    })
  })
  
  return (
    <div className="mx-auto w-[960px] " >
      <div className="relative overflow-hidden rounded-lg bg-gray-100" style={{width:"960px" , padding:"20px"}}>
        <Swiper
          onSwiper={(swiper) => {
            console.log('Swiper 初始化成功:', swiper)
          }}
          onSlideChange={(swiper) => {
            console.log('Swiper 幻灯片切换:', swiper.activeIndex)
          }}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {banners.map((banner, index) => (
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
                  onLoad={() => {
                    console.log(`图片加载成功: ${banner.imageUrl}`)
                  }}
                  onError={(e) => {
                    console.error(`图片加载失败: ${banner.imageUrl}`, e)
                    console.log('banner 对象:', banner)
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
