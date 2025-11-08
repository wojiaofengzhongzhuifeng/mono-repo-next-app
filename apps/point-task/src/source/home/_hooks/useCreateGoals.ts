import { useEffect, useRef } from 'react'
import { useRequest } from 'ahooks'
import { useAppStore } from '@/source/home/_store'
import {
  postUserTargets,
  CreateTargetRequestData,
} from '@/source/home/_api/createUserGoals'

export function useCreateTargets() {
  const { data, error, loading, run } = useRequest(postUserTargets, {
    manual: true,
  })

  useEffect(() => {
    console.log('error changed', error)
    if (error) {
      alert(error)
    }
  }, [error])

  return { error, loading, data, run }
}

// 统一的目标创建管理hook
export function useCreateTargetsHooks() {
  const { run, data, error, loading } = useCreateTargets()
  const { userInfo, userTargets, setUserTargets } = useAppStore()
  const processedDataRef = useRef<any[]>([])

  // 创建目标
  const createTargets = async (targetData: CreateTargetRequestData) => {
    try {
      const result = await run(targetData)
      return result
    } catch (error) {
      console.error('创建目标失败:', error)
      throw error
    }
  }

  // 更新目标列表
  useEffect(() => {
    if (!error && data && userInfo) {
      // 检查是否已经处理过这批数据
      const dataId = data.map(item => item.id).join(',')
      if (processedDataRef.current.includes(dataId)) {
        return
      }

      // 标记这批数据为已处理
      processedDataRef.current.push(dataId)

      // 将新创建的目标添加到现有目标列表中
      const currentTargets = userTargets || []
      // 将CreateTargetResponseItemData转换为UserTargetsResponseData格式
      const newTargets = data.map(item => ({
        need_point: item.need_point,
        id: item.id,
        name: item.name,
        description: Number(item.description) || item.need_point, // 将string转换为number，如果转换失败则使用need_point
        user_id: item.user_id,
        is_redeemed: item.is_redeemed,
        created_at: item.created_at,
        user: { nickname: userInfo.nickname || '' },
      }))
      setUserTargets([...currentTargets, ...newTargets])
    }
  }, [data, error, setUserTargets, userInfo, userTargets])

  return { createTargets, loading, error, data }
}

// 导出默认hook，保持向后兼容
export default useCreateTargetsHooks
