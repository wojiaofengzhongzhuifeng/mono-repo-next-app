import { post } from '@mono-repo/utils'

// 请求参数类型
export type CompleteTasksRequestData = {
  user_id: string
  task_ids: number[]
}

// 单个已完成任务的信息
export type CompletedTaskInfo = {
  task: {
    id: number
    name: string
    create_point: number
    task_type: string
    is_repeatable: boolean
    is_completed: boolean
    completed_at: string
    user_id: string
    created_at: string
  }
  taskRecord: {
    id: number
    user_id: string
    task_id: number
    completed_at: string
  }
  earnedPoints: number
}

// 响应数据类型
export type CompleteTasksResponseData = {
  message: string
  completedTasks: CompletedTaskInfo[]
  totalEarnedPoints: number
}

const API_CONFIG = {
  url: '/api/tasks/complete-batch',
}

export const completeTasks = async (
  requestData: CompleteTasksRequestData
): Promise<CompleteTasksResponseData> => {
  try {
    const res = await post<CompleteTasksResponseData>({
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
