import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Button, Checkbox, Popconfirm } from 'antd'
import { useState } from 'react'
import {
  GetUserTasksListResponse,
  useGetUserTasksListHooks,
} from '../../_api/getUserTasksList'
import { usePostCompleteTask } from '../../_hooks/postCompleteTask'
import { usePostDeleteTasks } from '../../_hooks/postDeleteTasks'
import { useAppStore } from '../../_store'

interface GetTaskListProps {
  onBack: () => void
  onCreateTask: () => void
}

const repeatableLabel = (value?: boolean) => {
  if (!value) return ''
  return '可重复'
}

// 处理time格式
const formatDate = (value?: string) => {
  if (!value) return ''
  const [datePart] = value.split('T')
  return datePart
}

// 处理footer统计
const footerCount = (getUserTasksList: GetUserTasksListResponse[]) => {
  const total = getUserTasksList.length
  const pending = getUserTasksList.filter(item => !item.is_completed).length
  const completed = getUserTasksList.filter(item => item.is_completed).length
  return {
    total,
    pending,
    completed,
  }
}

function GetUserTasksList({ onBack, onCreateTask }: GetTaskListProps) {
  const { getUserTasksList } = useAppStore()
  const { completeTask } = usePostCompleteTask()
  const { deleteTask } = usePostDeleteTasks()
  const { loading } = useGetUserTasksListHooks()
  const [activeStatus, setActiveStatus] = useState<
    'all' | 'pending' | 'completed'
  >('all')

  // 根据 activeStatus 过滤任务列表
  const filteredTasksList = getUserTasksList.filter(item => {
    if (activeStatus === 'all') {
      return true
    }
    if (activeStatus === 'pending') {
      return !item.is_completed
    }
    if (activeStatus === 'completed') {
      return item.is_completed
    }
    return true
  })

  console.log('filteredTasksList', filteredTasksList)
  return (
    <>
      <div className='bg-white-200 p-6 w-2/5 mx-auto rounded-lg shadow-lg mt-4'>
        {/* head */}
        {
          <>
            <div className=' flex'>
              <div>
                <ArrowLeftOutlined onClick={onBack} />
              </div>
              <div className='mx-2'>我的任务</div>
            </div>
          </>
        }

        {/* navigation */}
        <div className='mt-4'>
          <div>
            {
              <>
                <Button
                  type={activeStatus === 'all' ? 'primary' : 'default'}
                  className=' shadow-lg rounded-full mr-2'
                  onClick={() => setActiveStatus('all')}
                >
                  全部({footerCount(getUserTasksList).total})
                </Button>

                <Button
                  type={activeStatus === 'pending' ? 'primary' : 'default'}
                  className=' shadow-lg rounded-full mr-2'
                  onClick={() => setActiveStatus('pending')}
                >
                  待完成({footerCount(getUserTasksList).pending})
                </Button>
                <Button
                  type={activeStatus === 'completed' ? 'primary' : 'default'}
                  className=' shadow-lg rounded-full mr-2'
                  onClick={() => setActiveStatus('completed')}
                >
                  已完成({footerCount(getUserTasksList).completed})
                </Button>
              </>
            }
          </div>
        </div>

        {/* taskList */}
        <div className='mt-4'>
          <div className=''>
            <div>
              <div>
                {getUserTasksList.length === 0 ? (
                  <>
                    <div className='flex justify-center items-center min-h-[20vh] border border-gray-200 rounded-lg'>
                      <div className='text-gray-500 flex flex-col items-center justify-center mt-4'>
                        <CheckCircleOutlined className='text-4xl' />
                        <div className='mt-4 text-gray-300'>
                          还没有添加任何任务
                        </div>
                        <Button
                          type='primary'
                          onClick={onCreateTask}
                          className='mt-4 w-full mt-10 mb-8'
                        >
                          添加第一个任务
                        </Button>
                      </div>
                    </div>
                  </>
                ) : filteredTasksList.length === 0 ? (
                  <>
                    <div className='flex justify-center items-center min-h-[20vh] border border-gray-200 rounded-lg'>
                      <div className='text-gray-500 flex flex-col items-center justify-center mt-4'>
                        <CheckCircleOutlined className='text-4xl' />
                        <div className='mt-4 text-gray-300'>
                          {activeStatus === 'pending'
                            ? '暂无待完成的任务'
                            : activeStatus === 'completed'
                              ? '暂无已完成的任务'
                              : '暂无任务'}
                        </div>
                        <Button
                          type='primary'
                          onClick={onCreateTask}
                          className=' w-full mt-10 mb-8'
                        >
                          添加任务
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  filteredTasksList.map(item => {
                    return (
                      <div
                        key={item.id}
                        className='border-2 mb-2 flex items-center rounded-2xl p-3'
                      >
                        <div className='pr-4 pt-1'>
                          <Checkbox
                            className='scale-150 transition-transform hover:scale-[1.6]'
                            checked={item.is_completed}
                            disabled={item.is_completed}
                            onClick={() => {
                              if (!item.is_completed) {
                                completeTask(item)
                              }
                            }}
                          />
                        </div>

                        {/* item */}
                        <div className='flex w-full items-center justify-between text-base'>
                          <div className='flex flex-col gap-1'>
                            <div
                              className={`font-medium text-base ${
                                item.is_completed
                                  ? 'text-gray-400 line-through'
                                  : ''
                              }`}
                            >
                              {item.name}
                            </div>
                            <div className='flex items-center gap-2 flex-wrap'>
                              <div className='inline-flex items-center rounded-2xl border border-green-200 bg-green-50 px-3 py-1 text-xs text-green-500 shadow-sm'>
                                +{item.create_point} 积分
                              </div>
                              {item.task_type && (
                                <span className='rounded-full bg-blue-50 px-2 py-px text-[10px] text-blue-600'>
                                  {item.task_type}
                                </span>
                              )}
                              {repeatableLabel(item.is_repeatable) && (
                                <span className='rounded-full bg-yellow-50 px-2 py-px text-[10px] text-yellow-600'>
                                  {repeatableLabel(item.is_repeatable)}
                                </span>
                              )}
                              <span className='text-[10px] text-gray-400'>
                                {formatDate(item.created_at)}
                              </span>
                            </div>
                            {item.is_completed && item.completed_at && (
                              <div>
                                <span className='text-[10px] text-green-500'>
                                  已完成于{formatDate(item.completed_at)}
                                </span>
                              </div>
                            )}
                          </div>
                          <Popconfirm
                            title='确定要删除这个任务吗？'
                            description='删除后无法恢复，请谨慎操作。'
                            onConfirm={() => deleteTask(item)}
                            okText='确定'
                            cancelText='取消'
                            okType='danger'
                          >
                            <button
                              className='text-gray-400 transition-colors hover:text-red-500'
                              aria-label='删除任务'
                            >
                              <DeleteOutlined className='text-red-500' />
                            </button>
                          </Popconfirm>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* performance */}
      <div className='flex place-content-between mt-4 w-2/5 mx-auto'>
        {footerCount(getUserTasksList).total > 0 && (
          <>
            <div>待完成：{footerCount(getUserTasksList).pending}个</div>
            <div>已完成：{footerCount(getUserTasksList).completed}个</div>
          </>
        )}
      </div>
    </>
  )
}

export default GetUserTasksList
