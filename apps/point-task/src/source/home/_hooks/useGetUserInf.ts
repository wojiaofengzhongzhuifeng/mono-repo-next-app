import { getUserInfo } from '@/source/home/_api/get-user-info'
import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useAppStore } from '@/source/home/_store'

export function useGetUserInfo() {
  const { data, error, loading, run } = useRequest(getUserInfo, {
    manual: true,
  })

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  return { error, loading, data, run }
}

// 使用 hooks
export function useUserInfoHooks() {
  const { run, data, error } = useGetUserInfo()
  const { setUserInfo, userInfo } = useAppStore()

  useEffect(() => {
    console.log('userInfo changed', userInfo)
    if (userInfo.userId) {
      run(userInfo.userId)
    }
  }, [userInfo])

  useEffect(() => {
    if (!error && data) {
      setUserInfo({
        ...userInfo,
        nickname: data.nickname,
        totalPoints: data.totalPoints,
      })
    }
  }, [data])
}
