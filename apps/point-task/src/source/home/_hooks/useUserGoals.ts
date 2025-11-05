import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useAppStore } from '@/source/home/_store'
import { getUserTargets } from '../_api/getUserGoals'

export function useGetUserTargets() {
  const { data, error, loading, run } = useRequest(getUserTargets, {
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

export function useUserTargetsHooks() {
  const { run, data, error } = useGetUserTargets()
  const { userTargets, setUserTargets, userInfo } = useAppStore()

  // 初始化用户目标数据

  useEffect(() => {
    if (userInfo?.user_id && !userTargets) {
      run(userInfo.user_id)
    }
  }, [run, userInfo, userTargets])

  useEffect(() => {
    if (!error && data) {
      setUserTargets([data])
    }
  }, [data, error, setUserTargets])
}
