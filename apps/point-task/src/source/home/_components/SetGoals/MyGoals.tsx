import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'

interface MyGoalsProps {
  onBack: () => void
}

function MyGoals({ onBack }: MyGoalsProps) {
  return (
    <>
      <div className='flex justify-center items-center mb-6'>
        <div className='w-[80vh] bg-gray-50 px-6 py-6 rounded-lg mb-6 drop-shadow-lg'>
          <div className='flex items-center mb-6'>
            <button
              type='button'
              onClick={onBack}
              className='mt-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors'
            >
              <ArrowLeftOutlined />
            </button>
            <h2 className='text-2xl font-bold mx-2'>我的目标</h2>
          </div>

          <div className='space-y-4'>
            <div className='p-4 border border-gray-200 rounded-lg'>
              <h3 className='text-lg font-semibold mb-2'>目标列表</h3>
              <p className='text-gray-600'>这里将显示您创建的所有目标</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyGoals
