import { get } from '@mono-repo/utils'
import { USER_TARGETS } from './mockData'

/**
 * 0. 定义请求与响应的数据结构
 */

// 接口返回数据
export type UserTargetsResponseData = {
  need_points: number
  id: number // 1,
  name: string //"iPhone  ",
  description: number // "5000",
  user_id: string // "user001",
  is_redeemed: boolean // true
  created_at: string // "2025-10-27T12:53:52.160Z",
  user: { nickname: string } //测试用户
}

export type UserTargetsResponseDataArray = UserTargetsResponseData[]

/**
 * 1. 配置请求代码
 */
const API_CONFIG = {
  url: '/api/targets?user_id=:userId',
  useMock: false,
  mockData: USER_TARGETS,
}

/**USER_
 * 2. 请求代码 + 通用逻辑 + 错误处理
 */
export const getUserTargets = async (
  userId: string
): Promise<UserTargetsResponseDataArray> => {
  try {
    if (API_CONFIG.useMock) {
      const res = API_CONFIG.mockData
      if (res.code === 0) {
        // 正常获取数据 - 将单个对象包装成数组
        return [res.data]
      } else {
        throw new Error('获取数据失败： 业务错误')
      }
    }

    const url = API_CONFIG.url.replace(':userId', userId)

    const res = await get<UserTargetsResponseDataArray>({
      url: url,
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
