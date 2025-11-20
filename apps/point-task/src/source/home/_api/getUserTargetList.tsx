import { ApiConfig, prefixUrl } from '@/source/home/_api/common'
import { get, STATUS_CODE } from '@mono-repo/utils'

import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useAppStore } from '../_store'

// 1. 定义请求与响应的数据结构

// 前端所需的数据结构
export interface GetUserTargetListResponse {
  id: number //1
  name: string //'iPhone 15'
  description: null //null
  need_point: number //5000
  user_id: string //'user001'
  is_redeemed: boolean //true
  created_at: string //'2025-10-27T12:53:52.167Z'
  user: {
    nickname: string //'测试用户'
  }
}

export type GetUserTargetListResponseData = GetUserTargetListResponse[]

// 后端返回的数据结构
export interface GetUserTargetListRequset {
  id: number //1
  name: string //'iPhone 15'
  description: null //null
  need_point: number //5000
  user_id: string //'user001'
  is_redeemed: boolean //true
  created_at: string //'2025-10-27T12:53:52.167Z'
  user: { nickname: string }
}

// 2. 配置请求代码
export const apiConfig: ApiConfig = {
  url: `${prefixUrl}/targets`,
  method: 'GET',
  manual: false,
  showError: true,
}

// 3. 请求代码 + 通用逻辑 + 错误处理
export const getUserTargetListRequest = async (
  userId: string
): Promise<GetUserTargetListRequset[]> => {
  try {
    const res = await get<GetUserTargetListRequset[]>({
      url: `${apiConfig.url}?user_id=${userId}`,
    })
    if (res.code === STATUS_CODE.SUCCESS) {
      if (!res.data || !Array.isArray(res.data)) {
        throw new Error('获取用户信息失败：返回数据为空')
      }
      return res.data
    } else {
      throw new Error(res.message || '获取用户信息失败')
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    throw new Error('获取用户信息失败')
  }
}

// 凡是以 get or submit 开头，表示请求数据
export function useGetUserTargetList() {
  const { data, error, loading, run } = useRequest(getUserTargetListRequest, {
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
export function useGetUserTargetListHooks() {
  const { run, data, error, loading } = useGetUserTargetList()
  const { setGetUserTargetList } = useAppStore()

  useEffect(() => {
    // 调用接口获取用户信息
    run('user001')
  }, [run])

  useEffect(() => {
    if (!error && data) {
      setGetUserTargetList(data)
    }
  }, [error, data])

  return { loading, error, data, setGetUserTargetList }
}
