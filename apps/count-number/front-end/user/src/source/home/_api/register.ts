import { post } from '@mono-repo/utils'
import { useRequest } from 'ahooks'

interface RegisterRequest {
  email: string
  password: string
}

interface RegisterResponse {
  id: string
  email: string
}

const apiConfig = {
  url: '/api/auth/register',
  manual: true,
  showError: true,
}

export const registerRequest = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const res = await post<{
    code: number
    message: string
    data: RegisterResponse
  }>({ url: apiConfig.url, data })
  if (res.code === 20000) {
    if (!res.data) {
      throw new Error('注册失败：返回数据为空')
    }
    return res.data
  }
  throw new Error(res.message || '注册失败')
}

export function useRegister(params?: {
  manual?: boolean
  showError?: boolean
  onSuccess?: (data: RegisterResponse) => void
  onError?: (error: Error) => void
}) {
  const manual = params?.manual ?? apiConfig.manual
  const showError = params?.showError ?? apiConfig.showError

  const { data, error, loading, run } = useRequest(registerRequest, {
    manual,
    onSuccess: data => {
      params?.onSuccess?.(data)
    },
    onError: err => {
      if (showError) {
        alert(`注册失败: ${err.message}`)
      }
      params?.onError?.(err)
    },
  })

  return { data, error, loading, run }
}
