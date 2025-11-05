import { post } from '@mono-repo/utils'
import { USER_TARGETS } from './mockData'

export type UserTargetsRequestDataItem = {
  name: string
  description: string
  need_point: number
  user_id: string
}

export type CreateTargetRequestData = UserTargetsRequestDataItem[]

export type CreateTargetResponseItemData = {
  id: number
  name: string
  description: string
  need_point: number
  user_id: string
  is_redeemed: boolean
  created_at: string
}

export type UserTargetsResponseData = CreateTargetResponseItemData[]

const API_CONFIG = {
  url: '/api/targets',
  useMock: false,
  mockData: USER_TARGETS,
}

export const postUserTargets = async (
  createTargetRequestData: CreateTargetRequestData
): Promise<UserTargetsResponseData> => {
  try {
    console.log('创建目标数据:321', createTargetRequestData)
    const res = await post<UserTargetsResponseData>({
      url: API_CONFIG.url,
      data: createTargetRequestData,
    })

    if (res.code === 0) {
      return res.data
    } else {
      throw new Error('获取数据失败： 业务错误')
    }
  } catch (error) {
    console.error('获取数据失败：', error)
    throw new Error('获取数据失败： httpcode 非200')
  }
}
