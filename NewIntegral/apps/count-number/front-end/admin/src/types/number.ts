export interface NumberItem {
  id: number
  value: number
  label: string
  description?: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface CreateNumberRequest {
  value: number
  label: string
  description?: string
  status: 'active' | 'inactive'
}

export interface UpdateNumberRequest extends Partial<CreateNumberRequest> {
  id: number
}
