import React from 'react'
import { useAppStore } from '../../_store'

function Targets() {
  const { userTargets, setUserTargets } = useAppStore()
  console.log('userTargets', userTargets)

  return (
    <div className='targets-container'>
      <h2 className='text-xl font-bold mb-4'>用户目标列表</h2>

      {userTargets && userTargets.length > 0 ? (
        <div className='space-y-4'>
          {userTargets.map((target, index) => (
            <div
              key={target.id || index}
              className='border rounded-lg p-4 bg-white shadow-sm'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <h3 className='font-semibold text-lg'>
                    {target.name || '未命名目标'}
                  </h3>
                  <p className='text-gray-600'>ID: {target.id}</p>
                  <p className='text-gray-600'>用户ID: {target.user_id}</p>
                </div>
                <div>
                  <p className='text-gray-600'>描述: {target.description}</p>
                  <p className='text-gray-600'>
                    需要积分: {target.need_points}
                  </p>
                  <p className='text-gray-600'>
                    状态: {target.is_redeemed ? '已兑换' : '未兑换'}
                  </p>
                </div>
              </div>
              <div className='mt-2 text-sm text-gray-500'>
                <p>创建时间: {target.created_at}</p>
                {target.user && <p>用户昵称: {target.user.nickname}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-8 text-gray-500'>
          <p>暂无用户目标数据</p>
        </div>
      )}
    </div>
  )
}
export default Targets
