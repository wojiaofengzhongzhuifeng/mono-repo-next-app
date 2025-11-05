import { create } from 'zustand'
import { UserInfoResponseData } from '../_api/getUserProfile'
import { UserTargetsResponseData } from '../_api/getUserGoals'
import { UserAddTaskRequestDataItem } from '../_api/AddTask'

interface AppStore {
  countNumber: number
  setCountNumber: (newNumber: number) => void

  userInfo: UserInfoResponseData | null
  setUserInfo: (info: UserInfoResponseData) => void
  updateUserPoints: (newPoints: number) => void

  userTargets: UserTargetsResponseData[] | null
  setUserTargets: (targets: UserTargetsResponseData[]) => void

  userAddTask: UserAddTaskRequestDataItem[] | null
  setUserAddTask: (tasks: UserAddTaskRequestDataItem[]) => void
}

export const useAppStore = create<AppStore>(set => ({
  countNumber: 0,
  setCountNumber: newNumber => set({ countNumber: newNumber }),
  userInfo: null,
  setUserInfo: info => set({ userInfo: info }),
  updateUserPoints: newPoints =>
    set(state => ({
      userInfo: state.userInfo
        ? { ...state.userInfo, totalPoints: newPoints }
        : null,
    })),

  userTargets: null,
  setUserTargets: targets => set({ userTargets: targets }),

  userAddTask: null,
  setUserAddTask: tasks => set({ userAddTask: tasks }),
}))
