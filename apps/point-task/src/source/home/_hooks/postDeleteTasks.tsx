import { message } from 'antd'
import { deleteTaskRequest, DeleteTaskResponse } from '../_api/deleteTasks'
import { useAppStore } from '../_store'

export function usePostDeleteTasks() {
  const { getUserTasksList, setGetUserTasksList } = useAppStore()

  const deleteTask = async (task: any) => {
    try {
      console.log('完成任务:', task)

      // 调用完成任务API
      const result: DeleteTaskResponse | undefined = await deleteTaskRequest(
        task.id
      )

      if (result) {
        // 显示成功消息
        message.success(`成功删除任务！`)

        // 更新任务列表状态
        const updatedTasks = getUserTasksList.filter(t => t.id !== task.id)
        setGetUserTasksList(updatedTasks)
      }
    } catch (error) {
      console.error('完成任务失败:', error)
      message.error('完成任务失败，请重试')
    }
  }

  return {
    deleteTask,
  }
}
