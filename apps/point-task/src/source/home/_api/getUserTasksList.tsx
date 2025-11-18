import { ApiConfig, prefixUrl } from '@/source/home/_api/common'
import { get, STATUS_CODE } from '@mono-repo/utils'

import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useAppStore } from '../_store'

// 1. 定义请求与响应的数据结构

// 前端所需的数据结构
export interface GetUserTasksListResponse {
  id: number //3
  name: string //'完成作业'
  create_point: number //10
  task_type: string //'study'
  is_repeatable: boolean //false
  is_completed: boolean //true
  completed_at: string //'2025-10-29T01:52:37.770Z'
  user_id: string //'test_user_001'
  created_at: string //'2025-10-29T01:52:37.762Z'
  user: {
    nickname: 'user_001' //'测试用户'
  }
}

export type GetUserTasksListResponseData = GetUserTasksListResponse[]

// 后端返回的数据结构
export interface GetUserTasksListRequset {
  id: number //3
  name: string //'完成作业'
  create_point: number //10
  task_type: string //'study'
  is_repeatable: boolean //false
  is_completed: boolean //true
  completed_at: string //'2025-10-29T01:52:37.770Z'
  user_id: string //'test_user_001'
  created_at: string //'2025-10-29T01:52:37.762Z'
  user: {
    nickname: 'user_001' //'测试用户'
  }
}

// 2. 配置请求代码
export const apiConfig: ApiConfig = {
  url: `${prefixUrl}/tasks`,
  method: 'GET',
  manual: false,
  showError: true,
}

// 3. 请求代码 + 通用逻辑 + 错误处理
export const getUserTasksListRequest = async (
  userId: string
): Promise<GetUserTasksListRequset[]> => {
  try {
    const res = await get<GetUserTasksListRequset[]>({
      url: `${apiConfig.url}/${userId}`,
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
export function useGetUserTasksList() {
  const { data, error, loading, run } = useRequest(getUserTasksListRequest, {
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
export function useGetUserTasksListHooks() {
  const { run, data, error, loading } = useGetUserTasksList()
  const { setGetUserTasksList } = useAppStore()

  useEffect(() => {
    // 调用接口获取用户信息
    run('user001')
  }, [run])

  useEffect(() => {
    if (!error && data) {
      setGetUserTasksList(data)
    }
  }, [error, data])

  return { loading, error, data, setGetUserTasksList }
}
