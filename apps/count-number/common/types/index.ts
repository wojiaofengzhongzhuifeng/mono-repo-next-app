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

/**
 * API 通用响应结构
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

/**
 * 获取 Number 列表响应
 */
export type GetNumbersResponse = ApiResponse<NumberItem[]>

/**
 * 获取单个 Number 响应
 */
export type GetNumberResponse = ApiResponse<NumberItem>

/**
 * 创建 Number 响应
 */
export type CreateNumberResponse = ApiResponse<NumberItem>

/**
 * 更新 Number 响应
 */
export type UpdateNumberResponse = ApiResponse<NumberItem>

/**
 * 删除 Number 响应
 */
export type DeleteNumberResponse = ApiResponse<{ id: number }>
