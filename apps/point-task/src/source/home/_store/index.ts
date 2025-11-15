import { create } from 'zustand'

interface AppStore {
  countNumber: number
  setCountNumber: (newNumber: number) => void
}

export const useAppStore = create<AppStore>(set => ({
  countNumber: 0,
  setCountNumber: newNumber => set({ countNumber: newNumber }),
}))
