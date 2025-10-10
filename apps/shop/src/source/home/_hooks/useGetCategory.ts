import { getCategoryRequest } from '@/source/home/_api/get-category'
import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useAppStore } from '@/source/home/_store'

// 凡是以 get or submit 开头，表示请求数据
export function useGetCategory() {
  const { data, error, loading, run } = useRequest(getCategoryRequest, {
    manual: true,
  })

  useEffect(() => {
    if (error) {
      console.error('获取分类数据失败:', error)
    }
  }, [error])

  return { error, loading, data, run }
}

// 使用 hooks - 根据 countNumber 获取 category 数据
export function useGetCategoryHooks() {
  const { run, data, error, loading } = useGetCategory()
  const { setCategories } = useAppStore()

  useEffect(() => {
    run()
  }, [])

  useEffect(() => {
    if (!error && data) {
      setCategories(data)
    }
  }, [error, data, setCategories])

  return { loading, error, data }
}
