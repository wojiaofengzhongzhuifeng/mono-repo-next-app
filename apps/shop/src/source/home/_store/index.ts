import { create } from 'zustand'

interface AppStore {
  countNumber: number
  setCountNumber: (newNumber: number) => void

  testList: number[] | null
  setTestList: (newList: number[]) => void
}

export const useAppStore = create<AppStore>(set => ({
  countNumber: 100,
  setCountNumber: (newNumber: number) => set({ countNumber: newNumber }),

  testList: null,
  setTestList: (newList: number[]) => set({ testList: newList }),
}))
