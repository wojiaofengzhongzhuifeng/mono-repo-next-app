import axiosInstance from '@mono-repo/utils'
import type { AxiosInstance } from 'axios'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import {
  NumberItem,
  CreateNumberRequest,
  UpdateNumberRequest,
} from '@count-number-types'
import { ApiResponse, STATUS_CODE } from '@mono-repo/utils'

const axios = axiosInstance as unknown as AxiosInstance

/**
 * API 配置
 */
const API_CONFIG = {
  baseUrl: '/api/user/numbers',
  manual: true,
  showError: true,
}

/**
 * 获取 Number 列表
 */
export const getNumbersRequest = async (): Promise<NumberItem[]> => {
  try {
    const res = await axios.get<ApiResponse<NumberItem[]>>(API_CONFIG.baseUrl)

    console.log('getNumbers res', res.data)
    if (res.data.code === STATUS_CODE.SUCCESS && res.data.data) {
      return res.data.data
    } else {
      throw new Error(res.data.message || '获取数据失败：业务错误')
    }
  } catch (error: any) {
    console.error('获取数据失败：', error)
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      '获取数据失败：httpcode 非200'
    throw new Error(errorMessage)
  }
}

/**
 * 获取单个 Number
 */
export const getNumberRequest = async (id: number): Promise<NumberItem> => {
  try {
    const res = await axios.get<ApiResponse<NumberItem>>(
      `${API_CONFIG.baseUrl}/${id}`
    )

    console.log('getNumber res', res.data)
    if (res.data.code === STATUS_CODE.SUCCESS && res.data.data) {
      return res.data.data
    } else {
      throw new Error(res.data.message || '获取数据失败：业务错误')
    }
  } catch (error: any) {
    console.error('获取数据失败：', error)
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      '获取数据失败：httpcode 非200'
    throw new Error(errorMessage)
  }
}

/**
 * 创建 Number
 */
export const createNumberRequest = async (
  data: CreateNumberRequest
): Promise<NumberItem> => {
  try {
    const res = await axios.post<ApiResponse<NumberItem>>(
      API_CONFIG.baseUrl,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('createNumber res', res.data)
    if (res.data.code === STATUS_CODE.SUCCESS && res.data.data) {
      return res.data.data
    } else {
      throw new Error(res.data.message || '创建数据失败：业务错误')
    }
  } catch (error: any) {
    console.error('创建数据失败：', error)
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      '创建数据失败：httpcode 非200'
    throw new Error(errorMessage)
  }
}

/**
 * 更新 Number
 */
export const updateNumberRequest = async (
  id: number,
  data: UpdateNumberRequest
): Promise<NumberItem> => {
  try {
    const res = await axios.put<ApiResponse<NumberItem>>(
      `${API_CONFIG.baseUrl}/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('updateNumber res', res.data)
    if (res.data.code === STATUS_CODE.SUCCESS && res.data.data) {
      return res.data.data
    } else {
      throw new Error(res.data.message || '更新数据失败：业务错误')
    }
  } catch (error: any) {
    console.error('更新数据失败：', error)
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      '更新数据失败：httpcode 非200'
    throw new Error(errorMessage)
  }
}

/**
 * 删除 Number
 */
export const deleteNumberRequest = async (
  id: number
): Promise<{ id: number }> => {
  try {
    const res = await axios.delete<ApiResponse<{ id: number }>>(
      `${API_CONFIG.baseUrl}/${id}`
    )

    console.log('deleteNumber res', res.data)
    if (res.data.code === STATUS_CODE.SUCCESS && res.data.data) {
      return res.data.data
    } else {
      throw new Error(res.data.message || '删除数据失败：业务错误')
    }
  } catch (error: any) {
    console.error('删除数据失败：', error)
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      '删除数据失败：httpcode 非200'
    throw new Error(errorMessage)
  }
}

/**
 * Hooks
 */

// 获取 Number 列表 Hook
export function useGetNumbers({
  manual = API_CONFIG.manual,
  showError = API_CONFIG.showError,
}: {
  manual?: boolean
  showError?: boolean
} = {}) {
  const { data, error, loading, run } = useRequest(getNumbersRequest, {
    manual,
  })

  useEffect(() => {
    if (error && showError) {
      alert('获取数据失败')
    }
  }, [error, showError])

  return { error, loading, data, run }
}

// 获取单个 Number Hook
export function useGetNumber(
  id: number | null,
  {
    manual = API_CONFIG.manual,
    showError = API_CONFIG.showError,
  }: {
    manual?: boolean
    showError?: boolean
  } = {}
) {
  const { data, error, loading, run } = useRequest(
    () => {
      if (!id) {
        throw new Error('ID is required')
      }
      return getNumberRequest(id)
    },
    {
      manual: manual || !id,
      ready: !!id,
    }
  )

  useEffect(() => {
    if (error && showError) {
      alert('获取数据失败')
    }
  }, [error, showError])

  return { error, loading, data, run }
}

// 创建 Number Hook
export function useCreateNumber({
  manual = true,
  showError = API_CONFIG.showError,
  onSuccess,
}: {
  manual?: boolean
  showError?: boolean
  onSuccess?: (data: NumberItem) => void
} = {}) {
  const { data, error, loading, run } = useRequest(createNumberRequest, {
    manual,
  })

  useEffect(() => {
    if (error && showError) {
      alert('创建数据失败')
    }
  }, [error, showError])

  useEffect(() => {
    if (!error && data && onSuccess) {
      onSuccess(data)
    }
  }, [error, data, onSuccess])

  return { error, loading, data, run }
}

// 更新 Number Hook
export function useUpdateNumber({
  manual = true,
  showError = API_CONFIG.showError,
  onSuccess,
}: {
  manual?: boolean
  showError?: boolean
  onSuccess?: (data: NumberItem) => void
} = {}) {
  const { data, error, loading, run } = useRequest(
    ([id, updateData]: [number, UpdateNumberRequest]) =>
      updateNumberRequest(id, updateData),
    {
      manual,
    }
  )

  useEffect(() => {
    if (error && showError) {
      alert('更新数据失败')
    }
  }, [error, showError])

  useEffect(() => {
    if (!error && data && onSuccess) {
      onSuccess(data)
    }
  }, [error, data, onSuccess])

  return { error, loading, data, run }
}

// 删除 Number Hook
export function useDeleteNumber({
  manual = true,
  showError = API_CONFIG.showError,
  onSuccess,
}: {
  manual?: boolean
  showError?: boolean
  onSuccess?: (id: number) => void
} = {}) {
  const { data, error, loading, run } = useRequest(
    (id: number) => deleteNumberRequest(id),
    {
      manual,
    }
  )

  useEffect(() => {
    if (error && showError) {
      alert('删除数据失败')
    }
  }, [error, showError])

  useEffect(() => {
    if (!error && data && onSuccess) {
      onSuccess(data.id)
    }
  }, [error, data, onSuccess])

  return { error, loading, data, run }
}
