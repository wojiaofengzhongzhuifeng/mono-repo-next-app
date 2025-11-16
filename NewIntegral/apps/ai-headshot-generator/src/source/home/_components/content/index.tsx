import React from 'react'
import { useGetCategoryHooks } from '@/source/home/_hooks/useGetCategory'
import { useGetBannerHooks } from '@/source/home/_hooks/useGetBanner'
import CategoryList from '../CategoryList'
import BannerComponent from '../banner'

function Content() {
  useGetCategoryHooks()
  useGetBannerHooks()
  return (
    <div className='p-8'>
      <BannerComponent />
      <CategoryList />
    </div>
  )
}
export default Content
