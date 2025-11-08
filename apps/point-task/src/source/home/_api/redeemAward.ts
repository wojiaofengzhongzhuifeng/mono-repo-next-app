import { post } from '@mono-repo/utils'

// 请求参数类型
export type UserRedeemAwardRequestData = {
  user_id: string //user123
  task_ids: number //21
}

// 单个已完成任务的信息
export type RedeemAwardInfo = {
  message: string //"成功兑换目标: 买一台新电脑",
  consumed_points: number //100
}

// 响应数据类型
export type RedeemAwardResponseData = {
  message: string
  completedTasks: RedeemAwardInfo[]
  totalEarnedPoints: number
}

const API_CONFIG = {
  url: '/api/tasks/complete-batch',
}

export const postRedeemAward = async (
  requestData: UserRedeemAwardRequestData
): Promise<RedeemAwardResponseData> => {
  try {
    const res = await post<RedeemAwardResponseData>({
      url: API_CONFIG.url,
      data: requestData,
    })

    if (res.code === 0) {
      return res.data
    } else {
      throw new Error(`完成任务失败：${res.message}`)
    }
  } catch (error) {
    console.error('完成任务失败：', error)
    throw new Error('完成任务失败：网络错误')
  }
}
