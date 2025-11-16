import axios from 'axios'
import {
  NumberItem,
  CreateNumberRequest,
  UpdateNumberRequest,
} from '@/types/number'
import { getEnv } from '@/lib/env'

const { NEXT_PUBLIC_API_URL } = getEnv()
const API_BASE_URL = NEXT_PUBLIC_API_URL

export const numberService = {
  async getNumbers(): Promise<NumberItem[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/numbers`)

      // 验证响应格式
      if (response.data.success) {
        return response.data.data || []
      } else {
        throw new Error(response.data.error || 'Failed to fetch numbers')
      }
    } catch (error) {
      console.error('Failed to fetch numbers:', error)

      // 开发环境下显示详细错误，生产环境返回空数组
      if (process.env.NODE_ENV === 'development') {
        console.warn('API 调用失败，请确保后端服务正在运行在', API_BASE_URL)
      }

      // 抛出错误让调用方处理
      throw new Error('无法获取数字列表，请检查网络连接或稍后重试')
    }
  },

  async createNumber(data: CreateNumberRequest): Promise<NumberItem> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/numbers`,
        data
      )

      if (response.data.success) {
        return response.data.data
      } else {
        throw new Error(response.data.error || 'Failed to create number')
      }
    } catch (error) {
      console.error('Failed to create number:', error)
      if (process.env.NODE_ENV === 'development') {
        console.warn('API 调用失败，请确保后端服务正在运行在', API_BASE_URL)
      }
      throw new Error('无法创建数字，请检查网络连接或稍后重试')
    }
  },

  async updateNumber(
    id: number,
    data: UpdateNumberRequest
  ): Promise<NumberItem> {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/admin/numbers/${id}`,
        data
      )

      if (response.data.success) {
        return response.data.data
      } else {
        throw new Error(response.data.error || 'Failed to update number')
      }
    } catch (error) {
      console.error('Failed to update number:', error)
      if (process.env.NODE_ENV === 'development') {
        console.warn('API 调用失败，请确保后端服务正在运行在', API_BASE_URL)
      }
      throw new Error('无法更新数字，请检查网络连接或稍后重试')
    }
  },

  async deleteNumber(id: number): Promise<void> {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/admin/numbers/${id}`
      )

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to delete number')
      }
    } catch (error) {
      console.error('Failed to delete number:', error)
      if (process.env.NODE_ENV === 'development') {
        console.warn('API 调用失败，请确保后端服务正在运行在', API_BASE_URL)
      }
      throw new Error('无法删除数字，请检查网络连接或稍后重试')
    }
  },
}
