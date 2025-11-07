import { get } from '@mono-repo/utils'
import { GET_COUNT_NUMBER } from '@/source/home/_api/mock'
import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useAppStore } from '@/source/home/_store'

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
  useMock: true,
  mockData: GET_COUNT_NUMBER,
}

/**
 * 2. 请求代码 + 通用逻辑 + 错误处理
 */
export const getCountNumberRequest =
  async (): Promise<GetCountNumberResponseData> => {
    try {
      if (API_CONFIG.useMock) {
        const res = API_CONFIG.mockData
        if (res.code === 200) {
          // 正常获取数据
          return res.data
        } else {
          throw new Error('获取数据失败： 业务错误')
        }
      }

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
export function useGetCountNumber() {
  const { data, error, loading, run } = useRequest(getCountNumberRequest, {
    manual: true,
  })

  useEffect(() => {
    if (error) {
    }
  }, [error])

  return { error, loading, data, run }
}

// 使用 hooks
export function useGetCountNumberHooks() {
  const { run, data, error } = useGetCountNumber()
  const { setCountNumber } = useAppStore()

  useEffect(() => {
    run()
  }, [])

  useEffect(() => {
    if (!error && data) {
      setCountNumber(data.number)
    }
  }, [error, data])
}
