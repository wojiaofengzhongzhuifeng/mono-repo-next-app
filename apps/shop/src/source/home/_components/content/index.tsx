import React from 'react'
import { useGlobalStore } from '@/store/global-store'
import { useAppStore } from '@/source/home/_store'
import { useGetCountNumberHooks } from '@/source/home/_hooks/useGetCountNumber'
import { useGetCategoryHooks } from '@/source/home/_hooks/useGetCategory'
import CategoryList from '../CategoryList'

function Content() {
  const { globalNumber } = useGlobalStore()
  const { countNumber, testList ,number2 ,test, categories} = useAppStore()
  useGetCountNumberHooks()
  useGetCategoryHooks()
  console.log('categories', categories)
  return (
    <div className='p-8'>
      <div className='bg-gray-100 p-6 rounded-lg mb-4'>
        <h3 className='text-lg font-semibold mb-4'>
          Global Number from Home: {globalNumber}
        </h3>
        <h3>
          test服务器获取的数据：{countNumber}, 数组为：{testList?.join(',')}
          <span>Number2:{number2}</span>
          <h4>test:{test}</h4>
        </h3>
        <h3></h3>
      </div>
      
      <CategoryList />
    </div>
  )
}
export default Content
