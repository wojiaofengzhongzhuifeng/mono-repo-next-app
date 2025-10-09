import React from 'react'
import { useGlobalStore } from '@/store/global-store'
import { useAppStore } from '@/source/home/_store'
import { useGetCountNumberHooks } from '@/source/home/_hooks/useGetCountNumber'
import { useGetCategoryHooks } from '@/source/home/_hooks/useGetCategory'
import CategoryList from '../CategoryList'

function Content() {
  const { globalNumber } = useGlobalStore()
  const {categories} = useAppStore()
  useGetCountNumberHooks()
  useGetCategoryHooks()
  console.log('categories', categories)
  return (
    <div className='p-8'>
      <div className='bg-gray-100 p-6 rounded-lg mb-4'>
        <h3 className='text-lg font-semibold mb-4'>
          Global Number from Home: {globalNumber}
        </h3>
      </div>
      
      <CategoryList />
    </div>
  )
}
export default Content
