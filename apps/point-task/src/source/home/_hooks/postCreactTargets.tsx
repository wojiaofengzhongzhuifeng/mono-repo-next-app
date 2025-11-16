import { useAppStore } from '@/source/home/_store'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { postUserCreactedTargetsRequest } from '../_api/postUserTarget'

// 凡是以 get or submit 开头，表示请求数据, post 开头表示发送数据
export function postPostCreactedTargets() {
  const { data, error, loading, run } = useRequest(
    postUserCreactedTargetsRequest,
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (error) {
      console.error('获取分类数据失败:', error)
    }
  }, [error])

  return { error, loading, data, run }
}

// 使用 hooks - 自动获取用户信息
export function postPostCreactedTargetsHooks() {
  const { run, data, error, loading } = postPostCreactedTargets()
  const { setCreactedTargets } = useAppStore()

  useEffect(() => {
    // 调用接口获取用户信息
    run()
  }, [run])

  useEffect(() => {
    if (!error && data) {
      setCreactedTargets(data)
    }
  }, [error, data, setCreactedTargets])

  return { loading, error, data }
}
