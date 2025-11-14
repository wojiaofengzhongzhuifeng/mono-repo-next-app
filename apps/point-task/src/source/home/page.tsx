import ActionMenu from './_components/ActionMenu'
import DashboardHeader from './_components/DashboardHeader'
import useUserProfile from './_hooks/useUserProfile'
import { useUserTargetsHooks } from './_hooks/useUserTargets'

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
