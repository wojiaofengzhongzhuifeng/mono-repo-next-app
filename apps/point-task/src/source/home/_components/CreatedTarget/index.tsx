import { LeftOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber } from 'antd'
import { useState } from 'react'
import { postPostCreactedTargetsHooks } from '../../_hooks/postCreactTargets'
import { useAppStore } from '../../_store'
interface CreatedTargetProps {
  onBack: () => void
}

function CreatedTarget({ onBack }: CreatedTargetProps) {
  const { creactedTargets, setCreactedTargets, userInfo } = useAppStore()
  const [targetName, setTargetName] = useState()
  const [targetPoint, setTargetPoint] = useState()
  const [targetDescription, setTargetDescription] = useState()
  const [form] = Form.useForm()
  const { createTarget, loading } = postPostCreactedTargetsHooks()

  const generateUserId = () => {
    const userId = userInfo?.user_id
    return String(userId)
  }
  console.log(creactedTargets)

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
        <Form form={form} layout='vertical'>
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
                />
              </Form.Item>
              <div className='text-gray-400 text-sm text-right'>{}/100</div>
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
                />
              </Form.Item>
              <div className='text-gray-400 text-sm text-right'>{}/200</div>
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
            <Button onClick={onBack} className='w-full'>
              取消
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}
export default CreatedTarget
