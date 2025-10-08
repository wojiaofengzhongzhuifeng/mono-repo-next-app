import React from 'react'
import { useGlobalStore } from '@/store/global-store'
import { useCountNumberStore } from '@/source/count-number/_store'
import { useGetCountNumberHooks } from '@/source/count-number/_hooks/useGetCountNumber'

function Content() {
  const { globalNumber } = useGlobalStore()
  const { countNumber, testList } = useCountNumberStore()
  useGetCountNumberHooks()

  return (
    <div className='p-8'>
      <div className='bg-gray-100 p-6 rounded-lg mb-4'>
        <h3 className='text-lg font-semibold mb-4'>
          Global Number from Home: {globalNumber}
        </h3>
        <h3>
          服务器获取的数据：{countNumber}, 数组为：{testList?.join(',')}
        </h3>
        <h3></h3>
      </div>
    </div>
  )
}
export default Content
