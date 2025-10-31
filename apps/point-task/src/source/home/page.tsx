import React, { use } from 'react'
import { useGetCountNumberHooks } from '@/source/home/_hooks/use-get-count-number'
import Banner from './_components/Banner'
import Targets from './_components/Tatgets'
import useUserInfoHooks from './_hooks/useUserInfo'

function Page() {
  useGetCountNumberHooks()
  useUserInfoHooks()
  return (
    <div>
      <Banner></Banner>
      <Targets></Targets>
    </div>
  )
}

export default Page
