import React from 'react'
import { useGetNumbers } from '@/source/home/_api/get-number'
import { NumberList } from '@/source/home/_components/NumberList'
import CreateNumberForm from '@/source/home/_components/CreateNumberForm'

function Page() {
  useGetNumbers()
  return (
    <div>
      <h1>数字管理</h1>
      <CreateNumberForm />
      <hr />
      <NumberList />
    </div>
  )
}

export default Page
