import { useEffect, useMemo, useRef } from 'react'
import { useRequest } from 'ahooks'
import { useAppStore } from '@/source/home/_store'
import {
  postUserTasks,
  CreateAddTaskRequestData,
} from '@/source/home/_api/AddTask'

export function useAddTask() {
  const { data, error, loading, run } = useRequest(
    (taskData: CreateAddTaskRequestData, userId: string) =>
      postUserTasks(taskData, userId),
    {
      manual: true,
    }
  )
  useEffect(() => {
    console.log('error changed', error)
    if (error) {
      alert(error)
    }
  }, [error])

  return { error, loading, data, run }
}

// 统一的目标创建管理hook
export function useAddTaskHooks() {
  const { run, data, error, loading } = useAddTask()
  const { userInfo, userAddTask, setUserAddTask } = useAppStore()
  const processedDataRef = useRef<any[]>([])

  // 创建任务
  const createAddTask = async (
    taskData: CreateAddTaskRequestData,
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    try {
      const result = await run(taskData, userInfo?.user_id || '')

      // 成功提示
      alert('任务创建成功！')

      // 调用成功回调
      if (onSuccess) {
        onSuccess()
      }

      return result
    } catch (error) {
      console.error('创建任务失败:', error)

      // 失败提示
      alert('创建任务失败，请重试')

      // 调用失败回调
      if (onError) {
        onError()
      }

      throw error
    }
  }

  // 更新任务列表
  useEffect(() => {
    if (!error && data && userInfo) {
      const dataId = data
        .map(
          item =>
            `${item.name}-${item.create_point}-${item.task_type}-${item.user_id}`
        )
        .join(',')
      if (processedDataRef.current.includes(dataId)) {
        return
      }

      processedDataRef.current.push(dataId)

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
