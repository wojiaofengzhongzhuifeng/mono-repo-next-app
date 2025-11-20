import { useGetUserInfoHooks } from '@/source/home/_api/getUserInfo'
import { useAppStore } from '../../_store'

function GetUserInfo() {
  const { userInfo } = useAppStore()
  useGetUserInfoHooks()
  const { getUserTasksList } = useAppStore()

  const pendingTasksCount = getUserTasksList.filter(
    item => !item.is_completed
  ).length

  console.log('pendingTasksCount', pendingTasksCount)
  return (
    <div className='bg-blue-700 text-white p-6 w-2/5 mx-auto rounded-lg shadow-lg'>
      {/* head */}
      <div className='text-center text-xl font-bold mb-4'>积分目标管理系统</div>

      {/* body */}
      <div className='text-center mb-2'>我的积分</div>
      <div className='text-center text-2xl font-bold mb-4'>
        {userInfo?.totalPoints ?? '加载中...'}
      </div>

      {/* todo 等待task和target完成*/}
      <div className='text-center text-blue-200'>
        {}个目标，{pendingTasksCount ? pendingTasksCount : 0}个待完成任务
      </div>
    </div>
  )
}
export default GetUserInfo
