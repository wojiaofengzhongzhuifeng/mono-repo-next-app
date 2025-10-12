import React from 'react'
import Component1 from '@/source/home/_components/component1'
import Component2 from '@/source/home/_components/component2'
import { useGetCountNumberHooks } from '@/source/home/_hooks/use-get-count-number'

function Page() {
  useGetCountNumberHooks()
  return (
    <div>
      <Component1 />
      <Component2 />
    </div>
  )
}

export default Page
