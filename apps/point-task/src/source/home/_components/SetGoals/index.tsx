import React, { useState } from 'react'
import MyGoals from './MyGoals'
import { useAppStore } from '../../_store'

interface SetGoalsProps {
  onBack: () => void
}

function SetGoals({ onBack }: SetGoalsProps) {
  const [showMyGoals, setShowMyGoals] = useState<boolean>(false)
  const [wordNumber, setWordNumber] = useState('')
  const [points, setPoints] = useState<string | number>('')
  const [goatNumber, setGoatNumber] = useState('')
  const { userInfo } = useAppStore()

  const difficultyLevel = (points: number) => {
    if (!points) {
      return ''
    }
    if (points < 50) return '简单'
    if (points < 100) return '中等'
    if (points < 150) return '困难'
    return '极难'
  }
  const [goalsCard, setGoalsCard] = useState<{
    name: string
    need_points: string | number
    user_id: string
    is_redeemed: boolean // true表示已兑换，false表示未兑换 todo后续使用
    created_at: number
    description: string | null
  }>()

  if (showMyGoals) {
    return <MyGoals onBack={() => setShowMyGoals(false)} />
  }

  const generateUserId = () => {
    const userId = userInfo?.user_id
    return String(userId)
  }

  const getGoalsCard = () => {
    const newCard = {
      name: wordNumber,
      need_points: points,
      user_id: generateUserId(),
      is_redeemed: true || false,
      created_at: Date.now(),
      description: goatNumber || null,
    }
    setGoalsCard(newCard)
    console.log('新创建的目标卡片：', newCard) // 直接打印新创建的卡片
    return newCard
  }

  // 移除这里的console.log，因为它会在每次渲染时打印undefined

  return (
    <div className='flex justify-center items-center mb-6'>
      <div className='w-[80vh] bg-gray-50 px-6 py-6 rounded-lg mb-6 drop-shadow-lg'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>创建目标</h2>
        </div>

        <form className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              目标名称 <span className='text-red-500'>*</span>
            </label>
            <textarea
              value={wordNumber}
              onChange={e => setWordNumber(e.target.value)}
              className='w-full px-3 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 '
              placeholder='请输入目标名称'
              rows={2}
              maxLength={100}
            />
            {
              <div className='text-gray-500 mt-1 text-xs text-right'>
                {<div>{wordNumber.length} /100</div>}
              </div>
            }
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              所需积分 <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              value={points}
              onChange={e =>
                setPoints(e.target.value === '' ? '' : Number(e.target.value))
              }
              className='w-full px-3 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='请输入所需积分'
            />
            {typeof points === 'number' && points > 0 && (
              <div
                className={
                  points < 50
                    ? 'text-green-500'
                    : points < 100
                      ? 'text-orange-500'
                      : points < 150
                        ? 'text-red-500'
                        : 'text-red-500'
                }
              >
                难度等级：{difficultyLevel(points)}
              </div>
            )}
          </div>

          <div>
            <div className='flex'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                目标描述
              </label>
              <div className='text-gray-500 mt-0.5 text-xs text-right pl-1'>
                (可选)
              </div>
            </div>
            <textarea
              className='w-full px-3 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows={4}
              placeholder='详细描述你的目标...'
              maxLength={200}
              value={goatNumber}
              onChange={e => setGoatNumber(e.target.value)}
            />
            {
              <div className='text-gray-500 mt-1 text-xs text-right'>
                {<div>{goatNumber.length} /200</div>}
              </div>
            }
          </div>

          <div>
            <button
              type='submit'
              className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
              onClick={e => {
                e.preventDefault()
                // 这里可以添加创建目标的逻辑
                alert('目标创建成功！')
                setShowMyGoals(true)
                getGoalsCard()
              }}
            >
              创建目标
            </button>

            <button
              type='button'
              onClick={onBack}
              className='mt-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors'
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SetGoals
