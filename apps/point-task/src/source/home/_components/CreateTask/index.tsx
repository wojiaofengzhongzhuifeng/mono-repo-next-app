import { ArrowLeftOutlined } from '@ant-design/icons'
import { Select, Switch } from 'antd'
import { useState } from 'react'
import { useAddTaskHooks } from '../../_hooks/useAddTask'
import { useAppStore } from '../../_store'
interface CreateTaskProps {
  onBack: () => void
}

function CreateTask({ onBack }: CreateTaskProps) {
  const [taskwordNumber, setTaskWordNumber] = useState('')
  const [getPoints, setGetPoints] = useState<string | number>('')
  const [taskType, setTaskType] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const { userInfo, userAddTask, setUserAddTask } = useAppStore()
  const { createAddTask } = useAddTaskHooks()

  const advisePoints = (value: string | null) => {
    if (value === 'study') {
      return (
        <>
          <div>💡建议10-30积分</div>
        </>
      )
    } else if (value === 'sport') {
      return (
        <>
          <div>💡建议15-40积分</div>
        </>
      )
    } else if (value === 'work') {
      return (
        <>
          <div>💡建议20-50积分</div>
        </>
      )
    } else if (value === 'life') {
      return (
        <>
          <div>💡建议5-20积分</div>
        </>
      )
    } else if (value === 'other') {
      return (
        <>
          <div>💡建议10-30积分</div>
        </>
      )
    }
    return null
  }
  const generateUserId = () => {
    const userId = userInfo?.user_id
    return String(userId)
  }

  const handleAddNewTask = async () => {
    const userId = generateUserId()

    if (taskwordNumber === '') {
      return alert('任务名称不能为空！')
    } else if (getPoints === '') {
      return alert('获得积分不能为空！')
    }

    const newTask = {
      name: taskwordNumber,
      create_point: Number(getPoints),
      task_type: taskType || 'other',
      is_repeatable: open,
      user_id: userId,
    }

    // 立即更新本地状态，让用户立即看到任务被添加
    setUserAddTask([...(userAddTask || []), newTask])

    // 成功回调：清空表单并返回首页
    const onSuccess = () => {
      setTaskWordNumber('')
      setGetPoints('')
      setTaskType(null)
      setOpen(false)
      onBack()
    }

    // 失败回调：返回首页
    const onError = () => {
      onBack()
    }

    // 请求添加任务
    await createAddTask([newTask], onSuccess, onError)
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
                value={taskwordNumber}
                onChange={e => setTaskWordNumber(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 '
                placeholder='请输入任务名称'
                maxLength={50}
              />
              {
                <div className='text-gray-500 mt-1 text-xs text-right'>
                  {<div>{taskwordNumber.length} /50</div>}
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
                onChange={e => {
                  // 只允许输入正整数，移除非数字字符
                  const value = e.target.value.replace(/[^0-9]/g, '')
                  setGetPoints(value === '' ? '' : Number(value))
                }}
                onKeyPress={e => {
                  // 阻止输入 e, E, -, + 等非数字字符
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== 'Backspace' &&
                    e.key !== 'Delete' &&
                    e.key !== 'ArrowLeft' &&
                    e.key !== 'ArrowRight' &&
                    e.key !== 'Tab'
                  ) {
                    e.preventDefault()
                  }
                }}
                min='1'
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
                  { value: 'study', label: '学习' },
                  { value: 'sport', label: '运动' },
                  { value: 'work', label: '工作' },
                  { value: 'life', label: '生活' },
                  { value: 'other', label: '其他' },
                ]}
                value={taskType}
                onChange={value => {
                  setTaskType(value)
                  advisePoints(value)
                }}
              />
              <div className='text-blue-500 mt-1  text-[14px]'>
                {advisePoints(taskType)}
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
              className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
              onClick={() => {
                handleAddNewTask()
              }}
            >
              创建任务
            </button>
            {/* todo  点击显示我的任务*/}
            <div className='text-gray-500 mt-1 text-xs mt-4'>查看任务列表</div>
          </div>
        </div>
      </div>

      <div className='flex justify-center items-center  text-blue-700 mt-4'>
        <div className='w-[80vh] bg-gray-50 px-3 py-6 rounded-lg mb-6 drop-shadow-lg bg-blue-100'>
          💡提示：添加任务后，您可以在任务列表中完成它们来获得积分！
        </div>
      </div>
    </>
  )
}
export default CreateTask
