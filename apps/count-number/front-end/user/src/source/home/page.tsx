import React from 'react'
import Component1 from '@/source/home/_components/component1'
import { useGetNumbers } from '@/source/home/_api/get-count-number-1'

function Page() {
  useGetNumbers()
  return (
    <div>
      <Component1 />
    </div>
  )
}

export default Page
