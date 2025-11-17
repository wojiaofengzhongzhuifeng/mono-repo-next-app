import { ApiConfig, prefixUrl } from '@/source/home/_api/common'
import { post, STATUS_CODE } from '@mono-repo/utils'

// 1. 定义请求与响应的数据结构

// 后端返回的数据结构
export interface PostUserCreatedTasksRequset {
  id: number // 12
  name: string //'完成作业'
  create_point: number //10
  task_type: string //'study'
  is_repeatable: boolean //false
  is_completed: boolean
  comleted_at: null //null
  user_id: string //'user001'
  created_at: string //"2025-11-17T13:50:20.075z"
}

// 2. 配置请求代码
export const apiConfig: ApiConfig = {
  url: `${prefixUrl}/tasks`,
  method: 'POST',
  manual: false,
  showError: true,
}

// 3. 请求代码 + 通用逻辑 + 错误处理
export const postUserCreatedTasksRequest = async (
  tasksData: Omit<
    PostUserCreatedTasksRequset,
    'id' | 'is_redeemed' | 'created_at'
  >
): Promise<PostUserCreatedTasksRequset> => {
  try {
    const res = await post<PostUserCreatedTasksRequset>({
      url: `${apiConfig.url}`,
      data: [tasksData], // 发送数组格式的请求体
    })
    if (res.code === STATUS_CODE.SUCCESS) {
      if (!res.data) {
        throw new Error('获取用户信息失败：返回数据为空')
      }
      return res.data
    } else {
      throw new Error(res.message || '获取用户信息失败')
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    throw new Error('获取用户信息失败')
  }
}
