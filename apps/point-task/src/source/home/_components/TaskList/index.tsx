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
import { UserAddTaskRequestDataItem } from '../../_api/AddTask'

interface TaskListProps {
  onBack: () => void
}

type TaskStatus = 'all' | 'pending' | 'completed'

function TaskList({ onBack }: TaskListProps) {
  const { userInfo, userAddTask, setUserAddTask } = useAppStore()
  const { fetchUserTasks, loading } = useGetUserTasksHooks()
  const [activeStatus, setActiveStatus] = useState<TaskStatus>('all')
  const [tasks, setTasks] = useState<UserAddTaskRequestDataItem[]>([])

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
  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => (task as any).id !== taskId))
    setUserAddTask(tasks.filter(task => (task as any).id !== taskId))
    message.success('任务已删除')
  }

  return (
    <div className='flex justify-center mb-6'>
      <div className='gap-3  w-[80vh] bg-gray-50 px-6 py-6 rounded-lg drop-shadow-2xl'>
        {/* 头部 */}
        <div className='flex items-center mb-4'>
          <button
            type='button'
            onClick={onBack}
            className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
          >
            <ArrowLeftOutlined className='text-lg' />
          </button>
          <h2 className='text-xl font-semibold mx-2'>我的任务</h2>
        </div>

        {/* 按钮部分 */}
        <div className='flex space-x-3 mb-4'>
          <Button
            type={activeStatus === 'all' ? 'primary' : 'default'}
            className={`rounded-full ${
              activeStatus === 'all'
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setActiveStatus('all')}
          >
            全部
          </Button>
          <Button
            type={activeStatus === 'pending' ? 'primary' : 'default'}
            className={`rounded-full ${
              activeStatus === 'pending'
                ? 'bg-orange-500 hover:bg-orange-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setActiveStatus('pending')}
          >
            未完成
          </Button>
          <Button
            type={activeStatus === 'completed' ? 'primary' : 'default'}
            className={`rounded-full ${
              activeStatus === 'completed'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setActiveStatus('completed')}
          >
            已完成
          </Button>
        </div>

        {/* 任务列表部分 */}
        <div className='mt-4 h-[30vh] overflow-y-auto'>
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
              {filteredTasks.map((task, index) => (
                <div
                  key={(task as any).id || index}
                  className={`flex items-center justify-between p-3 border rounded-lg ${
                    (task as any).status === 'completed'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className='flex-1'>
                    <div
                      className={`font-medium ${
                        (task as any).status === 'completed'
                          ? 'line-through text-gray-500'
                          : 'text-gray-800'
                      }`}
                    >
                      {task.name}
                    </div>
                    <div className='text-sm text-gray-500 mt-1'>
                      积分: {task.create_point} | 类型: {task.task_type}
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
                      onClick={() =>
                        toggleTaskStatus((task as any).id || index.toString())
                      }
                      className={
                        (task as any).status === 'completed'
                          ? 'text-orange-500 hover:text-orange-600'
                          : 'text-green-500 hover:text-green-600'
                      }
                    />
                    <Button
                      type='text'
                      size='small'
                      icon={<DeleteOutlined />}
                      onClick={() =>
                        deleteTask((task as any).id || index.toString())
                      }
                      className='text-red-500 hover:text-red-600'
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskList
