import { getUserInfoRequest } from '@/source/home/_api/getUserInfo'
import { useAppStore } from '@/source/home/_store'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

// 凡是以 get or submit 开头，表示请求数据
export function useGetUserInfo() {
  const { data, error, loading, run } = useRequest(getUserInfoRequest, {
    manual: true,
  })

  useEffect(() => {
    if (error) {
      console.error('获取分类数据失败:', error)
    }
  }, [error])

  return { error, loading, data, run }
}

// 使用 hooks - 自动获取用户信息
export function useGetUserInfoHooks() {
  const { run, data, error, loading } = useGetUserInfo()
  const { setUserInfo } = useAppStore()

  useEffect(() => {
    // 调用接口获取用户信息
    run('user001')
  }, [run])

  useEffect(() => {
    if (!error && data) {
      setUserInfo(data)
    }
  }, [error, data, setUserInfo])

  return { loading, error, data }
}
