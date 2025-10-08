import { post } from '@/utils/request'
import { GET_QUARTERLY_INTEREST_DETAIL_MOCK_DATA } from '@vip-loan/_api2/mock'

/**
 * 0. 定义请求与响应的数据结构
 */

// 接口返回数据
export type GetCountNumberResponseData = {
  number: number
  id: number
  testList: number[]
}
/**
 * 1. 配置请求代码
 */
const API_CONFIG = {
  url: '/api/web/v1/tst/otc_loan/get_quarterly_interest_detail',
  useMock: true,
  mockData: GET_QUARTERLY_INTEREST_DETAIL_MOCK_DATA,
}

/**
 * 2. 请求代码 + 通用逻辑 + 错误处理
 */
export const getQuarterlyInterestDetail =
  async (): Promise<GetQuarterlyInterestDetailResponseData> => {
    try {
      if (API_CONFIG.useMock) {
        const res = API_CONFIG.mockData
        if (res.code === 0) {
          // 正常获取数据
          if (Array.isArray(res.data)) {
            return res.data
          } else {
            return []
          }
        } else {
          throw new Error('获取数据失败： 业务错误')
        }
      }

      const res = await post<GetQuarterlyInterestDetailResponseData>({
        url: API_CONFIG.url,
      })
      if (res.code === 0) {
        // 正常获取数据
        if (Array.isArray(res.data)) {
          return res.data
        } else {
          return []
        }
      } else {
        throw new Error('获取数据失败： 业务错误')
      }
    } catch (error) {
      logger.error('获取数据失败：', error)
      // 获取数据失败： httpcode 非200
      throw new Error('获取数据失败： httpcode 非200')
    }
  }
