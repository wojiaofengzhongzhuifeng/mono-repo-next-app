import React from 'react'
import NumberAction from '@/source/_components/number-action'

function Page ({ test }: { test: number }) {
  return (
      <div>
          <NumberAction data={test}/>
      </div>
  )
}
export default Page