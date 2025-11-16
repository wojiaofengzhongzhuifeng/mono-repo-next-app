import {
  postRedeemAward,
  UserRedeemAwardRequestData,
} from '@/source/home/_api/redeemAward'
import { useAppStore } from '@/source/home/_store'
import { useRequest } from 'ahooks'
import { useEffect, useRef } from 'react'

export function useRedeemAward() {
  const { data, error, loading, run } = useRequest(postRedeemAward, {
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

// 统一的奖励兑换管理hook
export function useRedeemAwardHooks() {
  const { run, data, error, loading } = useRedeemAward()
  const { userInfo, userRedeemAward, setUserRedeemAwardRequestData } =
    useAppStore()
  const processedDataRef = useRef<Set<string>>(new Set())

  // 兑换奖励
  const redeemAward = async (awardData: UserRedeemAwardRequestData) => {
    try {
      const result = await run(awardData)
      return result
    } catch (error) {
      console.error('兑换奖励失败:', error)
      throw error
    }
  }

  // 更新奖励列表
  useEffect(() => {
    if (
      !error &&
      data &&
      data.completedTasks &&
      data.completedTasks.length > 0
    ) {
      // 检查是否已经处理过这批数据
      const dataId = data.completedTasks.map(item => item.message).join(',')
      if (processedDataRef.current.has(dataId)) {
        return
      }
      console.log('data', data)
      // 标记这批数据为已处理
      processedDataRef.current.add(dataId)

      // 将新的兑换奖励数据添加到现有列表中
      const currentAwards = userRedeemAward || []
      setUserRedeemAwardRequestData([...currentAwards, data])
    }
  }, [data, error, setUserRedeemAwardRequestData, userInfo, userRedeemAward])

  return { redeemAward, loading, error, data }
}

// 导出默认hook，保持向后兼容
export default useRedeemAwardHooks
