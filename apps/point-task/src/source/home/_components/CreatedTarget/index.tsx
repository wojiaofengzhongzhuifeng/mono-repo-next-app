import { LeftOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber } from 'antd'
import { postPostCreactedTargetsHooks } from '../../_hooks/postCreactTargets'
import { useAppStore } from '../../_store'
interface CreatedTargetProps {
  onBack: () => void
}

function CreatedTarget({ onBack }: CreatedTargetProps) {
  const { creactedTargets, setCreactedTargets } = useAppStore()
  postPostCreactedTargetsHooks()
  console.log('creactedTargets', creactedTargets)

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
        <div>
          {/* 目标名称 */}
          <div>
            <div>
              <div className='flex mb-2'>
                目标名称<div className='text-red-500 mx-1'>*</div>
              </div>
              <Form.Item
                name='TextArea'
                rules={[{ required: true, message: 'Please input!' }]}
              >
                <Input.TextArea
                  placeholder='请输入目标名称'
                  className='bg-gray-200'
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
                name='InputNumber'
                rules={[{ required: true, message: 'Please input!' }]}
              >
                <InputNumber
                  className='bg-gray-200 w-full'
                  type='number'
                  placeholder='输入需要的积分数量'
                  parser={value => {
                    // 移除非数字字符，只保留数字（不允许小数点）
                    if (!value) return ''
                    return value.replace(/[^\d]/g, '')
                  }}
                  onKeyPress={e => {
                    // 阻止输入 e, E, +, -, . 等非数字字符
                    const char = String.fromCharCode(e.which)
                    if (!/[0-9]/.test(char)) {
                      e.preventDefault()
                    }
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
                name='TextArea'
                rules={[{ required: true, message: 'Please input!' }]}
              >
                <Input.TextArea
                  placeholder='详细描述你的目标...'
                  className='bg-gray-200'
                />
              </Form.Item>
              <div className='text-gray-400 text-sm text-right'>{}/200</div>
            </div>
          </div>
          {/* button */}
          <div>
            <Button type='primary' className='w-full mt-8 mb-2 h-10'>
              创建目标
            </Button>
            <Button>取消</Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default CreatedTarget
