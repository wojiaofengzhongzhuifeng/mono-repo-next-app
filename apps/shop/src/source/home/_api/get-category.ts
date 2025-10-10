import { get } from '@mono-repo/utils'
import { GET_CATEGORY } from '@/source/home/_api/mock'

/**
 * 0. 定义请求与响应的数据结构
 */

// 产品信息接口
export interface Product {
  id: number
  productName: string
  productImg: string
  productDesc: string
  price: number
  stock: number
}

// 分类信息接口
export interface Category {
  id: number
  categoryName: string
  categoryDesc: string
  products: Product[]
}

// 接口返回数据
export type GetCountNumberResponseData = Category[]

/**
 * 1. 配置请求代码
 */
const API_CONFIG = {
  url: '/api/category',
  useMock: true,
  mockData: GET_CATEGORY,
}

/**
 * 2. 请求代码 + 通用逻辑 + 错误处理
 */
export const getCategoryRequest =
  async (): Promise<GetCountNumberResponseData> => {
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

      const res = await get<GetCountNumberResponseData>({
        url: API_CONFIG.url,
      })

      console.log('res', res)
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
