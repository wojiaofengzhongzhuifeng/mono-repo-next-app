import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useAppStore } from '@/source/home/_store'
import { getUserInfo } from '@/source/home/_api/get-user-info'

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

// 统一的用户信息管理hook
export function useUserInfoHooks() {
  const { run, data, error } = useGetUserInfo()
  const { userInfo, setUserInfo } = useAppStore()

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
      if (userInfo.nickname !== data.nickname || userInfo.totalPoints !== data.totalPoints) {
        setUserInfo({
          ...userInfo,
          id: userInfo?.id ?? 0,
          nickname: data.nickname,
          totalPoints: data.totalPoints,
        })
      }
    }
  }, [data, error, userInfo, setUserInfo])
}

// 导出默认hook，保持向后兼容
export default useUserInfoHooks
