import { create } from 'zustand'

interface CountNumberStore {
  countNumber: number
  setCountNumber: (newNumber: number) => void

  testList: number[] | null
  setTestList: (newList: number[]) => void
}

export const useCountNumberStore = create<CountNumberStore>(set => ({
  countNumber: 100,
  setCountNumber: (newNumber: number) => set({ countNumber: newNumber }),

  testList: null,
  setTestList: (newList: number[]) => set({ testList: newList }),
}))
