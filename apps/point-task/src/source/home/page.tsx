import React from 'react'
import DashboardHeader from '@/source/home/_components/DashboardHeader'
import useUserProfile from '@/source/home/_hooks/useUserProfile'
import { useUserTargetsHooks } from '@/source/home/_hooks/useUserTargets'
import ActionMenu from '@/source/home/_components/ActionMenu'

function Page() {
  useUserProfile()
  useUserTargetsHooks()

  return (
    <div>
      <DashboardHeader></DashboardHeader>
      <ActionMenu></ActionMenu>
    </div>
  )
}

export default Page
