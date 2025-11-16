import { del } from '@mono-repo/utils'

// 删除任务响应数据类型（根据API规范更新）
export type DeletedTasksResponseData = {
  message: string
  deletedTask: {
    id: number
    name: string
    create_point: number
    task_type: string | null
    is_repeatable: boolean
    is_completed: boolean
    completed_at: string
    user_id: string
    created_at: string
  }
}

// 删除单个任务接口
export const deletedTask = async (
  taskId: number,
  userId: string
): Promise<DeletedTasksResponseData> => {
  // 根据API规范构建动态URL
  const url = `/api/tasks/${taskId}`

  try {
    // 使用del方法发送DELETE请求
    // 在URL中包含任务ID，在params中包含用户ID
    const res = await del<DeletedTasksResponseData>({
      url: url,
      params: { user_id: userId },
    })

    if (res.code === 0) {
      if (!res.data) {
        throw new Error('删除任务失败：返回数据为空')
      }
      return res.data
    } else {
      throw new Error(`删除任务失败：${res.message}`)
    }
  } catch (error) {
    console.error('删除任务失败：', error)
    throw new Error('删除任务失败：网络错误')
  }
}

// 保持向后兼容的函数名
export const deletedTasks = deletedTask
