import { CreateNumberRequest, NumberItem } from '@count-number-types'
import { post, STATUS_CODE } from '@mono-repo/utils'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useAppStore } from '@/source/home/_store'

// 1. 定义请求与响应的数据结构
export type CreateNumberRequestData = CreateNumberRequest
export type CreateNumberResponseData = NumberItem

// 2. 配置请求代码
const API_CONFIG = {
  url: '/api/user/numbers',
  method: 'POST',
  manual: true,
  showError: true,
}

export const createNumberRequest = async (
  data: CreateNumberRequestData
): Promise<CreateNumberResponseData> => {
  try {
    const res = await post<CreateNumberResponseData>({
      url: API_CONFIG.url,
      data,
    })
    if (res.code === STATUS_CODE.SUCCESS) {
      return res.data
    } else {
      throw new Error(res.message || '创建数据失败')
    }
  } catch (error) {
    console.error('createNumberRequest error', error)
    throw error
  }
}

export function useCreateNumber(params?: {
  manual?: boolean
  showError?: boolean
}) {
  const { data, error, loading, run } = useRequest(createNumberRequest, {
    manual: params?.manual ?? true,
  })

  const { setNumbers, numbers } = useAppStore()

  useEffect(() => {
    if (error && params?.showError) {
      alert('创建数据失败')
    }
  }, [error, params?.showError])

  return { data, error, loading, run }

  useEffect(() => {
    if (!error && data) {
      setNumbers([...numbers, data])
    }
  }, [error, data, numbers])

  useEffect(() => {
    setCreateNumberLoading(loading)
  }, [loading])
  return { data, error, loading, run }
}
