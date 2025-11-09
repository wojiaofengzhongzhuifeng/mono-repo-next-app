import { useAppStore } from '@/source/home/_store'
import { get } from '@mono-repo/utils'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

/**
 * 0. 定义请求与响应的数据结构
 */

// 接口返回数据
export type GetCountNumberResponseData = {
  number: number
  id: number
  testList: number[]
}

/**
 * 1. 配置请求代码
 */
const API_CONFIG = {
  url: '/api/get-count',
  method: 'GET',
  manual: true,
  showError: true,
}

/**
 * 2. 请求代码 + 通用逻辑 + 错误处理
 */
export const getCountNumberRequest =
  async (): Promise<GetCountNumberResponseData> => {
    try {
      const res = await get<GetCountNumberResponseData>({
        url: API_CONFIG.url,
      })

      console.log('res', res)
      if (res.code === 200) {
        // 正常获取数据
        return res.data
      } else {
        throw new Error('获取数据失败： 业务错误')
      }
    } catch (error) {
      console.error('获取数据失败：', error)
      // 获取数据失败： httpcode 非200
      throw new Error('获取数据失败： httpcode 非200')
    }
  }

// 凡是以 get or submit 开头，表示请求数据
export function useGetCountNumber({
  manual = API_CONFIG.manual,
  showError = API_CONFIG.showError,
}: {
  manual?: boolean
  showError?: boolean
}) {
  const { data, error, loading, run } = useRequest(getCountNumberRequest, {
    manual,
  })
  const { setCountNumber } = useAppStore()

  useEffect(() => {
    if (error && showError) {
      alert('获取数据失败')
    }
  }, [error, showError])

  useEffect(() => {
    if (!error && data) {
      setCountNumber(data.number)
    }
  }, [error, data])
  return { error, loading, data, run }
}
