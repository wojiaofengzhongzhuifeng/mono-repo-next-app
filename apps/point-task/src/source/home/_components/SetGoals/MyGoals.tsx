import React, { use, useState } from 'react'
import { ArrowLeftOutlined, CheckSquareOutlined } from '@ant-design/icons'
import { Divider, Flex, Progress } from 'antd'
import { useAppStore } from '../../_store'

interface MyGoalsProps {
  onBack: () => void
}

function MyGoals({ onBack }: MyGoalsProps) {
  const [goalState, setGoalState] = useState('进行中') // 目标状态：进行中、已完成、未完成
  const { userInfo, goalsCard, updateUserPoints } = useAppStore()
  const [exchangeable, setExchangeable] = useState(false)

  // 计算还需多少积分
  const calculateRemainingPoints = (card: { need_points: string | number }) => {
    if (!userInfo?.totalPoints) return Number(card.need_points)
    const neededPoints = Number(card.need_points)
    const userPoints = Number(userInfo.totalPoints)
    const remaining = neededPoints - userPoints
    return remaining > 0 ? remaining : 0 // 如果积分足够，返回0
  }

  // 计算进度百分比
  const calculateProgress = (card: { need_points: string | number }) => {
    if (!userInfo?.totalPoints) return 0
    const neededPoints = Number(card.need_points)
    const userPoints = Number(userInfo.totalPoints)
    const progress = (userPoints / neededPoints) * 100
    return Math.min(progress, 100) // 不超过100%
  }

  //兑换功能
  const handleExchange = (card: { need_points: string | number }) => {
    if (!userInfo?.totalPoints) {
      alert('用户积分信息不可用')
      return
    }

    const remainingPoints = calculateRemainingPoints(card)
    if (remainingPoints > 0) {
      alert(`还需 ${remainingPoints} 积分才能兑换`)
      return
    }
    // 进行兑换操作
    const updatedPoints =
      Number(userInfo.totalPoints) - Number(card.need_points)
    if (updatedPoints >= 0 && card) {
      updateUserPoints(updatedPoints)
      setExchangeable(true)
    }
    console.log('兑换成功，剩余积分：', updatedPoints)
    alert('兑换成功！')
  }

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
            {goalsCard && goalsCard.length > 0 ? (
              goalsCard.map((card, index) => (
                <div
                  key={index}
                  className='p-4 border border-gray-200 rounded-lg'
                >
                  {/* 头部 */}
                  <div className='flex justify-between'>
                    <div className='text-lg font-semibold mb-2'>
                      {card.name}
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
                    <div className='text-gray-600'>{card.description}</div>
                  </div>

                  {/* 目标进度 */}
                  <div className=' mt-8'>
                    <div className='text-gray-600 flex justify-between'>
                      <div className=''>进度</div>
                      <div className='text-blue-500'>
                        {userInfo?.totalPoints}/{card.need_points}积分
                      </div>
                    </div>
                    <div>
                      <Flex gap='small' vertical>
                        <Progress percent={calculateProgress(card)} />
                      </Flex>
                    </div>
                  </div>
                  <Divider />
                  {/* 目标出创建时间 */}
                  <div className=' text-gray-500 text-sm flex justify-between'>
                    <div>
                      创建时间: {new Date(card.created_at).toLocaleDateString()}
                    </div>
                    <div>
                      {userInfo?.totalPoints &&
                      card?.need_points &&
                      Number(userInfo.totalPoints) >=
                        Number(card.need_points) ? (
                        <button
                          className='text-white border border-green-500 px-2 py-1  bg-green-600 rounded-lg'
                          onClick={() => {
                            handleExchange(card)
                          }}
                        >
                          立即兑换
                        </button>
                      ) : (
                        <button className='text-white border border-red-500 px-2 py-1 rounded bg-red-500'>
                          不可兑换
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 进度动态显示 */}
                  <div className=' text-blue-600 text-sm bg-blue-50 inline-block px-2 py-1 rounded mt-8'>
                    {calculateRemainingPoints(card) > 0 ? (
                      <>还需{calculateRemainingPoints(card)} 积分即可兑换</>
                    ) : (
                      <>积分已足够，可以兑换！</>
                    )}
                  </div>
                </div>
              ))
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
