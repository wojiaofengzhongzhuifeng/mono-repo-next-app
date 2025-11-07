import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useAppStore } from '@/source/home/_store'
import { getUserInfo } from '@/source/home/_api/getUserProfile'
import { post } from '@mono-repo/utils'

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
const updateUserPointsToDB = async (userId: string, points: number) => {
  try {
    const url = `/api/users/${userId}`
    const res = await post({
      url: url,
      data: {
        user_id: userId,
        totalPoints: points,
      },
    })

    if (res.code === 0) {
      return res.data
    } else {
      throw new Error('更新用户积分失败： 业务错误')
    }
  } catch (error) {
    console.error('更新用户积分失败：', error)
    throw new Error('更新用户积分失败： httpcode 非200')
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

  // 更新用户积分到数据库
  const updateUserInfoWithPoints = async (userNewPoints: number) => {
    if (!userInfo?.user_id) {
      console.error('用户信息不存在，无法更新积分')
      return
    }

    try {
      // 先更新本地状态
      updateUserPoints(userNewPoints)

      // 然后更新到数据库
      const result = await updateUserPointsToDB(userInfo.user_id, userNewPoints)

      // 更新本地状态以保持同步
      setUserInfo({
        ...userInfo,
        totalPoints: userNewPoints,
      } as any)

      return result
    } catch (error) {
      console.error('更新用户积分失败:', error)
      // 如果数据库更新失败，回滚本地状态
      if (userInfo) {
        updateUserPoints(userInfo.totalPoints)
      }
      throw error
    }
  }

  return { updateUserInfoWithPoints }
}

// 导出默认hook，保持向后兼容
export default useUserInfoHooks
