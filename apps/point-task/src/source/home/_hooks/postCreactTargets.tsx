import { useAppStore } from '@/source/home/_store'
import { useRequest } from 'ahooks'
import { useEffect, useRef } from 'react'
import { postUserCreatedTargetsRequest } from '../_api/postUserTarget'

// 凡是以 get or submit 开头，表示请求数据, post 开头表示发送数据
export function postPostCreatedTargets() {
  const { data, error, loading, run } = useRequest(
    postUserCreatedTargetsRequest,
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

// 使用 hooks - 调用创建目标
export function postPostCreatedTargetsHooks() {
  const { run, data, error, loading } = postPostCreatedTargets()
  const { userInfo, createdTargets, setCreatedTargets } = useAppStore()
  const processedDataRef = useRef<any[]>([])

  // 创建目标
  const createTarget = async (
    targetData: any,
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
      const dataId = `${data.name}-${data.need_point}-${data.user_id}-${data.created_at}`
      if (processedDataRef.current.includes(dataId)) {
        return
      }

      processedDataRef.current.push(dataId)

      const currentTargets = createdTargets || []
      const newTarget = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        need_point: data.need_point,
        user_id: data.user_id,
        is_redeemed: data.is_redeemed,
        created_at: data.created_at,
        user: { nickname: userInfo?.nickname || '用户' },
      }
      setCreatedTargets([...currentTargets, newTarget])
    }
  }, [data, error, setCreatedTargets, userInfo, createdTargets])

  return { createTarget, loading, error, data }
}

// 导出默认hook，保持向后兼容
export default postPostCreatedTargetsHooks
