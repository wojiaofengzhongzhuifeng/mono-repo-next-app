import { create } from 'zustand'
import { UserInfoResponseData } from '../_api/get-user-info'
import { UserTargetsResponseData } from '../_api/get-user-targets'

interface AppStore {
  countNumber: number
  setCountNumber: (newNumber: number) => void

  userInfo: UserInfoResponseData | null
  setUserInfo: (info: UserInfoResponseData) => void

  userTargets: UserTargetsResponseData[] | null
  setUserTargets: (targets: UserTargetsResponseData[]) => void

  goalsCard: {
    name: string
    need_points: string | number
    user_id: string
    is_redeemed: boolean
    created_at: number
    description: string | null
  }[]
  setGoalsCard: (
    cards: {
      name: string
      need_points: string | number
      user_id: string
      is_redeemed: boolean
      created_at: number
      description: string | null
    }[]
  ) => void
}

export const useAppStore = create<AppStore>(set => ({
  countNumber: 0,
  setCountNumber: newNumber => set({ countNumber: newNumber }),
  userInfo: null,
  setUserInfo: info => set({ userInfo: info }),

  userTargets: null,
  setUserTargets: targets => set({ userTargets: targets }),

  goalsCard: [],
  setGoalsCard: cards => set({ goalsCard: cards }),
}))
