import { ApiConfig, prefixUrl } from '@/source/home/_api/common'
import { post, STATUS_CODE } from '@mono-repo/utils'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

// 1. 定义请求与响应的数据结构

// 完成任务的请求数据结构
export interface CompleteUserTaskRequest {
  user_id: string
  task_ids: number[]
}

// 任务记录数据结构
export interface TaskRecord {
  id: number
  user_id: string
  task_id: number
  completed_at: string
}

// 已完成任务数据结构
export interface CompletedTask {
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
  taskRecord: TaskRecord
  earnedPoints: number
}

// 后端返回的数据结构
export interface CompleteUserTaskResponse {
  message: string
  completedTasks: CompletedTask[]
  totalEarnedPoints: number
}

// 2. 配置请求代码
export const apiConfig: ApiConfig = {
  url: `${prefixUrl}/tasks/complete-batch`,
  method: 'POST',
  manual: false,
  showError: true,
}

// 3. 请求代码 + 通用逻辑 + 错误处理
export const completeUserTaskRequest = async (
  taskData: CompleteUserTaskRequest
): Promise<CompleteUserTaskResponse> => {
  try {
    const res = await post<CompleteUserTaskResponse>({
      url: apiConfig.url,
      data: taskData,
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

// 凡是以 get or submit 开头，表示请求数据
export function useCompleteUserTask() {
  const { data, error, loading, run } = useRequest(completeUserTaskRequest, {
    manual: true,
  })

  useEffect(() => {
    if (error) {
      console.error('完成任务失败:', error)
    }
  }, [error])

  return { error, loading, data, run }
}
