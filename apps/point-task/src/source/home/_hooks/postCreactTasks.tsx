import { useAppStore } from '@/source/home/_store'
import { useRequest } from 'ahooks'
import { useEffect, useRef } from 'react'
import { postUserCreatedTasksRequest } from '../_api/postUserTask'

// 凡是以 get or submit 开头，表示请求数据, post 开头表示发送数据
export function postPostCreatedTasks() {
  const { data, error, loading, run } = useRequest(
    postUserCreatedTasksRequest,
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

// 使用 hooks - 调用创建目标
export function postPostCreatedTasksHooks() {
  const { run, data, error, loading } = postPostCreatedTasks()
  const { userInfo, createdTasks, setCreatedTasks } = useAppStore()
  const processedDataRef = useRef<any[]>([])

  // 创建目标
  const createTasks = async (
    tasksData: any,
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    try {
      const result = await run(tasksData)

      // 成功提示
      alert('目标创建成功！')

      // 调用成功回调
      if (onSuccess) {
        onSuccess()
      }

      return result
    } catch (error) {
      console.error('创建目标失败:', error)

      // 失败提示
      alert('创建目标失败，请重试')

      // 调用失败回调
      if (onError) {
        onError()
      }

      throw error
    }
  }

  // 更新目标列表
  useEffect(() => {
    if (!error && data && userInfo) {
      const dataId = `${data.name}-${data.create_point}-${data.user_id}-${data.created_at}`
      if (processedDataRef.current.includes(dataId)) {
        return
      }

      processedDataRef.current.push(dataId)

      const currentTasks = createdTasks || []
      const newTasks = {
        id: data.id, // 12
        name: data.name, //'完成作业'
        create_point: data.create_point, //10
        task_type: data.task_type, //'study'
        is_repeatable: data.is_repeatable, //false
        is_completed: data.is_completed,
        comleted_at: data.comleted_at, //null
        user_id: data.user_id, //'user001'
        created_at: data.created_at, //"2025-11-17T13:50:20.075z"
      }
      setCreatedTasks([...currentTasks, newTasks])
    }
  }, [data, error, setCreatedTasks, userInfo, createdTasks])

  return { createTasks, loading, error, data }
}

// 导出默认hook，保持向后兼容
export default postPostCreatedTasksHooks
