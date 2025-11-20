import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Progress, Spin } from 'antd'
import { useState } from 'react'
import { GetUserInfoResponse } from '../../_api/getUserInfo'
import {
  GetUserTargetListResponse,
  useGetUserTargetListHooks,
} from '../../_api/getUserTargetList'
import { useAppStore } from '../../_store'

interface GetUserTargetListProps {
  onBack: () => void
}

function GetUserTargetList({ onBack }: GetUserTargetListProps) {
  const { getUserTargetList } = useAppStore()
  const { loading } = useGetUserTargetListHooks()
  const { userInfo } = useAppStore()
  const [advancedTargets, setAdvancedTargets] = useState('')
  console.log('getUserTargetList', getUserTargetList)
  console.log('userInfo', userInfo)

  //管理目标状态

  //计算进度百分比
  const calculateProgress = (
    target: GetUserTargetListResponse,
    userInfo: GetUserInfoResponse | null
  ) => {
    return ((userInfo?.totalPoints ?? 0) / target.need_point) * 100
  }
  //格式化时间
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString()
  }
  return (
    <>
      <div className='bg-white-200 p-6 w-2/5 mx-auto rounded-lg shadow-lg mt-4'>
        {/* head */}
        <div className='flex items-center mb-4'>
          <ArrowLeftOutlined className='text-2xl mr-2' onClick={onBack} />
          <div>兑换目标</div>
        </div>

        {/* body */}
        <div>
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
                    <div className='font-medium text-base'>{target.name}</div>
                  </div>
                  {/* 目标状态 */}
                  <div>
                    {target.is_redeemed ? (
                      <span className='text-white bg-green-500 border border-green-500 rounded-full px-2 py-0.5 text-xs'>
                        已兑换
                      </span>
                    ) : (
                      <span className='text-white bg-gray-500 border border-gray-500 rounded-full px-2 py-0.5 text-xs'>
                        未兑换
                      </span>
                    )}
                  </div>

                  {/* 目标描述 */}
                  <div className='text-sm text-gray-500 mt-4 mb-4'>
                    {target.description || ''}
                  </div>
                  {/* 进度状态 */}
                  <div>
                    <div className='flex justify-between items-center'>
                      <div>进度</div>{' '}
                      <div className='text-sm text-gray-500 mt-2'>
                        {userInfo?.totalPoints}/{target.need_point}
                      </div>
                    </div>
                    <Progress
                      percent={calculateProgress(target, userInfo)}
                      strokeColor={target.is_redeemed ? '#52c41a' : '#1890ff'}
                      showInfo={false}
                    />
                  </div>

                  {/* 分割线 */}
                  <div className='border-t border-gray-200 my-4'></div>

                  {/* 操作 和时间*/}
                  <div className='flex justify-between items-center'>
                    <div className='text-sm text-gray-500 mt-2'>
                      创建于{formatDate(target.created_at)}
                    </div>
                    <div>
                      <Button type='primary'>立即兑换</Button>
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

export default GetUserTargetList
