import { ApiConfig, prefixUrl } from '@/source/home/_api/common'
import { STATUS_CODE, del } from '@mono-repo/utils'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

// 1. 定义请求与响应的数据结构

// 删除任务的请求数据结构
export interface DeleteTaskRequest {
  taskId: number
}

// 已删除任务数据结构
export interface DeletedTask {
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

// 后端返回的数据结构
export interface DeleteTaskResponse {
  message: string
  deletedTask: DeletedTask
}

// 2. 配置请求代码
export const apiConfig: ApiConfig = {
  url: `${prefixUrl}/tasks`,
  method: 'DELETE',
  manual: false,
  showError: true,
}

// 3. 请求代码 + 通用逻辑 + 错误处理
export const deleteTaskRequest = async (
  taskId: number
): Promise<DeleteTaskResponse> => {
  try {
    const res = await del<DeleteTaskResponse>({
      url: `${apiConfig.url}/${taskId}`,
    })
    if (res.code === STATUS_CODE.SUCCESS) {
      if (!res.data) {
        throw new Error('删除任务失败：返回数据为空')
      }
      return res.data
    } else {
      throw new Error(res.message || '删除任务失败')
    }
  } catch (error) {
    console.error('删除任务失败:', error)
    throw new Error('删除任务失败')
  }
}

// 凡是以 get or submit 开头，表示请求数据
export function useDeleteTask() {
  const { data, error, loading, run } = useRequest(deleteTaskRequest, {
    manual: true,
  })

  useEffect(() => {
    if (error) {
      console.error('删除任务失败:', error)
    }
  }, [error])

  return { error, loading, data, run }
}
