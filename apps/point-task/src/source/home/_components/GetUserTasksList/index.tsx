import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Checkbox } from 'antd'
import { useGetUserTasksListHooks } from '../../_api/getUserTasksList'
import { useAppStore } from '../../_store'

interface GetTaskListProps {
  onBack: () => void
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

function GetUserTasksList({ onBack }: GetTaskListProps) {
  const { getUserTasksList } = useAppStore()
  const { setGetUserTasksList } = useGetUserTasksListHooks()

  const renderUserTasksList = () => {
    return (
      <>
        <div>
          <div>
            {getUserTasksList.map(item => {
              return (
                <div
                  key={item.id}
                  className='border-2 mb-2 flex items-center rounded-2xl p-3'
                >
                  <div className='pr-4 pt-1'>
                    <Checkbox className='scale-150 transition-transform hover:scale-[1.6]' />
                  </div>
                  {/* item */}
                  <div className='flex w-full items-center justify-between text-base'>
                    <div className='flex flex-col gap-1'>
                      <div className='font-medium text-base'>{item.name}</div>
                      <div className='flex items-center gap-2'>
                        <div className='inline-flex items-center rounded-2xl border border-green-200 bg-green-50 px-3 py-1 text-xs text-green-500 shadow-sm'>
                          +{item.create_point} 积分
                        </div>
                        <div className='text-[10px] text-gray-400 space-x-1'>
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
                          <span>{formatDate(item.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      className='text-gray-400 transition-colors hover:text-red-500'
                      aria-label='删除任务'
                    >
                      <DeleteOutlined className='text-red-500' />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
  console.log('getUserTasksList', getUserTasksList)
  return (
    <>
      <div className='bg-white-200 p-6 w-2/5 mx-auto rounded-lg shadow-lg mt-4'>
        {/* head */}
        <div className=' flex'>
          <div>
            <ArrowLeftOutlined onClick={onBack} />
          </div>
          <div className='mx-2'>我的任务</div>
        </div>

        {/* navigation */}
        <div className='mt-4'>
          <div>
            <Button type='primary' className=' shadow-lg rounded-full mr-2'>
              全部
            </Button>
            <Button type='primary' className=' shadow-lg rounded-full mr-2'>
              待完成
            </Button>

            <Button type='primary' className=' shadow-lg rounded-full mr-2'>
              已完成
            </Button>
          </div>
        </div>

        {/* taskList */}
        <div className='mt-4'>
          <div className=''>{renderUserTasksList()}</div>
        </div>
      </div>

      {/* performance */}
      <div className='flex place-content-between mt-4 w-2/5 mx-auto'>
        <div>待完成：{0}个</div>
        <div>已完成：{0}个</div>
        <div>已领取：{0}个</div>
      </div>
    </>
  )
}

export default GetUserTasksList
