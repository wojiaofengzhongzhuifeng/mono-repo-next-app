import { create } from 'zustand'

interface CountNumberStore {
  countNumber: number
  setCountNumber: (newNumber: number) => void
}

export const useCountNumberStore = create<CountNumberStore>(set => ({
  countNumber: 100,
  setCountNumber: (newNumber: number) => set({ countNumber: newNumber }),
}))
