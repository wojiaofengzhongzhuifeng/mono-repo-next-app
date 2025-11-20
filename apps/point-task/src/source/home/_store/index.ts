import { GetUserInfoResponse } from '@/source/home/_api/getUserInfo'
import { create } from 'zustand'
import { GetUserTargetListRequset } from '../_api/getUserTargetList'
import { GetUserTasksListRequset } from '../_api/getUserTasksList'
import { PostUserCreatedTargetsRequset } from '../_api/postUserTarget'
import { PostUserCreatedTasksRequset } from '../_api/postUserTask'

interface AppStore {
  countNumber: number
  setCountNumber: (newNumber: number) => void

  userInfo: GetUserInfoResponse | null
  setUserInfo: (newUserInfo: GetUserInfoResponse) => void

  createdTargets: PostUserCreatedTargetsRequset[]
  setCreatedTargets: (newTargets: PostUserCreatedTargetsRequset[]) => void

  createdTasks: PostUserCreatedTasksRequset[]
  setCreatedTasks: (createdTasks: PostUserCreatedTasksRequset[]) => void

  getUserTasksList: GetUserTasksListRequset[]
  setGetUserTasksList: (getUserTasksList: GetUserTasksListRequset[]) => void

  getUserTargetList: GetUserTargetListRequset[]
  setGetUserTargetList: (getUserTargetList: GetUserTargetListRequset[]) => void
}

export const useAppStore = create<AppStore>(set => ({
  countNumber: 0,
  setCountNumber: newNumber => set({ countNumber: newNumber }),

  userInfo: null,
  setUserInfo: newUserInfo => set({ userInfo: newUserInfo }),

  createdTargets: [],
  setCreatedTargets: newTargets => set({ createdTargets: newTargets }),

  createdTasks: [],
  setCreatedTasks: newTasks => set({ createdTasks: newTasks }),

  getUserTasksList: [],
  setGetUserTasksList: getTaskList => set({ getUserTasksList: getTaskList }),

  getUserTargetList: [],
  setGetUserTargetList: getTargetList =>
    set({ getUserTargetList: getTargetList }),
}))
