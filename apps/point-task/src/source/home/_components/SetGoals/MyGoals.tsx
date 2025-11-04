import React, { useState } from 'react'
import { ArrowLeftOutlined, CheckSquareOutlined } from '@ant-design/icons'
import { Divider, Flex, Progress } from 'antd'

interface MyGoalsProps {
  onBack: () => void
  goalsCard?: {
    name: string
    need_points: string | number
    user_id: string
    is_redeemed: boolean
    created_at: number
    description: string | null
  }
}

function MyGoals({ onBack, goalsCard }: MyGoalsProps) {
  const [goalState, setGoalState] = useState('进行中') // 目标状态：进行中、已完成、未完成

  console.log('目标卡片传入的数据：', goalsCard)
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
            {goalsCard ? (
              <div className='p-4 border border-gray-200 rounded-lg'>
                {/* 头部 */}
                <div className='flex justify-between'>
                  <div className='text-lg font-semibold mb-2'>
                    {goalsCard.name}
                  </div>
                  <div>
                    <CheckSquareOutlined className='w-5 h-5 text-gray-400' />
                  </div>
                </div>

                {/* 进度状态 */}
                <div className='bg-blue-500 text-white  rounded-full text-center w-20 h-6 mb-4 mt-2'>
                  {goalState}
                </div>

                {/* 目标描述 */}
                <div>
                  <div className='text-gray-600'>{goalsCard.description}</div>
                </div>

                {/* 目标进度 */}
                <div className=' mt-8'>
                  <div className='text-gray-600 flex justify-between'>
                    <div className=''>进度</div>
                    {/* todo 后续添加进度条 */}
                    <div className='text-blue-500'>
                      0/{goalsCard.need_points}积分
                    </div>
                  </div>
                  <div>
                    <Flex gap='small' vertical>
                      {/* todo 后续添加进度条 */}
                      <Progress percent={0} />
                    </Flex>
                  </div>
                </div>
                <Divider />
                {/* 目标出创建时间 */}
                <div className=' text-gray-500 text-sm'>
                  创建时间:{' '}
                  {new Date(goalsCard.created_at).toLocaleDateString()}
                </div>

                {/* 所需积分即可兑换 */}
                {/* todo 后续根据进度动态显示还需多少积分 */}
                <div className='mt-2 text-gray-500 text-sm bg-blue-50 inline-block px-2 py-1 rounded mt-8'>
                  还需{goalsCard.need_points} 积分即可兑换
                </div>
              </div>
            ) : (
              <div className='p-4 border border-gray-200 rounded-lg text-center text-gray-500'>
                暂无目标数据
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MyGoals
