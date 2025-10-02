import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// 用户偏好设置的业务域
interface UserPreferencesState {
  // 主题相关
  theme: 'light' | 'dark' | 'system'
  language: 'zh-CN' | 'en-US'
  
  // 显示相关
  fontSize: 'small' | 'medium' | 'large'
  sidebarCollapsed: boolean
  
  // 通知相关
  emailNotifications: boolean
  pushNotifications: boolean
  
  // 动作方法
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setLanguage: (language: 'zh-CN' | 'en-US') => void
  setFontSize: (size: 'small' | 'medium' | 'large') => void
  toggleSidebar: () => void
  toggleEmailNotifications: () => void
  togglePushNotifications: () => void
  resetPreferences: () => void
}

const initialPreferences: Omit<UserPreferencesState, 'setTheme' | 'setLanguage' | 'setFontSize' | 'toggleSidebar' | 'toggleEmailNotifications' | 'togglePushNotifications' | 'resetPreferences'> = {
  theme: 'system',
  language: 'zh-CN',
  fontSize: 'medium',
  sidebarCollapsed: false,
  emailNotifications: true,
  pushNotifications: true,
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  devtools(
    persist(
      (set) => ({
        ...initialPreferences,
        
        // 主题相关方法
        setTheme: (theme) => set({ theme }),
        setLanguage: (language) => set({ language }),
        
        // 显示相关方法
        setFontSize: (fontSize) => set({ fontSize }),
        toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
        
        // 通知相关方法
        toggleEmailNotifications: () => set((state) => ({ emailNotifications: !state.emailNotifications })),
        togglePushNotifications: () => set((state) => ({ pushNotifications: !state.pushNotifications })),
        
        // 重置方法
        resetPreferences: () => set(initialPreferences),
      }),
      {
        name: 'user-preferences-storage',
        // 所有用户偏好设置都值得持久化
      }
    ),
    {
      name: 'user-preferences-store',
    }
  )
)