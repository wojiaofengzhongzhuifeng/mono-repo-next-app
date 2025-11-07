import { create } from 'zustand'
import { Category } from '@/source/home/_api/get-category'
import { Banner } from '@/source/home/_api/get-banner'

interface AppStore {
  countNumber: number
  setCountNumber: (newNumber: number) => void
}

export const useAppStore = create<AppStore>(set => ({
  countNumber: 100,
  setCountNumber: (newNumber: number) => set({ countNumber: newNumber }),
}))
