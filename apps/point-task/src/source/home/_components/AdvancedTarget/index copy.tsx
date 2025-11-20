import { useGetUserTargetListHooks } from '@/source/home/_api/getUserTargetList'
import { useAppStore } from '@/source/home/_store'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

interface AdvancedTargetProps {
  onBack: () => void
}

function AdvancedTarget({ onBack }: AdvancedTargetProps) {
  const { getUserTargetList } = useAppStore()
  const { loading } = useGetUserTargetListHooks()

  console.log('getUserTargetList', getUserTargetList)

  return (
    <>
      <div className='bg-white-200 p-6 w-2/5 mx-auto rounded-lg shadow-lg mt-4'>
        {/* head */}
        <div className='flex items-center mb-4'>
          <ArrowLeftOutlined className='text-2xl mr-2' onClick={onBack} />
          <div>兑换目标</div>
        </div>

        {/* body */}
        <div className='mt-4'>
          {loading ? (
            <div className='flex justify-center items-center min-h-[20vh]'>
              <Spin size='large' />
            </div>
          ) : getUserTargetList.length === 0 ? (
            <div className='flex justify-center items-center min-h-[20vh] border border-gray-200 rounded-lg'>
              <div className='text-gray-400'>暂无目标数据</div>
            </div>
          ) : (
            <div>
              {getUserTargetList.map(target => (
                <div key={target.id} className='border-2 mb-2 rounded-2xl p-4'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <div className='font-medium text-base'>{target.name}</div>
                      {target.description && (
                        <div className='text-sm text-gray-500 mt-1'>
                          {target.description}
                        </div>
                      )}
                      <div className='mt-2 text-sm text-gray-600'>
                        需要积分: {target.need_point}
                      </div>
                    </div>
                    <div className='text-sm'>
                      {target.is_redeemed ? (
                        <span className='text-green-500'>已兑换</span>
                      ) : (
                        <span className='text-orange-500'>未兑换</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AdvancedTarget
