import React, { use } from 'react'
import { useAppStore } from '../../_store'

function DashboardHeader() {
  const { userInfo } = useAppStore()
  console.log('userInfo in Banner', userInfo)
  return (
    <div className=' flex justify-center items-center mb-6'>
      <div className='flex justify-center items-center h-[45vh] w-[90vh] bg-blue-700/100 text-white px-4 rounded-lg mb-6'>
        <div className='text-center'>
          <h1 className='text-2xl  mb-4'>积分目标管理系统</h1>
          <div className='mt-5'>我的积分</div>
          <div className='text-5xl  mt-3'>{userInfo?.totalPoints ?? 0}</div>
          {/* todo */}
          <div className='mt-3'>
            {userInfo?.created_at || 0}个目标,{userInfo?.created_at || 0}
            个待完成任务
          </div>
        </div>
      </div>
    </div>
  )
}
export default DashboardHeader
