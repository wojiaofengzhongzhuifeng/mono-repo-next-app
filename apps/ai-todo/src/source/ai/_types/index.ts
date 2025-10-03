export interface Todo {
  id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
  updatedAt: Date
}

export interface TodoStats {
  total: number
  completed: number
  pending: number
  completionRate: number
}

export interface AISuggestion {
  id: string
  text: string
  type: 'productivity' | 'priority' | 'planning' | 'wellness'
  createdAt: Date
}

export interface AppState {
  theme: 'light' | 'dark' | 'system'
  language: 'zh-CN' | 'en'
}
