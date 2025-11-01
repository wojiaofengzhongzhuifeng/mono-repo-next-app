import React, { useState } from 'react'

interface SetGoalsProps {
  onBack: () => void
}

function SetGoals({ onBack }: SetGoalsProps) {
  const [wordNumber, setWordNumber] = useState('')
  const [points, setPoints] = useState<string | number>('')
  // const []
  const difficultyLevel = (points: number) => {
    if (!points) {
      return ''
    }
    if (points < 50) return '简单'
    if (points < 100) return '中等'
    if (points < 150) return '困难'
    return '极难'
  }
  return (
    <div className='flex justify-center items-center mb-6'>
      <div className='w-[80vh] bg-gray-50 px-6 py-6 rounded-lg mb-6 drop-shadow-2xl'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>创建目标</h2>
        </div>

        <form className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              目标名称
            </label>
            <textarea
              value={wordNumber}
              onChange={e => setWordNumber(e.target.value)}
              className='w-full px-3 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 '
              placeholder='请输入目标名称'
              rows={2}
            />
            {wordNumber && (
              <div className='text-gray-500 mt-1 text-xs text-right'>
                {wordNumber.length < 100
                  ? `${wordNumber.length} /100`
                  : '目标名称过长，请控制在100字以内'}
              </div>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              所需积分
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
              placeholder='请输入目标描述'
            />
          </div>

          <div className='flex justify-end space-x-4'>
            <button
              type='button'
              onClick={onBack}
              className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors'
            >
              取消
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
            >
              创建目标
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SetGoals
