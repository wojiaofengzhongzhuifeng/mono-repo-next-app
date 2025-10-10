import { getBannerRequest } from '@/source/home/_api/get-banner'
import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useAppStore } from '@/source/home/_store'

// 凡是以 get or submit 开头，表示请求数据
export function useGetBanner() {
  const { data, error, loading, run } = useRequest(getBannerRequest, {
    manual: true,
  })

  useEffect(() => {
    if (error) {
      console.error('获取Banner数据失败:', error)
    }
  }, [error])

  return { error, loading, data, run }
}

// 使用 hooks - 获取 banner 数据
export function useGetBannerHooks() {
  const { run, data, error, loading } = useGetBanner()
  const { setBanners } = useAppStore()

  useEffect(() => {
    run()
  }, [])
  useEffect(() => {
    if (!error && data) {
      setBanners(data)
    }
  }, [error, data, setBanners])

  return { loading, error, data }
}
