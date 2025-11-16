import { ApiConfig, prefixUrl } from '@/source/home/_api/common'
import { post, STATUS_CODE } from '@mono-repo/utils'

import { useAppStore } from '@/source/home/_store'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

// 1. 定义请求与响应的数据结构

// 前端所需的数据结构
export interface PostUserCreactedTargetsResponse {
  id: number //58
  name: string //'买一台新电脑'
  description: string //'用于学习和编程'
  need_point: number //100
  user_id: string //'user001'
  is_redeemed: boolean //false
  created_at: string //'2025-11-16T04:58:30.604Z'
}

export type PostUserCreactedTargetsResponseData =
  PostUserCreactedTargetsResponse[]

// 后端返回的数据结构
export interface PostUserCreactedTargetsRequset {
  id: number //58
  name: string //'买一台新电脑'
  description: string //'用于学习和编程'
  need_point: number //100
  user_id: string //'user001'
  is_redeemed: boolean //false
  created_at: string //'2025-11-16T04:58:30.604Z'
}

// 2. 配置请求代码
export const apiConfig: ApiConfig = {
  url: `${prefixUrl}/users`,
  method: 'GET',
  manual: false,
  showError: true,
}

// 3. 请求代码 + 通用逻辑 + 错误处理
export const postUserCreactedTargetsRequest = async (
  userId: string
): Promise<PostUserCreactedTargetsRequset> => {
  try {
    const res = await post<PostUserCreactedTargetsRequset>({
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

// 凡是以 get or submit 开头，表示请求数据, post 开头表示发送数据
export function postPostCreactedTargets() {
  const { data, error, loading, run } = useRequest(
    postUserCreactedTargetsRequest,
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (error) {
      console.error('获取分类数据失败:', error)
    }
  }, [error])

  return { error, loading, data, run }
}

// 使用 hooks - 自动获取用户信息
export function postPostCreactedTargetsHooks() {
  const { run, data, error, loading } = postPostCreactedTargets()
  // const { setUserInfo } = useAppStore()

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
