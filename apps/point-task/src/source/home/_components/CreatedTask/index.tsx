import { LeftOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Select, Switch } from 'antd'
import { useState } from 'react'
import { postPostCreatedTasksHooks } from '../../_hooks/postCreactTasks'
import { useAppStore } from '../../_store'

interface CreatedTaskProps {
  onBack: () => void
}

function CreatedTask({ onBack }: CreatedTaskProps) {
  const { userInfo } = useAppStore()
  const [taskName, setTaskName] = useState<string>('')
  const [taskPoint, setTaskPoint] = useState<number>(0)
  const [taskType, setTaskType] = useState<string>('')
  const [isRepeatable, setIsRepeatable] = useState<boolean>(false)
  const [form] = Form.useForm()
  const { createTasks, loading } = postPostCreatedTasksHooks()
  const generateUserId = () => {
    const userId = userInfo?.user_id
    return String(userId)
  }

  const handleSubmit = async (values: any) => {
    try {
      // 生成创建时间
      const createdAt = new Date().toISOString()
      const taskRepeatable = isRepeatable
      const taskData = {
        name: values.taskName,
        create_point: Number(values.points),
        task_type: values.taskType,
        is_repeatable: taskRepeatable,
        user_id: generateUserId(),
        created_at: createdAt,
      }

      await createTasks(
        taskData,
        () => {
          // 成功回调，可以在这里添加成功后的操作
          onBack()
        },
        () => {
          // 失败回调，可以在这里添加失败后的操作
        }
      )
    } catch (error) {
      console.error('创建任务失败:', error)
    }
  }

  // 积分提示
  const pointAdvise = () => {
    if (!taskType) return null

    // 根据任务类型获取建议
    const getTaskTypeAdvise = () => {
      if (taskType === 'study') {
        return <div className='text-blue-500 text-sm'>💡建议10-30积分</div>
      } else if (taskType === 'exercise') {
        return <div className='text-blue-500 text-sm'>💡建议15-40积分</div>
      } else if (taskType === 'work') {
        return <div className='text-blue-500 text-sm'>💡建议20-50积分</div>
      } else if (taskType === 'lift') {
        return <div className='text-blue-500 text-sm'>💡建议5-20积分</div>
      } else if (taskType === 'other') {
        return <div className='text-blue-500 text-sm'>💡建议5-50积分</div>
      }
    }

    return <div className='mb-4 p-3'>{getTaskTypeAdvise()}</div>
  }

  return (
    <>
      <div className='p-6 w-2/5 mx-auto rounded-lg shadow-lg mt-2'>
        <div className='flex  items-center mb-4'>
          {/* head */}
          <button className='mr-4' onClick={onBack}>
            <LeftOutlined />
          </button>
          <h2 className='text-xl '>创建新任务</h2>
        </div>

        {/* body */}
        <Form form={form} layout='vertical' onFinish={handleSubmit}>
          {/* 任务名称 */}
          <div>
            <div>
              <div className='flex mb-2'>
                任务名称<div className='text-red-500 mx-1'>*</div>
              </div>
              <Form.Item
                name='taskName'
                rules={[
                  { required: true, message: '请输入任务名称!' },
                  { max: 50, message: '任务名称不能超过100个字符!' },
                ]}
              >
                <Input.TextArea
                  placeholder='请输入任务名称'
                  className='bg-gray-200'
                  showCount
                  maxLength={50}
                  value={taskName}
                  onChange={e => {
                    setTaskName(e.target.value || '')
                  }}
                />
              </Form.Item>
            </div>
          </div>

          {/* 所需积分 */}
          <div className='mt-2'>
            <div>
              <div className='flex mb-2'>
                所需积分<div className='text-red-500 mx-1'>*</div>
              </div>
              <Form.Item
                name='points'
                rules={[
                  { required: true, message: '请输入积分数量!' },
                  { type: 'number', min: 1, message: '积分数量必须大于0' },
                ]}
              >
                <InputNumber
                  className='bg-gray-200 w-full'
                  placeholder='输入需要的积分数量'
                  min={1}
                  value={taskPoint}
                  onChange={value => {
                    setTaskPoint(value || 1)
                  }}
                  parser={value => {
                    // 严格限制只能输入大于0的数字，禁止任何其他字符
                    if (!value) return 1
                    // 移除所有非数字字符
                    const numStr = value.replace(/[^\d]/g, '')
                    // 如果结果为空或0，返回1（确保大于0）
                    if (!numStr || numStr === '0') return 1
                    // 转换为数字并确保在有效范围内
                    const num = parseInt(numStr, 10)
                    // 确保数字大于0且不超过最大值
                    return Math.min(Math.max(num, 1))
                  }}
                />
              </Form.Item>
            </div>
          </div>

          {/* 任务类型 */}
          <div className='mt-2'>
            <div className='flex mb-2'>任务类型</div>
            <Form.Item
              name='taskType'
              rules={[{ required: false, message: '请选择任务类型!' }]}
            >
              <Select
                className='bg-gray-200 w-full'
                placeholder='选择任务类型'
                value={taskType || undefined}
                onChange={value => {
                  setTaskType(value)
                }}
              >
                <Select.Option value='study'>学习</Select.Option>
                <Select.Option value='exercise'>运动</Select.Option>
                <Select.Option value='work'>工作</Select.Option>
                <Select.Option value='lift'>生活</Select.Option>
                <Select.Option value='other'>其他</Select.Option>
              </Select>
            </Form.Item>
            <div>{pointAdvise()}</div>
          </div>

          {/* 是否可重复 */}
          <div className='mt-2'>
            <div className='flex mb-2'>可重复任务</div>
            <div className=' flex justify-between bg-gray-100 drop-shadow-md p-2'>
              <div>
                <div>允许重复完成</div>
                <div className='text-gray-500'>
                  可以多次完成此任务并获得积分
                </div>
              </div>

              <Switch
                checked={isRepeatable}
                onChange={checked => {
                  setIsRepeatable(checked)
                }}
              />
            </div>
          </div>
          {/* button */}
          <div>
            <Button
              type='primary'
              className='w-full mt-8 mb-2 h-10'
              htmlType='submit'
              loading={loading}
              color='green'
              variant='filled'
            >
              创建任务
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}
export default CreatedTask
