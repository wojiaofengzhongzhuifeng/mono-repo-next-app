import { create } from 'zustand'
import { NumberItem } from '@count-number-types'

interface AppStore {
  numbers: NumberItem[]
  setNumbers: (newNumbers: NumberItem[]) => void
  getNumbersLoading: boolean | null
  setGetNumbersLoading: (newGetNumbersLoading: boolean) => void
}

export const useAppStore = create<AppStore>(set => ({
  numbers: [],
  setNumbers: (newNumbers: NumberItem[]) => set({ numbers: newNumbers }),
  getNumbersLoading: null,
  setGetNumbersLoading: (newGetNumbersLoading: boolean) =>
    set({ getNumbersLoading: newGetNumbersLoading }),
}))
