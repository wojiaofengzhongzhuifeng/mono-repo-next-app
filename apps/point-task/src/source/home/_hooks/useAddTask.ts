import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useAppStore } from '@/source/home/_store'
import { postUserTasks } from '@/source/home/_api/AddTask'

export function useAddTask() {
  const { data, error, loading, run } = useRequest(postUserTasks, {
    manual: true,
  })

  useEffect(() => {
    console.log('error changed', error)
    if (error) {
      alert(error)
    }
  }, [error])

  return { error, loading, data, run }
}

// 统一的任务创建管理hook
export function useAddTaskHooks() {
  const { run, data, error, loading } = useAddTask()
  const { userInfo, userAddTask, setUserAddTask } = useAppStore()

  // 创建任务
  const createAddTask = async (
    taskData: any[],
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    try {
      if (!userInfo?.user_id) {
        throw new Error('用户信息不存在')
      }

      const result = await run(taskData, userInfo.user_id)

      if (onSuccess) {
        onSuccess()
      }

      return result
    } catch (error) {
      console.error('创建任务失败:', error)
      if (onError) {
        onError()
      }
      throw error
    }
  }

  // 更新任务列表
  useEffect(() => {
    console.log('useAddTask useEffect triggered:', {
      data,
      error,
      userInfo,
      userAddTask,
    })
    if (!error && data && Array.isArray(data) && data.length > 0) {
      const currentTasks = userAddTask || []
      const newTasks = data.map(item => ({
        name: item.name,
        create_point: item.create_point,
        task_type: item.task_type,
        is_repeatable: item.is_repeatable,
        user_id: item.user_id,
      }))
      setUserAddTask([...currentTasks, ...newTasks])
    }
  }, [data, error, setUserAddTask, userInfo, userAddTask])

  return { createAddTask, loading, error, data }
}

// 导出默认hook，保持向后兼容
export default useAddTaskHooks
