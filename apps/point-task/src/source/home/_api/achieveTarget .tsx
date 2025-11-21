import { ApiConfig, prefixUrl } from '@/source/home/_api/common'
import { post, STATUS_CODE } from '@mono-repo/utils'

// 1. 定义请求与响应的数据结构

// 完成任务的请求数据结构
export interface AchieveTargetRequest {
  user_id: string
  target_id: number
}

// 兑换目标的响应数据结构
export interface AchieveTargetResponse {
  message: string
  achievedTarget: AchieveTargetRequest
}

// 2. 配置请求代码
export const apiConfig: ApiConfig = {
  url: `${prefixUrl}/redeem`,
  method: 'POST',
  manual: false,
  showError: true,
}

// 3. 请求代码 + 通用逻辑 + 错误处理
export const achieveTargetRequest = async (
  targetData: AchieveTargetRequest
): Promise<AchieveTargetResponse> => {
  try {
    const res = await post<AchieveTargetResponse>({
      url: apiConfig.url,
      data: targetData,
    })
    if (res.code === STATUS_CODE.SUCCESS) {
      if (!res.data) {
        throw new Error('完成任务失败：返回数据为空')
      }
      return res.data
    } else {
      throw new Error(res.message || '完成任务失败')
    }
  } catch (error) {
    console.error('完成任务失败:', error)
    throw new Error('完成任务失败')
  }
}
