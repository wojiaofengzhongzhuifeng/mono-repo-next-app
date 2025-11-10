import { create } from 'zustand'
import { GetCountNumberResponse } from '@/source/home/_api/get-number'

interface AppStore {
  numbers: GetCountNumberResponse[]
  setNumbers: (newNumbers: GetCountNumberResponse[]) => void
  getNumbersLoading: boolean | null
  setGetNumbersLoading: (newGetNumbersLoading: boolean) => void
}

export const useAppStore = create<AppStore>(set => ({
  numbers: [],
  setNumbers: (newNumbers: GetCountNumberResponse[]) =>
    set({ numbers: newNumbers }),
  getNumbersLoading: null,
  setGetNumbersLoading: (newGetNumbersLoading: boolean) =>
    set({ getNumbersLoading: newGetNumbersLoading }),
}))
