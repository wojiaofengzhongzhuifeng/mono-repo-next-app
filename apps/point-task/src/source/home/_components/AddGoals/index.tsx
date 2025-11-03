import React, { useState } from 'react'
import { Select } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Switch } from 'antd'
import { Alert } from 'antd'
interface AddGoalsProps {
  onBack: () => void
}

function AddGoals({ onBack }: AddGoalsProps) {
  const [goalswordNumber, setGoalsWordNumber] = useState('')
  const [getPoints, setGetPoints] = useState<string | number>('')
  const [goalType, setGoalType] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [addNewTask, setAddNewTask] = useState<{
    name: string
    points: string | number
    open: boolean
    goalType: string | null
  } | null>(null)

  const advisePoints = (value: string | null) => {
    if (value === 'goal1') {
      return (
        <>
          <div>💡建议10-30积分</div>
        </>
      )
    } else if (value === 'goal2') {
      return (
        <>
          <div>💡建议15-40积分</div>
        </>
      )
    } else if (value === 'goal3') {
      return (
        <>
          <div>💡建议20-50积分</div>
        </>
      )
    } else if (value === 'goal4') {
      return (
        <>
          <div>💡建议5-20积分</div>
        </>
      )
    } else if (value === 'goal5') {
      return (
        <>
          <div>💡建议10-30积分</div>
        </>
      )
    }
    return null
  }

  const handleAddNewTask = () => {
    // 处理添加新任务的逻辑
    const newTask = {
      name: goalswordNumber,
      points: getPoints,
      open: open,
      goalType: goalType,
    }

    if (goalswordNumber === '') {
      return alert('任务名称不能为空！')
    } else if (getPoints === '') {
      return alert('获得积分不能为空！')
    }

    setAddNewTask(newTask)
    alert('任务添加成功！')

    return { newTask }
  }
  return (
    <>
      <div className='flex justify-center items-center mb-6'>
        <div className='w-[80vh] bg-gray-50 px-6 py-6 rounded-lg mb-6 drop-shadow-lg'>
          <div className='flex  items-center mb-6'>
            <button
              type='button'
              onClick={onBack}
              className='mt-2 px-4 py-2  rounded-lg hover:bg-gray-100 transition-colors'
            >
              <ArrowLeftOutlined />
            </button>
            <h2 className='text-2xl font-bold mx-2'>添加新任务</h2>
          </div>

          <form className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                任务名称 <span className='text-red-500'>*</span>
              </label>
              <input
                value={goalswordNumber}
                onChange={e => setGoalsWordNumber(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 '
                placeholder='请输入任务名称'
                maxLength={50}
              />
              {
                <div className='text-gray-500 mt-1 text-xs text-right'>
                  {<div>{goalswordNumber.length} /50</div>}
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
              <div className='text-blue-500 mt-1  text-[14px]'>
                {advisePoints(goalType)}
              </div>
            </div>
          </form>

          <div>
            <div className='flex justify-between items-center mt-4 p-2 border border-gray-300 rounded-lg bg-gray-150'>
              <div>
                允许重复完成
                <div className='text-gray-500 mt-1 text-xs text-right'>
                  可以多次完成此任务并获得积分
                </div>
              </div>
              <Switch
                onChange={setOpen}
                checked={open}
                style={{ margin: 16 }}
              />
            </div>
          </div>

          <div className='mt-10'>
            <button
              type='submit'
              className='w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
              onClick={() => {
                handleAddNewTask()
                setGoalsWordNumber('')
                setGetPoints('')
                setGoalType(null)
                setOpen(false)
              }}
            >
              添加任务
            </button>
            <div className='text-gray-500 mt-1 text-xs mt-4'>查看任务列表</div>
          </div>
        </div>
      </div>

      <div className='flex justify-center items-center  text-blue-700 mt-'>
        <div className='w-[80vh] bg-gray-50 px-3 py-6 rounded-lg mb-6 drop-shadow-lg bg-blue-100'>
          💡提示：添加任务后，您可以在任务列表中完成它们来获得积分！
        </div>
      </div>
    </>
  )
}
export default AddGoals
