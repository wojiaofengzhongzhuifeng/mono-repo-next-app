import { create } from 'zustand'
import { UserInfoResponseData } from '../_api/get-user-info'

interface AppStore {
  countNumber: number
  setCountNumber: (newNumber: number) => void

  userInfo: UserInfoResponseData | null
  setUserInfo: (info: UserInfoResponseData) => void
}

export const useAppStore = create<AppStore>(set => ({
  countNumber: 0,
  setCountNumber: newNumber => set({ countNumber: newNumber }),
  userInfo: null,
  setUserInfo: info => set({ userInfo: info }),
}))
