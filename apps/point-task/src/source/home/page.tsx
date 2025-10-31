import React, { use } from 'react'
import Banner from './_components/Banner'
import Targets from './_components/Tatgets'
import useUserInfoHooks from './_hooks/useUserInfo'
import { useUserTargetsHooks } from './_hooks/useGetUserTargets'

function Page() {
  useUserInfoHooks()
  useUserTargetsHooks()
  return (
    <div>
      <Banner></Banner>
      <Targets></Targets>
    </div>
  )
}

export default Page
