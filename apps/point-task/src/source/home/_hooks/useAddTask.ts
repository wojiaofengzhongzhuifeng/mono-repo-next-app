import { useEffect, useRef } from 'react'
import { useRequest } from 'ahooks'
import { useAppStore } from '@/source/home/_store'
import {
  postUserTasks,
  CreateAddTaskRequestData,
  UserAddTaskResponseData,
} from '@/source/home/_api/AddTask'

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

// 统一的目标创建管理hook
export function useAddTaskHooks() {
  const { run, data, error, loading } = useAddTask()
  const { userInfo, userAddTask, setUserAddTask } = useAppStore()
  const processedDataRef = useRef<any[]>([])

  // 创建任务
  const createAddTask = async (taskData: CreateAddTaskRequestData) => {
    try {
      const result = await run(taskData)
      return result
    } catch (error) {
      console.error('创建任务失败:', error)
      throw error
    }
  }

  // 更新任务列表
  useEffect(() => {
    if (!error && data && userInfo) {
      // 使用多个字段组合生成唯一标识符，因为任务数据中没有id字段
      const dataId = data
        .map(
          item =>
            `${item.name}-${item.create_point}-${item.task_type}-${item.created_at}`
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
        is_completed: item.is_completed || false,
        completed_at: item.completed_at || null,
        user_id: item.user_id,
        created_at: item.created_at || Date.now(),
      }))
      setUserAddTask([...currentTasks, ...newTasks])
    }
  }, [data, error, setUserAddTask, userInfo, userAddTask])

  return { createAddTask, loading, error, data }
}

// 导出默认hook，保持向后兼容
export default useAddTaskHooks
