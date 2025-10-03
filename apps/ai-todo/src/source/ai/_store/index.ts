import { create } from 'zustand'

interface AiStore {
  countNumber: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useAiStore = create<AiStore>((set) => ({
  countNumber: 100,
  increment: () => set((state) => ({ countNumber: state.countNumber + 1 })),
  decrement: () => set((state) => ({ countNumber: state.countNumber - 1 })),
  reset: () => set({ countNumber: 100 }),
}))
