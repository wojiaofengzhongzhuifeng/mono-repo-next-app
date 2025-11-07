import { post } from '@mono-repo/utils'

// 请求参数类型
export type DeletedTasksRequestData = {
  user_id: string
  task_ids: number[]
}

// 单个已完成任务的信息
export type DeletedTaskInfo = {
  deletedTask: {
    id: number // 任务ID
    name: string //'好好吃饭'
    create_point: number // 10
    task_type: string | null //null
    is_repeatable: boolean // false
    is_completed: boolean // true
    completed_at: string // '2025-10-27T12:53:52.179Z'
    user_id: string // 'user001'
    created_at: string // '2025-10-27T12:53:52.170Z'
  }
}

// 响应数据类型
export type DeletedTasksResponseData = {
  message: string
  deletedTasksData: DeletedTaskInfo[]
}

// 删除任务接口
const API_CONFIG = {
  url: '/api/tasks/1',
}

export const deletedTasks = async (
  requestData: DeletedTasksRequestData
): Promise<DeletedTasksResponseData> => {
  try {
    const res = await post<DeletedTasksResponseData>({
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
