import { create } from 'zustand'

interface HomeStore {
  countNumber: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useHomeStore = create<HomeStore>((set) => ({
  countNumber: 10,
  increment: () => set((state) => ({ countNumber: state.countNumber + 1 })),
  decrement: () => set((state) => ({ countNumber: state.countNumber - 1 })),
  reset: () => set({ countNumber: 10 }),
}))
