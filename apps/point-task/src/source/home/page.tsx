import React, { use } from 'react'
import { useGetCountNumberHooks } from '@/source/home/_hooks/use-get-count-number'
import Banner from './_components/Banner'
import useSetUserInfo from './_hooks/useSetUserInfo'
import { useUserInfoHooks } from './_hooks/useGetUserInf'

function Page() {
  useGetCountNumberHooks()
  useSetUserInfo()
  useUserInfoHooks()
  return (
    <div>
      <Banner></Banner>
    </div>
  )
}

export default Page
