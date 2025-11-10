import useUserInfoHooks from '../../_hooks/useUserProfile'
import { useAppStore } from '../../_store'
function DashboardHeader() {
  const { userInfo, userTargets, userAddTask } = useAppStore()
  const { updateUserInfoWithPoints } = useUserInfoHooks()

  // 计算待完成任务数量
  const pendingTasksCount = Array.isArray(userAddTask)
    ? userAddTask.filter(task => (task as any).status !== 'completed').length
    : 0

  return (
    <div className='flex justify-center items-center mb-6'>
      <div className='flex justify-center items-center h-[45vh] w-[90vh] bg-blue-700 text-white px-4 rounded-lg mb-6'>
        <div className='text-center'>
          <h1 className='text-2xl mb-4'>积分目标管理系统</h1>
          <div className='mt-5'>我的积分</div>
          <div className='text-5xl mt-3 font-bold'>
            {userInfo?.totalPoints ?? 0}
          </div>
          <div className='mt-3 text-sm'>
            {userTargets?.length || 0}个目标,
            {pendingTasksCount}
            个待完成任务
          </div>
        </div>
      </div>
    </div>
  )
}
export default DashboardHeader
