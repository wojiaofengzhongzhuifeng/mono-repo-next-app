import { get } from '@mono-repo/utils'
import { GET_BANNER } from '@/source/home/_api/mock'

/**
 * 0. 定义请求与响应的数据结构
 */

// Banner信息接口
export interface Banner {
  id: number
  imageUrl: string
}

// 接口返回数据
export type GetBannerResponseData = Banner[]

/**
 * 1. 配置请求代码
 */
const API_CONFIG = {
  url: '/api/images',
  useMock: false,
  mockData: GET_BANNER,
}

/**
 * 2. 请求代码 + 通用逻辑 + 错误处理
 */
export const getBannerRequest = async (): Promise<GetBannerResponseData> => {
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

    const res = await get<GetBannerResponseData>({
      url: API_CONFIG.url,
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
