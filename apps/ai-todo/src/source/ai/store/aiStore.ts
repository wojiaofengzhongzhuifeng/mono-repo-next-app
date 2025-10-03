import { create } from 'zustand'
import { AISuggestion } from '@/source/ai/_types'

interface AIStore {
  suggestions: AISuggestion[]
  currentSuggestion: AISuggestion | null
  generateSuggestion: () => void
  addSuggestion: (suggestion: AISuggestion) => void
  clearSuggestions: () => void
  getSuggestionByType: (type: 'productivity' | 'priority' | 'planning' | 'wellness') => AISuggestion[]
}

const suggestionTemplates = [
  { text: '建议您优先完成高优先级任务', type: 'priority' as const },
  { text: '您可以尝试使用番茄工作法来提高效率', type: 'productivity' as const },
  { text: '记得在任务之间适当休息，保持专注力', type: 'wellness' as const },
  { text: '将大任务分解为小任务会更容易完成', type: 'planning' as const },
  { text: '建议每天早上规划当天的任务', type: 'planning' as const },
  { text: '完成一个任务后给自己一个小奖励', type: 'wellness' as const },
  { text: '使用时间块方法来安排您的一天', type: 'productivity' as const },
  { text: '定期回顾您的任务完成情况', type: 'planning' as const },
  { text: '保持工作区域整洁有助于提高效率', type: 'productivity' as const },
  { text: '学会说"不"，避免承担过多任务', type: 'priority' as const },
]

export const useAIStore = create<AIStore>((set, get) => ({
  suggestions: [],
  currentSuggestion: null,
  
  generateSuggestion: () => {
    const randomTemplate = suggestionTemplates[Math.floor(Math.random() * suggestionTemplates.length)]
    const newSuggestion: AISuggestion = {
      id: Date.now().toString(),
      text: randomTemplate.text,
      type: randomTemplate.type,
      createdAt: new Date(),
    }
    
    set((state) => ({
      currentSuggestion: newSuggestion,
      suggestions: [newSuggestion, ...state.suggestions].slice(0, 50), // 保留最近50条建议
    }))
  },
  
  addSuggestion: (suggestion: AISuggestion) => {
    set((state) => ({
      suggestions: [suggestion, ...state.suggestions].slice(0, 50),
    }))
  },
  
  clearSuggestions: () => {
    set({
      suggestions: [],
      currentSuggestion: null,
    })
  },
  
  getSuggestionByType: (type: 'productivity' | 'priority' | 'planning' | 'wellness') => {
    const { suggestions } = get()
    return suggestions.filter((suggestion) => suggestion.type === type)
  },
}))
