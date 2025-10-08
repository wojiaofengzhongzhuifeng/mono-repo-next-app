import { create } from 'zustand'

interface GlobalStore {
  globalNumber: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useGlobalStore = create<GlobalStore>(set => ({
  globalNumber: 0,
  increment: () => set(state => ({ globalNumber: state.globalNumber + 1 })),
  decrement: () => set(state => ({ globalNumber: state.globalNumber - 1 })),
  reset: () => set({ globalNumber: 0 }),
}))
