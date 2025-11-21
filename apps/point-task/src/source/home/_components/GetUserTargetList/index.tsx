import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import { Button, Progress, Spin } from 'antd'
import { useState } from 'react'
import { GetUserInfoResponse } from '../../_api/getUserInfo'
import {
  GetUserTargetListResponse,
  useGetUserTargetListHooks,
} from '../../_api/getUserTargetList'
import { usePostAchieveTarget } from '../../_hooks/postAchieveTarget'
import { useAppStore } from '../../_store'

interface GetUserTargetListProps {
  onBack: () => void
}

function GetUserTargetList({ onBack }: GetUserTargetListProps) {
  const { getUserTargetList } = useAppStore()
  const { loading } = useGetUserTargetListHooks()
  const { userInfo } = useAppStore()
  const [advancedTargets, setAdvancedTargets] = useState('')
  const { setAchieveTarget } = useAppStore()
  const { achieveTarget } = usePostAchieveTarget()
  console.log('getUserTargetList', getUserTargetList)
  console.log('userInfo', userInfo)

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
  //兑换目标
  const handleAchieveTarget = (targetId: number, needPoints: number) => {
    achieveTarget(targetId, needPoints)
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
                    {target.is_redeemed ? (
                      <CheckCircleOutlined className='text-green-500' />
                    ) : (
                      <ClockCircleOutlined className='text-gray-500' />
                    )}
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
                      {target.is_redeemed &&
                      userInfo?.totalPoints &&
                      userInfo?.totalPoints > target.need_point ? (
                        <div className='text-sm text-green-500 mt-2'>
                          {userInfo?.totalPoints}/{target.need_point}
                        </div>
                      ) : (
                        <div className='text-sm text-gray-500 mt-2'>
                          {userInfo?.totalPoints}/{target.need_point}
                        </div>
                      )}
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
                      <Button
                        type='primary'
                        onClick={() =>
                          handleAchieveTarget(target.id, target.need_point)
                        }
                        disabled={
                          target.is_redeemed ||
                          (userInfo?.totalPoints ?? 0) < target.need_point
                        }
                      >
                        {target.is_redeemed
                          ? '已兑换'
                          : (userInfo?.totalPoints ?? 0) < target.need_point
                            ? '积分不足'
                            : '立即兑换'}
                      </Button>
                    </div>
                  </div>

                  {/* 提示积分差 */}
                  {target.is_redeemed &&
                    userInfo?.totalPoints &&
                    userInfo?.totalPoints < target.need_point && (
                      <div className='text-blue-600  border border-bule-500 rounded-lg  py-2 mt-5 text-xs bg-blue-100 px-4'>
                        积分差{target.need_point - userInfo?.totalPoints}
                      </div>
                    )}
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
