export interface NumberItem {
  id: number
  value: number
  label: string
  description?: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface CreateNumberRequest {
  value: number
  label: string
  description?: string
  status: 'active' | 'inactive'
}

export interface UpdateNumberRequest {
  value?: number
  label?: string
  description?: string
  status?: 'active' | 'inactive'
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface StatsResponse {
  totalCount: number
  activeCount: number
  inactiveCount: number
}
