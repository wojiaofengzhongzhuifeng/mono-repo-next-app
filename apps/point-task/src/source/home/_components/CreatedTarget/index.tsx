import { LeftOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber } from 'antd'
import { useState } from 'react'
import { postPostCreatedTargetsHooks } from '../../_hooks/postCreactTargets'
import { useAppStore } from '../../_store'
interface CreatedTargetProps {
  onBack: () => void
}

function CreatedTarget({ onBack }: CreatedTargetProps) {
  const { createdTargets, setCreatedTargets, userInfo } = useAppStore()
  const [targetName, setTargetName] = useState<string>('')
  const [targetPoint, setTargetPoint] = useState<number>(0)
  const [targetDescription, setTargetDescription] = useState<string>('')
  const [form] = Form.useForm()
  const { createTarget, loading } = postPostCreatedTargetsHooks()

  const generateUserId = () => {
    const userId = userInfo?.user_id
    return String(userId)
  }
  console.log(createdTargets)

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
                    console.log(e.target.value)
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
                    max: 999999,
                    message: '积分数量不能超过999999!',
                  },
                ]}
              >
                <InputNumber
                  className='bg-gray-200 w-full'
                  placeholder='输入需要的积分数量'
                  min={1}
                  max={999999}
                  value={targetPoint}
                  onChange={value => {
                    setTargetPoint(value || 1)
                  }}
                  parser={value => {
                    // 移除非数字字符，只保留数字（不允许小数点）
                    if (!value) return 1
                    const numStr = value.replace(/[^\d]/g, '')
                    return numStr ? parseInt(numStr, 10) : 1
                  }}
                />
              </Form.Item>
            </div>
          </div>
          {/* 目标描述 */}
          <div>
            <div>
              <div className='flex mb-2'>
                目标描述
                <div
                  className='text-gray-500 mx-1 text-sm mt-0.5
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
            <Button className='w-full'>取消</Button>
          </div>
        </Form>
      </div>
    </>
  )
}
export default CreatedTarget
