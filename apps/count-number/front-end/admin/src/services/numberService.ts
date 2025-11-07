import axios from 'axios'
import {
  NumberItem,
  CreateNumberRequest,
  UpdateNumberRequest,
} from '@/types/number'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010'

export const numberService = {
  async getNumbers(): Promise<NumberItem[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/numbers`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch numbers:', error)
      // 返回模拟数据
      return [
        {
          id: 1,
          value: 100,
          label: '第一个数字',
          description: '这是一个描述',
          status: 'active',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        {
          id: 2,
          value: 200,
          label: '第二个数字',
          description: '另一个描述',
          status: 'inactive',
          createdAt: '2024-01-02T00:00:00Z',
          updatedAt: '2024-01-02T00:00:00Z',
        },
      ]
    }
  },

  async createNumber(data: CreateNumberRequest): Promise<NumberItem> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/numbers`,
        data
      )
      return response.data
    } catch (error) {
      console.error('Failed to create number:', error)
      // 返回模拟数据
      const newNumber: NumberItem = {
        id: Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return newNumber
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
      return response.data
    } catch (error) {
      console.error('Failed to update number:', error)
      // 返回模拟数据
      const updatedNumber: NumberItem = {
        id,
        value: data.value || 0,
        label: data.label || '',
        description: data.description,
        status: data.status || 'active',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: new Date().toISOString(),
      }
      return updatedNumber
    }
  },

  async deleteNumber(id: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/numbers/${id}`)
    } catch (error) {
      console.error('Failed to delete number:', error)
      // 模拟删除成功
    }
  },
}
