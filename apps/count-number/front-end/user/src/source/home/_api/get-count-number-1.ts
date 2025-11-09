import { NumberItem } from '@count-number-types'
import { ApiResponse, get, STATUS_CODE } from '@mono-repo/utils'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useAppStore } from '@/source/home/_store'

// 1. 定义请求与响应的数据结构
export type GetCountNumberResponseData = NumberItem[]

// 2. 配置请求代码
const API_CONFIG = {
  url: '/api/user/numbers',
  method: 'GET',
  manual: false,
  showError: true,
}

// 3. 请求代码 + 通用逻辑 + 错误处理
export const getNumbersRequest =
  async (): Promise<GetCountNumberResponseData> => {
    try {
      console.log('getNumbersRequest')
      const res = await get<GetCountNumberResponseData>({
        url: API_CONFIG.url,
      })
      if (res.code === STATUS_CODE.SUCCESS) {
        return res.data || []
      } else {
        throw new Error(res.message || '获取数据失败')
      }
    } catch (error) {
      console.error('获取数据失败:', error)
      throw new Error('获取数据失败')
    }
  }
export function useGetNumbers(params?: {
  manual?: boolean
  showError?: boolean
}) {
  const manual = params?.manual ?? API_CONFIG.manual
  const showError = params?.showError ?? API_CONFIG.showError
  const { data, error, loading, run } = useRequest(getNumbersRequest, {
    manual,
  })
  const { setNumbers } = useAppStore()

  useEffect(() => {
    if (error && showError) {
      alert('获取数据失败')
    }
  }, [error, showError])

  useEffect(() => {
    if (!error && data) {
      setNumbers(data || [])
    }
  }, [error, data])

  return { data, error, loading, run }
}
