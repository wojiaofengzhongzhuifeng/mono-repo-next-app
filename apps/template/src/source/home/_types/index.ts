export interface CountNumber {
  id: string
  value: number
  label: string
  createdAt: Date
  updatedAt: Date
}

export interface CountNumberStats {
  total: number
  average: number
  max: number
  min: number
}

export interface CountOperation {
  id: string
  type: 'increment' | 'decrement' | 'reset'
  value: number
  timestamp: Date
}

export interface AppState {
  theme: 'light' | 'dark' | 'system'
  language: 'zh-CN' | 'en'
}
