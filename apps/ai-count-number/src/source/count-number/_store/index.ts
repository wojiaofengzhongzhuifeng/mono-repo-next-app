import { create } from 'zustand'

interface CountNumberStore {
  countNumber: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCountNumberStore = create<CountNumberStore>((set) => ({
  countNumber: 100,
  increment: () => set((state) => ({ countNumber: state.countNumber + 1 })),
  decrement: () => set((state) => ({ countNumber: state.countNumber - 1 })),
  reset: () => set({ countNumber: 100 }),
}))
