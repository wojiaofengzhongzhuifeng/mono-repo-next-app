import { getUserInfo } from '@/source/home/_api/get-user-info'
import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useAppStore } from '@/source/home/_store'

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

// 使用 hooks
export function useUserInfoHooks() {
  const { run, data, error } = useGetUserInfo()
  const { setUserInfo, userInfo } = useAppStore()

  useEffect(() => {
    console.log('userInfo changed', userInfo)
    if (userInfo?.user_id && !userInfo.nickname) {
      run(userInfo?.user_id)
    }
  }, [userInfo])

  useEffect(() => {
    if (!error && data && userInfo) {
      setUserInfo({
        ...userInfo,
        id: userInfo?.id ?? 0,
        nickname: data.nickname,
        totalPoints: data.totalPoints,
      })
    }
  }, [data])
}
