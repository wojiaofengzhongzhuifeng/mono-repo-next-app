import React, { useState } from 'react'
import { Select } from 'antd'
interface AddGoalsProps {
  onBack: () => void
}

function AddGoals({ onBack }: AddGoalsProps) {
  const [GoalswordNumber, setGoalsWordNumber] = useState('')
  const [getPoints, setGetPoints] = useState<string | number>('')
  const [goalType, setGoalType] = useState<string | null>(null)
  console.log('goalType', goalType)

  const advisePoints = (value: string | null) => {
    return (
      <>
        <div>选择类型: {value}</div>
      </>
    )
  }
  return (
    <div className='flex justify-center items-center mb-6'>
      <div className='w-[80vh] bg-gray-50 px-6 py-6 rounded-lg mb-6 drop-shadow-lg'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>添加新任务</h2>
        </div>

        <form className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              任务名称 <span className='text-red-500'>*</span>
            </label>
            <input
              value={GoalswordNumber}
              onChange={e => setGoalsWordNumber(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 '
              placeholder='请输入任务名称'
              maxLength={50}
            />
            {
              <div className='text-gray-500 mt-1 text-xs text-right'>
                {<div>{GoalswordNumber.length} /50</div>}
              </div>
            }
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              获得积分 <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              value={getPoints}
              onChange={e =>
                setGetPoints(
                  e.target.value === '' ? '' : Number(e.target.value)
                )
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='完成这个任务可以获得多少积分'
            />
          </div>

          <div>
            <div className='flex'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                任务类型
              </label>
              <div className='text-gray-500 mt-0.5 text-xs text-right pl-1'>
                (可选)
              </div>
            </div>
            <Select
              className='w-full '
              placeholder='请选择目标'
              options={[
                { value: 'goal1', label: '学习' },
                { value: 'goal2', label: '运动' },
                { value: 'goal3', label: '工作' },
                { value: 'goal4', label: '生活' },
                { value: 'goal5', label: '其他' },
              ]}
              value={goalType}
              onChange={value => {
                setGoalType(value)
                advisePoints(value)
              }}
            />
            {advisePoints(goalType)}
          </div>

          <div>
            <button
              type='submit'
              className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
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
export default AddGoals
