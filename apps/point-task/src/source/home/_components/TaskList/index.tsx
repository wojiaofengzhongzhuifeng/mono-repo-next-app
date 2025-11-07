import {
  ArrowLeftOutlined,
  DeleteOutlined,
  CheckOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppStore } from '../../_store'
import useGetUserTasksHooks from '../../_hooks/useGetUserTasks'
import useUserInfoHooks from '../../_hooks/useUserProfile'
import { completeTasks } from '../../_api/completeTasks'
import { UserAddTaskRequestDataItem } from '../../_api/AddTask'
import useDeletedTasks from '../../_hooks/useDeletedTasks'
interface TaskListProps {
  onBack: () => void
}

type TaskStatus = 'all' | 'pending' | 'completed'

function TaskList({ onBack }: TaskListProps) {
  const { userInfo, setUserInfo, userAddTask, setUserAddTask } = useAppStore()
  const { fetchUserTasks, loading } = useGetUserTasksHooks()
  const { updateUserInfoWithPoints } = useUserInfoHooks()
  const { deleteTask: deleteTaskApi } = useDeletedTasks()
  const [activeStatus, setActiveStatus] = useState<TaskStatus>('all')
  const [tasks, setTasks] = useState<UserAddTaskRequestDataItem[]>([])
  const [deletedTaskIds, setDeletedTaskIds] = useState<Set<string>>(new Set())
  console.log('userInfo', userInfo)
  // 组件加载时获取任务数据
  useEffect(() => {
    const loadTasks = async () => {
      try {
        await fetchUserTasks()
      } catch (error) {
        console.error('获取任务列表失败:', error)
        message.error('获取任务列表失败')
      }
    }

    loadTasks()
  }, [])

  // 当store中的任务数据更新时，同步到本地状态
  useEffect(() => {
    if (userAddTask) {
      setTasks(userAddTask)
    }
  }, [userAddTask])

  // 根据状态筛选任务
  const filteredTasks = tasks.filter(task => {
    if (activeStatus === 'all') return true
    // 这里假设任务有一个status字段来标识完成状态
    // 如果没有，可以根据业务逻辑调整
    return activeStatus === 'completed'
      ? (task as any).status === 'completed'
      : (task as any).status !== 'completed'
  })

  // 切换任务状态
  const toggleTaskStatus = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if ((task as any).id === taskId) {
          const updatedTask = {
            ...task,
            status:
              (task as any).status === 'completed' ? 'pending' : 'completed',
          }
          return updatedTask
        }
        return task
      })
    )
    message.success('任务状态已更新')
  }

  // 删除任务
  const handleDeleteTask = async (taskId: string) => {
    try {
      const success = await deleteTaskApi(taskId)
      if (success) {
        // 将任务标记为已删除状态，而不是从列表中移除
        setDeletedTaskIds(prev => new Set(prev).add(taskId))
        message.success('任务已删除')
      }
    } catch (error) {
      console.error('删除任务失败:', error)
      message.error('删除任务失败，请重试')
    }
  }

  // 完成任务并获得积分
  const completeTaskAndEarnPoints = async (taskId: string, points: number) => {
    if (!userInfo) {
      message.error('用户信息不存在，无法完成任务')
      return
    }

    try {
      // 调用后端API完成任务
      const result = await completeTasks({
        user_id: userInfo.user_id,
        task_ids: [parseInt(taskId)],
      })

      // 更新本地积分状态
      const userNewPoints =
        (userInfo?.totalPoints || 0) + result.totalEarnedPoints
      await updateUserInfoWithPoints(userNewPoints)

      message.success(`任务完成！获得${result.totalEarnedPoints}积分`)

      // 刷新任务列表
      await fetchUserTasks()
    } catch (error) {
      console.error('完成任务失败:', error)
      message.error('完成任务失败，请重试')
    }
  }

  return (
    <>
      <div className='flex justify-center mb-6'>
        <div className='gap-3 h-[45vh] w-[80vh] bg-gray-50 px-6 py-6 rounded-lg  drop-shadow-2xl'>
          {/* 头部 */}
          <div className='flex  items-center mb-2'>
            <button
              type='button'
              onClick={onBack}
              className='mt-2  py-2  rounded-lg hover:bg-gray-100 transition-colors'
            >
              <ArrowLeftOutlined />
            </button>
            <h2 className='  mx-2'>我的任务</h2>
          </div>

          {/* 按钮部分 */}
          <div className='flex'>
            <Button
              type='primary'
              className='rounded-full bg-blue-500 mr-4 hover:bg-blue-600'
              onClick={() => setActiveStatus('all')}
            >
              全部
            </Button>
            <Button
              type='primary'
              className='rounded-full bg-blue-500 mr-4 hover:bg-blue-600'
              onClick={() => setActiveStatus('pending')}
            >
              未完成
            </Button>
            <Button
              type='primary'
              className='rounded-full bg-blue-500 mr-4 hover:bg-blue-600'
              onClick={() => setActiveStatus('completed')}
            >
              已完成
            </Button>
          </div>

          {/* 任务列表部分 */}
          <div className='mt-4 h-[30vh] '>
            {loading ? (
              <div className='flex justify-center items-center h-full'>
                <div className='text-gray-500'>加载中...</div>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className='flex justify-center items-center h-full border border-gray-200 rounded-lg'>
                <div className='text-gray-500'>暂无任务</div>
              </div>
            ) : (
              <div className='space-y-2'>
                {filteredTasks.map((task, index) => {
                  const taskId = (task as any).id || index.toString()
                  const isDeleted = deletedTaskIds.has(taskId)

                  return (
                    <div
                      key={taskId}
                      className={`flex items-center justify-between p-3 border rounded-lg ${
                        (task as any).status === 'completed'
                          ? 'bg-green-50 border-green-200'
                          : 'bg-white border-gray-200'
                      } ${isDeleted ? 'bg-gray-100 border-gray-300' : ''}`}
                    >
                      <div className='flex-1'>
                        <div
                          className={`font-medium ${
                            (task as any).status === 'completed'
                              ? 'line-through text-gray-500'
                              : 'text-gray-800'
                          } ${isDeleted ? 'line-through text-gray-400' : ''}`}
                        >
                          {task.name}
                        </div>
                        <div className='text-sm text-gray-500 mt-1  flex gap-5'>
                          <div className='border rounded-lg px-1 bg-green-100'>
                            +{task.create_point}
                          </div>
                          <div className='border rounded-lg px-1 '>
                            {' '}
                            {task.task_type ? task.task_type : 'other'}
                          </div>
                          <div className='border '>
                            {task.created_at
                              ? new Date(task.created_at).toLocaleDateString(
                                  'zh-CN'
                                )
                              : '刚刚'}
                          </div>
                        </div>
                      </div>
                      <div className='flex space-x-2'>
                        <Button
                          type='text'
                          size='small'
                          icon={
                            (task as any).status === 'completed' ? (
                              <UndoOutlined />
                            ) : (
                              <CheckOutlined />
                            )
                          }
                          onClick={() => {
                            completeTaskAndEarnPoints(taskId, task.create_point)
                          }}
                          className={
                            (task as any).status === 'completed'
                              ? 'text-orange-500 hover:text-orange-600'
                              : 'text-green-500 hover:text-green-600'
                          }
                          disabled={isDeleted}
                        />
                        <Button
                          type='text'
                          size='small'
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteTask(taskId)}
                          className='text-red-500 hover:text-red-600'
                          disabled={isDeleted}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default TaskList
