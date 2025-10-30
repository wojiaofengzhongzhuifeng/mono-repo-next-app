import { create } from 'zustand'

interface AppStore {
  userInfo: Record<string, any>
  setUserInfo: (info: Record<string, any>) => void
}

export const useAppStore = create<AppStore>(set => ({
  userInfo: {},
  setUserInfo: (info) => set({ userInfo: info }),
}))
