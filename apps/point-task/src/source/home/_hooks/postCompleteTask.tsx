import { message } from 'antd'
import {
  completeUserTaskRequest,
  CompleteUserTaskResponse,
} from '../_api/completeUserTask'
import { updateUserPointsRequest } from '../_api/updateUserPoints'
import { useAppStore } from '../_store'

export function usePostCompleteTask() {
  const { getUserTasksList, setGetUserTasksList, userInfo, setUserInfo } =
    useAppStore()

  const completeTask = async (task: any) => {
    try {
      console.log('完成任务:', task)

      // 调用完成任务API
      const result: CompleteUserTaskResponse | undefined =
        await completeUserTaskRequest({
          user_id: task.user_id || 'user001', // 如果task中没有user_id，使用默认值
          task_ids: [task.id],
        })

      if (result) {
        const earnedPoints = result.totalEarnedPoints

        // 显示成功消息
        message.success(`成功完成任务！获得 ${earnedPoints} 积分`)

        // 更新任务列表状态
        const updatedTasks = getUserTasksList.map(t =>
          t.id === task.id
            ? {
                ...t,
                is_completed: true,
                completed_at: new Date().toISOString(),
              }
            : t
        )
        setGetUserTasksList(updatedTasks)

        // 获取当前用户积分
        if (userInfo) {
          try {
            // 调用获取用户积分API
            const pointsResult = await updateUserPointsRequest(
              userInfo.user_id || 'user001'
            )

            if (pointsResult) {
              // 计算新的积分总额
              const currentPoints = pointsResult.points || 0
              const newTotalPoints = currentPoints + earnedPoints

              // 更新store中的用户信息
              setUserInfo({
                ...userInfo,
                totalPoints: newTotalPoints,
              })

              console.log('用户积分更新成功:', newTotalPoints)
            }
          } catch (updateError) {
            console.error('获取用户积分失败:', updateError)
            // 即使积分更新失败，任务完成仍然成功，所以不显示错误给用户
          }
        }
      }
    } catch (error) {
      console.error('完成任务失败:', error)
      message.error('完成任务失败，请重试')
    }
  }

  return {
    completeTask,
  }
}
