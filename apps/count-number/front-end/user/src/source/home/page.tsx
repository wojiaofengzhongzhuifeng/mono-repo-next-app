import React from 'react'
import { useGetNumbers } from '@/source/home/_api/get-number'
import { NumberList } from '@/source/home/_components/NumberList'

function Page() {
  useGetNumbers()
  return (
    <div>
      <NumberList />
    </div>
  )
}

export default Page
