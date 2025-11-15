import {
  apiConfig,
  getUserInfoRequest,
  GetUserInfoResponse,
} from '@/source/home/_api/getUserInfo'
import { useAppStore } from '@/source/home/_store'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

export function useGetUserInfo(params?: {
  manual?: boolean
  showError?: boolean
}) {
  const manual = params?.manual ?? apiConfig.manual
  const showError = params?.showError ?? apiConfig.showError

  // 包装请求函数，使其兼容 useRequest
  const wrappedGetUserInfoRequest = async (
    userId: string
  ): Promise<GetUserInfoResponse> => {
    return await getUserInfoRequest(userId)
  }

  const { data, error, loading, run } = useRequest(wrappedGetUserInfoRequest, {
    manual,
  })

  const { setUserInfo } = useAppStore()

  useEffect(() => {
    if (error && showError) {
      alert('获取用户信息失败')
    }
  }, [error, showError])

  useEffect(() => {
    if (!error && data) {
      setUserInfo(data)
    }
  }, [error, data, setUserInfo])

  return { data, error, loading, run }
}
