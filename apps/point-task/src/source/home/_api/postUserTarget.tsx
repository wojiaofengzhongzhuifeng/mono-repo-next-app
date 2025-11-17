import { ApiConfig, prefixUrl } from '@/source/home/_api/common'
import { post, STATUS_CODE } from '@mono-repo/utils'

// 1. 定义请求与响应的数据结构

// 前端所需的数据结构
export interface PostUserCreatedTargetsResponse {
  id: number //58
  name: string //'买一台新电脑'
  need_point: number //100
  user_id: string
  is_redeemed: boolean //false
  created_at: string //'2025-11-16T04:58:30.604Z'
  description: string //'用于学习和编程'
}

export type PostUserCreatedTargetsResponseData =
  PostUserCreatedTargetsResponse[]

// 后端返回的数据结构
export interface PostUserCreatedTargetsRequset {
  id: number //58
  name: string //'买一台新电脑'
  need_point: number //100
  user_id: string
  is_redeemed: boolean //false
  created_at: string //'2025-11-16T04:58:30.604Z'
  description: string //'用于学习和编程'
}

// 2. 配置请求代码
export const apiConfig: ApiConfig = {
  url: `${prefixUrl}/targets`,
  method: 'POST',
  manual: false,
  showError: true,
}

// 3. 请求代码 + 通用逻辑 + 错误处理
export const postUserCreatedTargetsRequest = async (
  targetData: Omit<
    PostUserCreatedTargetsRequset,
    'id' | 'is_redeemed' | 'created_at'
  >
): Promise<PostUserCreatedTargetsRequset> => {
  try {
    const res = await post<PostUserCreatedTargetsRequset>({
      url: `${apiConfig.url}`,
      data: [targetData], // 发送数组格式的请求体
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
