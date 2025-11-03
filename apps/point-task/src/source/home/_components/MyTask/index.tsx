import { Button } from 'antd'
import React from 'react'

interface MyTaskProps {
  onBack: () => void
}

function MyTask({ onBack }: MyTaskProps) {
  return (
    <>
      <div className='flex justify-center items-center mb-6'>
        <div className='grid grid-cols-2 gap-3 h-[45vh] w-[80vh] bg-gray-50 text-white px-6 py-6 rounded-lg mb-6 drop-shadow-2xl'>
          {/* 按钮部分 */}
          <div className='flex'>
            <Button
              type='primary'
              className='rounded-full bg-blue-500 mr-4 hover:bg-blue-600'
            >
              全部
            </Button>
            <Button
              type='primary'
              className='rounded-full bg-blue-500 mr-4 hover:bg-blue-600'
            >
              未完成
            </Button>
            <Button
              type='primary'
              className='rounded-full bg-blue-500 mr-4 hover:bg-blue-600'
            >
              已完成
            </Button>
          </div>
          {/* 任务列表部分 */}
          <div>123232232323233</div>
        </div>
      </div>
    </>
  )
}
export default MyTask
