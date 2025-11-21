import { ApiConfig, prefixUrl } from '@/source/home/_api/common'
import { get, STATUS_CODE } from '@mono-repo/utils'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useAppStore } from '../_store'

// 1. 定义请求与响应的数据结构

// 目标数据结构（前后端一致，无需转换）
export interface GetUserTargetListItem {
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
): Promise<GetUserTargetListItem[]> => {
  try {
    const res = await get<GetUserTargetListItem[]>({
      url: `${apiConfig.url}?user_id=${userId}`,
    })
    if (res.code === STATUS_CODE.SUCCESS) {
      if (!res.data || !Array.isArray(res.data)) {
        throw new Error('获取目标列表失败：返回数据为空')
      }
      return res.data
    } else {
      throw new Error(res.message || '获取目标列表失败')
    }
  } catch (error) {
    console.error('获取目标列表失败:', error)
    throw new Error('获取目标列表失败')
  }
}

// 凡是以 get or submit 开头，表示请求数据
export function useGetUserTargetList() {
  const { data, error, loading, run } = useRequest(getUserTargetListRequest, {
    manual: true,
  })

  useEffect(() => {
    if (error) {
      console.error('获取目标列表失败:', error)
    }
  }, [error])

  return { error, loading, data, run }
}

// 使用 hooks - 自动获取目标列表
export function useGetUserTargetListHooks() {
  const { run, data, error, loading } = useGetUserTargetList()
  const { setGetUserTargetList } = useAppStore()

  useEffect(() => {
    // 调用接口获取目标列表
    run('user001')
  }, [run])

  useEffect(() => {
    if (!error && data) {
      setGetUserTargetList(data)
    }
  }, [error, data])

  return {
    loading,
    error,
    data,
    setGetUserTargetList,
    refreshTargetList: () => run('user001'),
  }
}
