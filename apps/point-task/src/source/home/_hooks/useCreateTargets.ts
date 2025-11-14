import {
  CreateTargetRequestData,
  postUserTargets,
} from '@/source/home/_api/createUserTargets'
import { useAppStore } from '@/source/home/_store'
import { useRequest } from 'ahooks'
import { useEffect, useRef } from 'react'

export function useCreateTargets() {
  const { data, error, loading, run } = useRequest(
    (targetData: CreateTargetRequestData) => postUserTargets(targetData),
    {
      manual: true,
    }
  )
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
  const createTargets = async (
    targetData: CreateTargetRequestData,
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    try {
      const result = await run(targetData)

      // 成功提示
      alert('目标创建成功！')

      // 调用成功回调
      if (onSuccess) {
        onSuccess()
      }

      return result
    } catch (error) {
      console.error('创建目标失败:', error)

      // 失败提示
      alert('创建目标失败，请重试')

      // 调用失败回调
      if (onError) {
        onError()
      }

      throw error
    }
  }

  // 更新目标列表
  useEffect(() => {
    if (!error && data && userInfo) {
      const dataId = data
        .map(
          item =>
            `${item.name}-${item.need_point}-${item.user_id}-${item.created_at}`
        )
        .join(',')
      if (processedDataRef.current.includes(dataId)) {
        return
      }

      processedDataRef.current.push(dataId)

      const currentTargets = userTargets || []
      const newTargets = data.map(item => ({
        id: item.id,
        name: item.name,
        description: Number(item.description) || 0,
        need_point: item.need_point,
        user_id: item.user_id,
        is_redeemed: item.is_redeemed,
        created_at: item.created_at,
        user: { nickname: userInfo?.nickname || '用户' },
      }))
      setUserTargets([...currentTargets, ...newTargets])
    }
  }, [data, error, setUserTargets, userInfo, userTargets])

  return { createTargets, loading, error, data }
}

// 导出默认hook，保持向后兼容
export default useCreateTargetsHooks
