import { CreateNumberRequest, NumberItem } from '@count-number-types'
import { NumberStatus } from '@/source/home/_api/get-number'
import { ApiConfig, prefixUrl } from '@/source/home/_api/common'
import { post, STATUS_CODE } from '@mono-repo/utils'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
// 1. 定义请求与响应的数据结构

// 后端请求数据结构
export type BackEndCreateNumberRequest = CreateNumberRequest
// 前端组件生成的请求数据结构，可能与后端请求数据结构不同，需要进行转换
export type CreatNumberRequest = {
  numberValue: number
  title: string
  subtitle: string
  status: NumberStatus
}

// 后端响应数据结构
export type BackEndCreateNumberResponse = NumberItem
// 前端响应数据结构
export type CreateNumberResponse = {
  id: number
  numberValue: number
  title: string
  subtitle: string
  status: NumberStatus
  created_at: string
  updated_at: string
}

// 2. 配置请求代码
const apiConfig: ApiConfig = {
  url: `${prefixUrl}/numbers`,
  method: 'POST',
  manual: true,
  showError: true,
}

// 3. 数据转换函数
// 前端数据 → 后端数据
function transformFrontEndToBackEnd(
  frontData: CreatNumberRequest
): BackEndCreateNumberRequest {
  return {
    value: frontData.numberValue,
    label: frontData.title,
    description: frontData.subtitle,
    status: frontData.status,
  }
}

// 后端数据 → 前端数据
function transformBackEndToFrontEnd(
  backData: BackEndCreateNumberResponse
): CreateNumberResponse {
  return {
    id: backData.id,
    numberValue: backData.value,
    title: backData.label,
    subtitle: backData.description || '',
    status: backData.status,
    created_at: backData.created_at,
    updated_at: backData.updated_at,
  }
}

// 4. 纯 HTTP 请求函数（只处理后端协议）
export const createNumberRequest = async (
  data: BackEndCreateNumberRequest
): Promise<BackEndCreateNumberResponse> => {
  const res = await post<BackEndCreateNumberResponse>({
    url: apiConfig.url,
    data: data,
  })
  if (res.code === STATUS_CODE.SUCCESS) {
    if (!res.data) {
      throw new Error('创建数据失败：返回数据为空')
    }
    return res.data
  }
  throw new Error(res.message || '创建数据失败')
}

// 5. 业务逻辑层 Hook（处理数据转换、错误处理等）
export function useCreateNumber(params?: {
  manual?: boolean
  showError?: boolean
}) {
  const manual = params?.manual ?? apiConfig.manual
  const showError = params?.showError ?? apiConfig.showError

  // 数据转化函数，实现了请求时，前后端数据结构的转换，以及响应时，前后端数据结构的转换
  const wrappedRequest = async (
    frontData: CreatNumberRequest
  ): Promise<CreateNumberResponse> => {
    const backEndData = transformFrontEndToBackEnd(frontData)
    const backEndResponse = await createNumberRequest(backEndData)
    return transformBackEndToFrontEnd(backEndResponse)
  }

  const { data, error, loading, run } = useRequest(wrappedRequest, {
    manual,
  })

  useEffect(() => {
    if (error && showError) {
      alert('创建数据失败')
    }
  }, [error, showError])

  useEffect(() => {
    console.log('response data', data)
  }, [data])

  return { data, error, loading, run }
}
