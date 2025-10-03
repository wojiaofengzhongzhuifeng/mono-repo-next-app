import { Todo } from '@/source/_types'

export const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-100'
    case 'medium':
      return 'text-yellow-600 bg-yellow-100'
    case 'low':
      return 'text-green-600 bg-green-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export const getPriorityLabel = (priority: 'low' | 'medium' | 'high', language: 'zh-CN' | 'en') => {
  const labels = {
    'zh-CN': {
      high: '高',
      medium: '中',
      low: '低',
    },
    'en': {
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    },
  }
  return labels[language][priority]
}

export const formatDate = (date: Date, language: 'zh-CN' | 'en') => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Intl.DateTimeFormat(language === 'zh-CN' ? 'zh-CN' : 'en-US', options).format(date)
}

export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}

export const filterTodos = (todos: Todo[], filter: 'all' | 'completed' | 'pending') => {
  switch (filter) {
    case 'completed':
      return todos.filter(todo => todo.completed)
    case 'pending':
      return todos.filter(todo => !todo.completed)
    default:
      return todos
  }
}

export const sortTodos = (todos: Todo[], sortBy: 'createdAt' | 'priority' | 'text') => {
  const sorted = [...todos]
  
  switch (sortBy) {
    case 'priority':
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    case 'text':
      return sorted.sort((a, b) => a.text.localeCompare(b.text))
    case 'createdAt':
    default:
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
}

export const calculateStreak = (todos: Todo[]): number => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const completedToday = todos.filter(todo => {
    if (!todo.completed) return false
    const todoDate = new Date(todo.updatedAt)
    todoDate.setHours(0, 0, 0, 0)
    return todoDate.getTime() === today.getTime()
  })
  
  return completedToday.length > 0 ? 1 : 0
}

export const getThemeClasses = (theme: 'light' | 'dark' | 'system') => {
  const baseClasses = {
    light: {
      bg: 'bg-gray-50',
      text: 'text-gray-900',
      card: 'bg-white',
      border: 'border-gray-200',
    },
    dark: {
      bg: 'bg-gray-900',
      text: 'text-white',
      card: 'bg-gray-800',
      border: 'border-gray-700',
    },
    system: {
      bg: 'bg-gray-50 dark:bg-gray-900',
      text: 'text-gray-900 dark:text-white',
      card: 'bg-white dark:bg-gray-800',
      border: 'border-gray-200 dark:border-gray-700',
    },
  }
  
  return baseClasses[theme]
}
