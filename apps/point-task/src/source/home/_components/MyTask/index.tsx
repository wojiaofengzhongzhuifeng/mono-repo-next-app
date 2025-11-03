import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

interface MyTaskProps {
  onBack: () => void
}

function MyTask({ onBack }: MyTaskProps) {
  return (
    <>
      <div className='flex justify-center mb-6'>
        <div className='gap-3 h-[45vh] w-[80vh] bg-gray-50 px-6 py-6 rounded-lg  drop-shadow-2xl'>
          {/* 头部 */}
          <div className='flex  items-center mb-2'>
            <button
              type='button'
              onClick={onBack}
              className='mt-2  py-2  rounded-lg hover:bg-gray-100 transition-colors'
            >
              <ArrowLeftOutlined />
            </button>
            <h2 className='  mx-2'>我的任务</h2>
          </div>

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
          <div className='mt-4 h-[30vh] '>
            <div className='border border-gray-800 rounded-lg'>123123</div>
          </div>
        </div>
      </div>
    </>
  )
}
export default MyTask
