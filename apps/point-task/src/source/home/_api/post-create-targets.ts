import { get, post } from '@mono-repo/utils'
import { USER_TARGETS } from './mock'

/**
 * 0. 定义请求与响应的数据结构
 */

// 接口返回数据
export type UserTargetsResponseDataItem = {
  name: string // '买一台新电脑123321'
  description: string // '用于学习和编程'
  need_point: number // 100
  user_id: string // 'user001'
}
export type CreateTargetRequestData = UserTargetsResponseDataItem[]

export type CreateTargetResponseItemData = {
  id: number // 6
  name: string // '买一台新电脑123321'
  description: string // '用于学习和编程'
  need_point: number // 100
  user_id: string // 'user001'
  is_redeemed: boolean // false
  created_at: string // '2025-11-04T09:16:51.404Z'
}
export type UserTargetsResponseData = CreateTargetResponseItemData[]

/**
 * 1. 配置请求代码
 */
const API_CONFIG = {
  url: '/api/targets',
  useMock: false,
  mockData: USER_TARGETS,
}

/**USER_
 * 2. 请求代码 + 通用逻辑 + 错误处理
 */
export const postUserTargets = async (
  createTargetRequestData: CreateTargetRequestData
): Promise<UserTargetsResponseData> => {
  try {
    const res = await post<UserTargetsResponseData>({
      url: API_CONFIG.url,
      data: createTargetRequestData,
    })

    if (res.code === 0) {
      // 正常获取数据
      return res.data
    } else {
      throw new Error('获取数据失败： 业务错误')
    }
  } catch (error) {
    console.error('获取数据失败：', error)
    // 获取数据失败： httpcode 非200
    throw new Error('获取数据失败： httpcode 非200')
  }
}
