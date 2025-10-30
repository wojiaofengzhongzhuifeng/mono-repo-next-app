import { create } from 'zustand'

interface AppStore {

  countNumber: number
  setCountNumber: (newNumber: number) => void

  userInfo: Record<string, any>
  setUserInfo: (info: Record<string, any>) => void
}

export const useAppStore = create<AppStore>(set => ({
  countNumber: 0,
  setCountNumber: (newNumber) => set({ countNumber: newNumber }), 
  userInfo: {},
  setUserInfo: (info) => set({ userInfo: info }),
}))
