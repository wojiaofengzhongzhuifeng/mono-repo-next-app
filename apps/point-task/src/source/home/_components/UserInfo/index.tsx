import { useGetUserInfoHooks } from '@/source/home/_api/getUserInfo'
import { useAppStore } from '../../_store'

function GetUserInfo() {
  const { userInfo } = useAppStore()
  useGetUserInfoHooks()

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
      <div className='text-center text-blue-200'>0个目标，0个待完成任务</div>
    </div>
  )
}
export default GetUserInfo
