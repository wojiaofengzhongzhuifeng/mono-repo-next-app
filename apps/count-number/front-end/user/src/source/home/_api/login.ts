import { post } from '@mono-repo/utils'
import { useRequest } from 'ahooks'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: { id: string; email: string }
}

const apiConfig = {
  url: '/api/auth/login',
  manual: true,
  showError: true,
}

export const loginRequest = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const res = await post<{
    code: number
    message: string
    data: LoginResponse
  }>({ url: apiConfig.url, data })
  if (res.code === 20000) {
    if (!res.data) {
      throw new Error('登录失败：返回数据为空')
    }
    return res.data
  }
  throw new Error(res.message || '登录失败')
}

export function useLogin(params?: {
  manual?: boolean
  showError?: boolean
  onSuccess?: (data: LoginResponse) => void
  onError?: (error: Error) => void
}) {
  const manual = params?.manual ?? apiConfig.manual
  const showError = params?.showError ?? apiConfig.showError

  const { data, error, loading, run } = useRequest(loginRequest, {
    manual,
    onSuccess: data => {
      params?.onSuccess?.(data)
    },
    onError: err => {
      if (showError) {
        alert(`登录失败: ${err.message}`)
      }
      params?.onError?.(err)
    },
  })

  return { data, error, loading, run }
}
