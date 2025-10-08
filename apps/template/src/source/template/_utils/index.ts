import { CountNumber } from '@/source/template/_types'

export const getNumberColor = (value: number) => {
  if (value > 100) return 'text-green-600 bg-green-100'
  if (value > 50) return 'text-blue-600 bg-blue-100'
  if (value > 0) return 'text-yellow-600 bg-yellow-100'
  return 'text-red-600 bg-red-100'
}

export const getOperationLabel = (
  operation: 'increment' | 'decrement' | 'reset',
  language: 'zh-CN' | 'en'
) => {
  const labels = {
    'zh-CN': {
      increment: '增加',
      decrement: '减少',
      reset: '重置',
    },
    en: {
      increment: 'Increment',
      decrement: 'Decrement',
      reset: 'Reset',
    },
  }
  return labels[language][operation]
}

export const formatDate = (date: Date, language: 'zh-CN' | 'en') => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Intl.DateTimeFormat(
    language === 'zh-CN' ? 'zh-CN' : 'en-US',
    options
  ).format(date)
}

export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}

export const filterNumbers = (
  numbers: CountNumber[],
  filter: 'all' | 'positive' | 'negative' | 'zero'
) => {
  switch (filter) {
    case 'positive':
      return numbers.filter(num => num.value > 0)
    case 'negative':
      return numbers.filter(num => num.value < 0)
    case 'zero':
      return numbers.filter(num => num.value === 0)
    default:
      return numbers
  }
}

export const sortNumbers = (
  numbers: CountNumber[],
  sortBy: 'value' | 'label' | 'createdAt'
) => {
  const sorted = [...numbers]

  switch (sortBy) {
    case 'value':
      return sorted.sort((a, b) => a.value - b.value)
    case 'label':
      return sorted.sort((a, b) => a.label.localeCompare(b.label))
    case 'createdAt':
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  }
}

export const calculateStats = (numbers: CountNumber[]) => {
  if (numbers.length === 0) {
    return {
      total: 0,
      average: 0,
      max: 0,
      min: 0,
    }
  }

  const values = numbers.map(num => num.value)
  const total = values.reduce((sum, val) => sum + val, 0)
  const average = total / values.length
  const max = Math.max(...values)
  const min = Math.min(...values)

  return { total, average, max, min }
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
