import { get } from '@mono-repo/utils'
import { USER_INFO } from './mock'

/**
 * 0. 定义请求与响应的数据结构
 */

// 接口返回数据
export type UserInfoResponseData = {
    "id": number// 1,
    "user_id": string//"user001",
    "nickname": string// "测试用户",
    "created_at": string// "2025-10-27T12:53:52.160Z",
    "totalPoints": number // 1500
}

/**
 * 1. 配置请求代码
 */
const API_CONFIG = {
  url: '/api/users/:userId',
  useMock: false,
  mockData : USER_INFO
}

/**
 * 2. 请求代码 + 通用逻辑 + 错误处理
 */
export const getUserInfo =
  async (userId: string): Promise<UserInfoResponseData> => {
    try {
      if (API_CONFIG.useMock) {
        const res = API_CONFIG.mockData
        if (res.code === 200) {
          // 正常获取数据
          return res.data
        } else {
          throw new Error('获取数据失败： 业务错误')
        }
      }

      const url = API_CONFIG.url.replace(':userId', userId);

      const res = await get<UserInfoResponseData>({
        url:url,
      })

      if (res.code === 200) {
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
