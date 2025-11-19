import { message } from 'antd'
import {
  completeUserTaskRequest,
  CompleteUserTaskResponse,
} from '../_api/completeUserTask'
import { useAppStore } from '../_store'

export function usePostCompleteTask() {
  const { getUserTasksList, setGetUserTasksList } = useAppStore()

  const completeTask = async (task: any) => {
    try {
      console.log('完成任务:', task)

      // 调用完成任务API
      const result: CompleteUserTaskResponse | undefined =
        await completeUserTaskRequest({
          user_id: task.user_id || 'user001', // 如果task中没有user_id，使用默认值
          task_ids: [task.id],
        })

      if (result) {
        message.success(`成功完成任务！获得 ${result.totalEarnedPoints} 积分`)

        // 更新任务列表状态
        const updatedTasks = getUserTasksList.map(t =>
          t.id === task.id
            ? {
                ...t,
                is_completed: true,
                completed_at: new Date().toISOString(),
              }
            : t
        )
        setGetUserTasksList(updatedTasks)
      }
    } catch (error) {
      console.error('完成任务失败:', error)
      message.error('完成任务失败，请重试')
    }
  }

  return {
    completeTask,
    completeTaskLoading: false,
  }
}
