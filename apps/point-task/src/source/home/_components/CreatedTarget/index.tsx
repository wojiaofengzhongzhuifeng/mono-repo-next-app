import { LeftOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber } from 'antd'
import { useState } from 'react'
import { postPostCreatedTargetsHooks } from '../../_hooks/postCreactTargets'
import { useAppStore } from '../../_store'
interface CreatedTargetProps {
  onBack: () => void
}

function CreatedTarget({ onBack }: CreatedTargetProps) {
  const { userInfo } = useAppStore()
  const [targetName, setTargetName] = useState<string>('')
  const [targetPoint, setTargetPoint] = useState<number>(0)
  const [targetDescription, setTargetDescription] = useState<string>('')
  const [form] = Form.useForm()
  const { createTarget, loading } = postPostCreatedTargetsHooks()

  const generateUserId = () => {
    const userId = userInfo?.user_id
    return String(userId)
  }

  const handleSubmit = async (values: any) => {
    try {
      const targetData = {
        name: values.targetName,
        description: values.description || '',
        need_point: Number(values.points),
        user_id: generateUserId(),
      }

      await createTarget(targetData)
      // onBack()
    } catch (error) {
      console.error('创建目标失败:', error)
    }
  }

  // 积分提示
  const pointAdvise = () => {
    if (targetPoint === 0) return null
    if (targetPoint > 0) {
      if (targetPoint > 100) {
        return <div className='text-red-500 mb-4'>难度等级：困难</div>
      } else if (targetPoint > 50) {
        return <div className='text-orange-500 mb-4'>难度等级：中等</div>
      } else if (targetPoint > 0) {
        return <div className='text-green-500 mb-4'>难度等级：简单</div>
      }
    }
    return <></>
  }
  return (
    <>
      <div className='p-6 w-2/5 mx-auto rounded-lg shadow-lg mt-2'>
        <div className='flex  items-center mb-4'>
          {/* head */}
          <button className='mr-4' onClick={onBack}>
            <LeftOutlined />
          </button>
          <h2 className='text-xl '>创建新目标</h2>
        </div>

        {/* body */}
        <Form form={form} layout='vertical' onFinish={handleSubmit}>
          {/* 目标名称 */}
          <div>
            <div>
              <div className='flex mb-2'>
                目标名称<div className='text-red-500 mx-1'>*</div>
              </div>
              <Form.Item
                name='targetName'
                rules={[
                  { required: true, message: '请输入目标名称!' },
                  { max: 100, message: '目标名称不能超过100个字符!' },
                ]}
              >
                <Input.TextArea
                  placeholder='请输入目标名称'
                  className='bg-gray-200'
                  showCount
                  maxLength={100}
                  value={targetName}
                  onChange={e => {
                    setTargetName(e.target.value || '')
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
                  {
                    type: 'number',
                  },
                ]}
              >
                <InputNumber
                  className='bg-gray-200 w-full'
                  placeholder='输入需要的积分数量'
                  min={1}
                  value={targetPoint}
                  onChange={value => {
                    setTargetPoint(value || 1)
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
              <div>{pointAdvise()}</div>
            </div>
          </div>
          {/* 目标描述 */}
          <div>
            <div>
              <div className='flex mb-2'>
                目标描述
                <div
                  className='text-gray-500 mx-1 text-sm
                '
                >
                  (可选)
                </div>
              </div>
              <Form.Item
                name='description'
                rules={[{ max: 200, message: '目标描述不能超过200个字符!' }]}
              >
                <Input.TextArea
                  placeholder='详细描述你的目标...'
                  className='bg-gray-200'
                  showCount
                  maxLength={200}
                  value={targetDescription}
                  onChange={e => {
                    setTargetDescription(e.target.value || '')
                  }}
                />
              </Form.Item>
            </div>
          </div>
          {/* button */}
          <div>
            <Button
              type='primary'
              className='w-full mt-8 mb-2 h-10'
              htmlType='submit'
              loading={loading}
            >
              创建目标
            </Button>
            <Button onClick={onBack} className='mt-2'>
              取消
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}
export default CreatedTarget
