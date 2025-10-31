import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useAppStore } from '@/source/home/_store'
import { getUserTargets } from '../_api/get-user-targets'

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
  const { userTargets, setUserTargets } = useAppStore()

  useEffect(() => {
    if (userTargets && userTargets.length > 0) {
      const userId = userTargets[0]?.user_id || 'user001'
      run(userId)
    }
  }, [userTargets, run])

  useEffect(() => {
    if (!error && data) {
      setUserTargets([data])
    }
  }, [data, error, setUserTargets])
}
