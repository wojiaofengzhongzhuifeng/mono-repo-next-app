import React, { useState } from 'react'
import { ArrowLeftOutlined, CheckSquareOutlined } from '@ant-design/icons'
import { Divider, Flex, Progress } from 'antd'
import { useAppStore } from '../../_store'
import useRedeemAwardHooks from '../../_hooks/useRedeemAward'
import { completeTasks } from '../../_api/completeTasks'

interface TargetListProps {
  onBack: () => void
}

function TargetList({ onBack }: TargetListProps) {
  const [targetState, setTargetState] = useState('进行中') // 目标状态：进行中、已完成、未完成
  const { userInfo, userTargets, updateUserPoints } = useAppStore()
  const [exchangeable, setExchangeable] = useState(false)
  const { redeemAward, loading, error } = useRedeemAwardHooks()
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<number>>(
    new Set()
  ) // 跟踪已完成的任务ID

  console.log('userTargets', userTargets)

  const calculateRemainingPoints = (card: { need_point: string | number }) => {
    if (!userInfo?.totalPoints) return Number(card.need_point)
    const neededPoints = Number(card.need_point)
    const userPoints = Number(userInfo.totalPoints)
    const remaining = neededPoints - userPoints
    return remaining > 0 ? remaining : 0 // 如果积分足够，返回0
  }

  // 计算进度百分比
  const calculateProgress = (card: { need_point: string | number }) => {
    if (!userInfo?.totalPoints) return 0
    const neededPoints = Number(card.need_point)
    const userPoints = Number(userInfo.totalPoints)
    const progress = (userPoints / neededPoints) * 100
    return Math.min(progress, 100) // 不超过100%
  }

  //兑换功能
  const handleExchange = async (card: {
    need_point: string | number
    id: number | string
  }) => {
    if (!userInfo?.totalPoints) {
      alert('用户积分信息不可用')
      return
    }

    const remainingPoints = calculateRemainingPoints(card)
    if (remainingPoints > 0) {
      alert(`还需 ${remainingPoints} 积分才能兑换`)
      return
    }

    try {
      // 调用兑换API
      await redeemAward({
        user_id: String(userInfo.user_id),
        target_id: Number(card.id),
      })

      // 进行兑换操作
      const updatedPoints =
        Number(userInfo.totalPoints) - Number(card.need_point)
      if (updatedPoints >= 0) {
        updateUserPoints(updatedPoints)
        setExchangeable(true)

        // 将任务ID添加到已完成列表
        const taskId = Number(card.id)
        setCompletedTaskIds(prev => new Set(prev).add(taskId))

        // 更新目标状态为已完成
        setTargetState('已完成')

        console.log('兑换成功，剩余积分：', updatedPoints)
        alert('兑换成功！恭喜你完成目标！')
      }
    } catch (error) {
      console.error('兑换失败:', error)
      alert('兑换失败，请重试')
    }
  }

  // 目标状态更新
  const updateTargetState = (state: '进行中' | '已完成' | '未完成') => {
    setTargetState(state)
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
            {userTargets && userTargets.length > 0 ? (
              userTargets.map((card, index) => {
                const taskId = Number(card.id)
                const isCompleted = completedTaskIds.has(taskId)

                return (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg transition-all duration-300 ${
                      isCompleted
                        ? 'border-green-500 bg-green-50' // 已完成样式：绿色边框和背景
                        : 'border-gray-200' // 默认样式
                    }`}
                  >
                    {/* 头部 */}
                    <div className='flex justify-between'>
                      <div
                        className={`text-lg font-semibold mb-2 ${
                          isCompleted ? 'text-green-700' : ''
                        }`}
                      >
                        {card.name}
                      </div>
                      <div>
                        <CheckSquareOutlined
                          className={`w-5 h-5 ${
                            isCompleted ? 'text-green-500' : 'text-gray-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* 进度状态 */}
                    <div
                      className={`rounded-full text-center w-20 h-6 mb-4 mt-2 ${
                        isCompleted
                          ? 'bg-green-500 text-white' // 已完成：绿色背景
                          : 'bg-blue-500 text-white' // 进行中：蓝色背景
                      }`}
                    >
                      {isCompleted ? '已完成' : targetState}
                    </div>

                    {/* 目标描述 */}
                    <div>
                      <div
                        className={`${
                          isCompleted ? 'text-green-700' : 'text-gray-600'
                        }`}
                      >
                        {card.description}
                      </div>
                    </div>

                    {/* 目标进度 */}
                    <div className=' mt-8'>
                      <div className='text-gray-600 flex justify-between'>
                        <div className=''>进度</div>
                        <div
                          className={`${
                            isCompleted ? 'text-green-500' : 'text-blue-500'
                          }`}
                        >
                          {userInfo?.totalPoints}/{card.need_point}积分
                        </div>
                      </div>
                      <div>
                        <Flex gap='small' vertical>
                          <Progress
                            percent={
                              isCompleted ? 100 : calculateProgress(card)
                            }
                            strokeColor={isCompleted ? '#52c41a' : '#1890ff'}
                          />
                        </Flex>
                      </div>
                    </div>
                    <Divider />
                    {/* 目标出创建时间 */}
                    <div className=' text-gray-500 text-sm flex justify-between'>
                      <div>
                        创建时间:{' '}
                        {new Date(card.created_at).toLocaleDateString()}
                      </div>
                      <div>
                        {!isCompleted &&
                        userInfo?.totalPoints &&
                        card?.need_point &&
                        Number(userInfo.totalPoints) >=
                          Number(card.need_point) ? (
                          <button
                            className='text-white border border-green-500 px-2 py-1  bg-green-600 rounded-lg'
                            onClick={() => handleExchange(card)}
                          >
                            立即兑换
                          </button>
                        ) : (
                          <button
                            className={`px-2 py-1 rounded ${
                              isCompleted
                                ? 'bg-green-500 text-white border border-green-500'
                                : 'bg-red-500 text-white border border-red-500'
                            }`}
                          >
                            {isCompleted ? '已完成' : '不可兑换'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
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

export default TargetList
