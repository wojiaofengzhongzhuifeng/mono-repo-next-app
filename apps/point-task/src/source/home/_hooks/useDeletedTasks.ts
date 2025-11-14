import { message } from 'antd'
import { deletedTask } from '../_api/deleteTasks'
import { useAppStore } from '../_store'

export const useDeletedTasks = () => {
  const { userInfo } = useAppStore()

  // 删除单个任务
  const deleteTask = async (taskId: string): Promise<boolean> => {
    if (!userInfo?.user_id) {
      message.error('用户信息不存在，无法删除任务')
      return false
    }

    try {
      const result = await deletedTask(parseInt(taskId), userInfo.user_id)
      message.success(`任务删除成功！`)
      return true
    } catch (error) {
      console.error('删除任务失败:', error)
      message.error('删除任务失败，请重试')
      return false
    }
  }

  // 删除多个任务（如果需要的话）
  const deleteTasks = async (taskIds: string[]): Promise<boolean> => {
    if (!userInfo?.user_id) {
      message.error('用户信息不存在，无法删除任务')
      return false
    }

    try {
      // 批量删除，可以并行处理
      const results = await Promise.all(
        taskIds.map(taskId => deletedTask(parseInt(taskId), userInfo.user_id))
      )

      message.success(`成功删除${results.length}个任务！`)
      return true
    } catch (error) {
      console.error('批量删除任务失败:', error)
      message.error('批量删除任务失败，请重试')
      return false
    }
  }

  return {
    deleteTask,
    deleteTasks,
  }
}

export default useDeletedTasks
