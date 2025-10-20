import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IconGenerationState, IconGenerationResult } from '@/types/icon'

interface IconStore extends IconGenerationState {
  setGenerating: (isGenerating: boolean) => void
  setCurrentResult: (result: IconGenerationResult | null) => void
  addToHistory: (result: IconGenerationResult) => void
  removeFromHistory: (id: string) => void
  clearHistory: () => void
  setError: (error: string | null) => void
  reset: () => void
}

const initialState: IconGenerationState = {
  isGenerating: false,
  currentResult: null,
  history: [],
  error: null,
}

export const useIconStore = create<IconStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setGenerating: isGenerating => set({ isGenerating }),

      setCurrentResult: result => set({ currentResult: result }),

      addToHistory: result => {
        const currentHistory = get().history
        const newHistory = [result, ...currentHistory].slice(0, 50) // 保留最近50个
        set({ history: newHistory })
      },

      removeFromHistory: id => {
        const currentHistory = get().history
        const newHistory = currentHistory.filter(item => item.id !== id)
        set({ history: newHistory })
      },

      clearHistory: () => set({ history: [] }),

      setError: error => set({ error }),

      reset: () => set(initialState),
    }),
    {
      name: 'icon-generator-storage',
      partialize: state => ({
        history: state.history,
      }),
    }
  )
)
