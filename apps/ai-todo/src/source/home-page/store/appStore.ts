import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AppState } from '@/source/home-page/_types'

interface AppStore extends AppState {
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setLanguage: (language: 'zh-CN' | 'en') => void
  toggleTheme: () => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      language: 'zh-CN',
      
      setTheme: (theme: 'light' | 'dark' | 'system') => {
        set({ theme })
      },
      
      setLanguage: (language: 'zh-CN' | 'en') => {
        set({ language })
      },
      
      toggleTheme: () => {
        const { theme } = get()
        if (theme === 'light') {
          set({ theme: 'dark' })
        } else if (theme === 'dark') {
          set({ theme: 'system' })
        } else {
          set({ theme: 'light' })
        }
      },
    }),
    {
      name: 'app-storage',
    }
  )
)
