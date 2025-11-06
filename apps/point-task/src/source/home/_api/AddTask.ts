import { post } from '@mono-repo/utils'
import { USER_TARGETS } from './mockData'

// 这个是post请求的数据结构
export type UserAddTaskRequestDataItem = {
  name: string
  create_point: number
  task_type: string
  is_repeatable: boolean
  user_id: string
}

export type CreateAddTaskRequestData = UserAddTaskRequestDataItem[]

// 对照Apifox文档生成代码 响应数据 响应数据最好统一方便更改
export type CreateAddTaskResponseItemData = {
  name: string
  create_point: number
  task_type: string
  is_repeatable: boolean
  user_id: string
}

export type UserAddTaskResponseData = CreateAddTaskResponseItemData[]

const API_CONFIG = {
  url: '/api/tasks?user_id=userId',
  useMock: false,
  mockData: USER_TARGETS,
}

export const postUserTasks = async (
  createTaskRequestData: CreateAddTaskRequestData,
  userId: string
): Promise<UserAddTaskResponseData> => {
  try {
    console.log('创建目标数据:321', createTaskRequestData)
    const url = API_CONFIG.url.replace(':userId', userId)
    const res = await post<UserAddTaskResponseData>({
      url: url,
      data: createTaskRequestData,
    })

    if (res.code === 0) {
      return res.data
    } else {
      throw new Error('获取数据失败： 业务错误')
    }
  } catch (error) {
    console.error('获取数据失败：', error)
    throw new Error('获取数据失败： httpcode 非200')
  }
}
