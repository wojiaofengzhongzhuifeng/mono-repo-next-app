/**
 * 公共类型定义 - User 模块的请求和响应数据结构
 */

/**
 * Number 数据项
 */
export interface NumberItem {
  id: number
  value: number
  label: string
  description?: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

/**
 * 创建 Number 请求
 */
export interface CreateNumberRequest {
  value: number
  label: string
  description?: string
  status?: 'active' | 'inactive'
}

/**
 * 更新 Number 请求
 */
export interface UpdateNumberRequest {
  value?: number
  label?: string
  description?: string
  status?: 'active' | 'inactive'
}

// 响应类型从 @mono-repo/utils 导入
// import { ApiResponse } from '@mono-repo/utils'
