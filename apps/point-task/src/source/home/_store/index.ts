import { GetUserInfoResponse } from '@/source/home/_api/getUserInfo'
import { create } from 'zustand'

interface AppStore {
  countNumber: number
  setCountNumber: (newNumber: number) => void

  userInfo: GetUserInfoResponse | null
  setUserInfo: (newUserInfo: GetUserInfoResponse) => void
}

export const useAppStore = create<AppStore>(set => ({
  countNumber: 0,
  setCountNumber: newNumber => set({ countNumber: newNumber }),

  userInfo: null,
  setUserInfo: newUserInfo => set({ userInfo: newUserInfo }),
}))
