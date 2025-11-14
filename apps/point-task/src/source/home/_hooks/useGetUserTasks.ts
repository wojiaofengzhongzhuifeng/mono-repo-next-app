import { getUserTasks } from '@/source/home/_api/AddTask'
import { useAppStore } from '@/source/home/_store'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

export function useGetUserTasks() {
  const { data, error, loading, run } = useRequest(getUserTasks, {
    manual: true,
  })

  useEffect(() => {
    if (error) {
      console.error('获取任务列表失败:', error)
      alert(error)
    }
  }, [error])

  return { data, error, loading, run }
}

// 统一的用户任务列表管理hook
export function useGetUserTasksHooks() {
  const { run, data, error, loading } = useGetUserTasks()
  const { userInfo, userAddTask, setUserAddTask } = useAppStore()

  // 获取用户任务列表
  const fetchUserTasks = async () => {
    try {
      if (!userInfo?.user_id) {
        throw new Error('用户信息不存在')
      }

      const result = await run(userInfo.user_id)
      return result
    } catch (error) {
      console.error('获取任务列表失败:', error)
      throw error
    }
  }

  // 更新任务列表状态
  useEffect(() => {
    if (!error && data && Array.isArray(data)) {
      setUserAddTask(data)
    }
  }, [data, error, setUserAddTask])

  return { fetchUserTasks, loading, error, data }
}

// 导出默认hook，保持向后兼容
export default useGetUserTasksHooks
