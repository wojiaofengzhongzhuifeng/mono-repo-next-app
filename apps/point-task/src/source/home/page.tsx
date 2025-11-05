import React, { use } from 'react'
import DashboardHeader from './_components/DashboardHeader'
import GoalDisplay from './_components/GoalDisplay'
import useUserProfile from './_hooks/useUserProfile'
import { useUserTargetsHooks } from './_hooks/useUserGoals'
import ActionMenu from './_components/ActionMenu'

function Page() {
  useUserProfile()
  useUserTargetsHooks()

  return (
    <div>
      <DashboardHeader></DashboardHeader>
      {/* <GoalDisplay></GoalDisplay> */}
      <ActionMenu></ActionMenu>
    </div>
  )
}

export default Page
