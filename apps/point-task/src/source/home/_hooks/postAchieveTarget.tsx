import { message } from 'antd'
import {
  achieveTargetRequest,
  AchieveTargetRequest,
  AchieveTargetResponse,
} from '../_api/achieveTarget '
import { updateUserPointsRequest } from '../_api/updateUserPoints'
import { useAppStore } from '../_store'

export function usePostAchieveTarget() {
  const { getUserTargetList, setGetUserTargetList, userInfo, setUserInfo } =
    useAppStore()

  const achieveTarget = async (targetId: number, needPoints: number) => {
    try {
      console.log('兑换目标:', targetId)

      // 检查用户积分是否足够
      if (!userInfo || (userInfo.totalPoints ?? 0) < needPoints) {
        message.error('积分不足，无法兑换该目标')
        return
      }

      // 调用兑换目标API
      const requestData: AchieveTargetRequest = {
        user_id: userInfo.user_id || 'user001',
        target_id: targetId,
      }

      const result: AchieveTargetResponse | undefined =
        await achieveTargetRequest(requestData)

      if (result) {
        // 显示成功消息
        message.success(`成功兑换目标！`)

        // 更新目标列表状态
        const updatedTargets = getUserTargetList.map(t =>
          t.id === targetId
            ? {
                ...t,
                is_redeemed: true,
              }
            : t
        )
        setGetUserTargetList(updatedTargets)

        // 更新用户积分
        try {
          // 调用获取用户积分API
          const pointsResult = await updateUserPointsRequest(
            userInfo.user_id || 'user001'
          )

          if (pointsResult) {
            // 计算新的积分总额（扣除兑换积分）
            const currentPoints = pointsResult.points || 0
            const newTotalPoints = currentPoints - needPoints

            // 更新store中的用户信息
            setUserInfo({
              ...userInfo,
              totalPoints: newTotalPoints,
            })

            console.log('用户积分更新成功:', newTotalPoints)
          }
        } catch (updateError) {
          console.error('获取用户积分失败:', updateError)
          // 即使积分更新失败，目标兑换仍然成功
        }
      }
    } catch (error) {
      console.error('兑换目标失败:', error)
      message.error('兑换目标失败，请重试')
    }
  }

  return {
    achieveTarget,
  }
}
