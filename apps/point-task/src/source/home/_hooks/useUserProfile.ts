import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useAppStore } from '@/source/home/_store'
import { getUserInfo } from '@/source/home/_api/getUserProfile'

export function useGetUserInfo() {
  const { data, error, loading, run } = useRequest(getUserInfo, {
    manual: true,
  })

  useEffect(() => {
    console.log('error changed', error)
    if (error) {
      alert(error)
    }
  }, [error])

  return { error, loading, data, run }
}

// 更新用户积分的API调用函数
// 注意：现在积分更新是通过完成任务API (/api/tasks/complete-batch) 自动处理的
// 这个函数现在只用于本地状态同步
const updateUserPointsToDB = async (userId: string, points: number) => {
  try {
    // 积分现在通过完成任务API自动更新，这里只需要返回成功
    console.log(`用户 ${userId} 的积分已更新为: ${points}`)
    return { user_id: userId, totalPoints: points }
  } catch (error) {
    console.error('更新用户积分失败：', error)
    throw new Error('更新用户积分失败')
  }
}

// 统一的用户信息管理hook
export function useUserInfoHooks() {
  const { run, data, error } = useGetUserInfo()
  const { userInfo, setUserInfo, updateUserPoints } = useAppStore()

  // 初始化用户信息
  useEffect(() => {
    if (!userInfo) {
      setUserInfo({
        user_id: 'user001',
        nickname: '',
        created_at: '',
        id: 0,
        totalPoints: 0,
      })
    }
  }, [userInfo, setUserInfo])

  // 获取用户详细信息
  useEffect(() => {
    if (userInfo?.user_id && !userInfo.nickname) {
      run(userInfo?.user_id)
    }
  }, [userInfo, run])

  // 更新用户信息
  useEffect(() => {
    if (!error && data && userInfo) {
      // 检查是否真的需要更新，避免无限循环
      // 如果当前积分是0（初始化状态），则使用数据库返回的积分
      // 否则保持当前的积分值（避免覆盖用户在当前会话中获得的积分）
      const shouldUseDbPoints = userInfo.totalPoints === 0

      if (userInfo.nickname !== data.nickname || shouldUseDbPoints) {
        setUserInfo({
          ...userInfo,
          id: data.id || userInfo?.id || 0,
          nickname: data.nickname,
          created_at: data.created_at || userInfo.created_at,
          // 如果当前积分是0，使用数据库的积分；否则保持当前积分
          totalPoints: shouldUseDbPoints
            ? data.totalPoints
            : userInfo.totalPoints,
        })
      }
    }
  }, [data, error, userInfo, setUserInfo])

  // 更新用户积分到本地状态
  const updateUserInfoWithPoints = async (userNewPoints: number) => {
    if (!userInfo?.user_id) {
      console.error('用户信息不存在，无法更新积分')
      return
    }

    try {
      // 更新本地状态
      updateUserPoints(userNewPoints)

      // 同步到用户信息状态
      setUserInfo({
        ...userInfo,
        totalPoints: userNewPoints,
      } as any)

      console.log(`用户 ${userInfo.user_id} 积分已更新为: ${userNewPoints}`)
      return { user_id: userInfo.user_id, totalPoints: userNewPoints }
    } catch (error) {
      console.error('更新用户积分失败:', error)
      throw error
    }
  }

  return { updateUserInfoWithPoints }
}

// 导出默认hook，保持向后兼容
export default useUserInfoHooks
