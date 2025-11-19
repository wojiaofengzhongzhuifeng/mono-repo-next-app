import { ApiConfig, prefixUrl } from '@/source/home/_api/common'
import { get, STATUS_CODE } from '@mono-repo/utils'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

// 1. 定义请求与响应的数据结构

// 获取用户积分的请求数据结构
export interface UpdateUserPointsRequest {
  userId: string
}

// 后端返回的数据结构
export interface UpdateUserPointsResponse {
  points: number
}

// 2. 配置请求代码
export const apiConfig: ApiConfig = {
  url: `${prefixUrl}/points`,
  method: 'GET',
  manual: false,
  showError: true,
}

// 3. 请求代码 + 通用逻辑 + 错误处理
export const updateUserPointsRequest = async (
  userId: string
): Promise<UpdateUserPointsResponse> => {
  try {
    const res = await get<UpdateUserPointsResponse>({
      url: `${apiConfig.url}/${userId}`,
    })
    if (res.code === STATUS_CODE.SUCCESS) {
      if (!res.data) {
        throw new Error('获取用户积分失败：返回数据为空')
      }
      return res.data
    } else {
      throw new Error(res.message || '获取用户积分失败')
    }
  } catch (error) {
    console.error('获取用户积分失败:', error)
    throw new Error('获取用户积分失败')
  }
}

// 凡是以 get or submit 开头，表示请求数据
export function useUpdateUserPoints() {
  const { data, error, loading, run } = useRequest(updateUserPointsRequest, {
    manual: true,
  })

  useEffect(() => {
    if (error) {
      console.error('获取用户积分失败:', error)
    }
  }, [error])

  return { error, loading, data, run }
}
