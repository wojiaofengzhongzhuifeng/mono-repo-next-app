import { CreateNumberRequest, NumberItem } from '@count-number-types'
import { NumberStatus } from '@/source/home/_api/get-number'
import { ApiConfig, prefixUrl } from '@/source/home/_api/common'
import { post, STATUS_CODE } from '@mono-repo/utils'
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
  manual: false,
  showError: true,
}

// 3. 请求代码 + 通用逻辑 + 错误处理
export const createNumberRequest = async (
  data: CreatNumberRequest
): Promise<CreateNumberResponse> => {
  try {
    const res = await post<BackEndCreateNumberRequest>({
      url: apiConfig.url,
      data: data,
    })
    if (res.code === STATUS_CODE.SUCCESS) {
      return res.data || {}
    } else {
      throw new Error(res.message || '创建数据失败')
    }
  } catch (error) {
    console.error('创建数据失败:', error)
    throw new Error('创建数据失败')
  }
}
