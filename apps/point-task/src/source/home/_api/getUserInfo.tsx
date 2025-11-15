import { ApiConfig, prefixUrl } from '@/source/home/_api/common'
import { get, STATUS_CODE } from '@mono-repo/utils'

import { useAppStore } from '@/source/home/_store'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

// 1. 定义请求与响应的数据结构

// 前端所需的数据结构
export interface GetUserInfoResponse {
  id: number //1s
  user_id: string //"user001"
  nickname: string //"测试用户"
  created_at: string //"2025-10-27T12:53:52.160Z"
  totalPoints: number //1500
}

export type GetUserInfoResponseData = GetUserInfoResponse[]

// 后端返回的数据结构
export interface GetUserInfoRequset {
  id: number //1
  user_id: string //"user001"
  nickname: string //"测试用户"
  created_at: string //"2025-10-27T12:53:52.160Z"
  totalPoints: number //1500
}

// 2. 配置请求代码
export const apiConfig: ApiConfig = {
  url: `${prefixUrl}/users`,
  method: 'GET',
  manual: false,
  showError: true,
}

// 3. 请求代码 + 通用逻辑 + 错误处理
export const getUserInfoRequest = async (
  userId: string
): Promise<GetUserInfoRequset> => {
  try {
    const res = await get<GetUserInfoRequset>({
      url: `${apiConfig.url}/${userId}`,
    })
    if (res.code === STATUS_CODE.SUCCESS) {
      if (!res.data) {
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
