import React from 'react'
import Component1 from '@/source/home/_components/component1'
import Component2 from '@/source/home/_components/component2'
import { useGetCountNumber } from '@/source/home/_api/get-count-number'

function Page() {
  useGetCountNumber()
  return (
    <div>
      <Component1 />
      <Component2 />
    </div>
  )
}

export default Page
