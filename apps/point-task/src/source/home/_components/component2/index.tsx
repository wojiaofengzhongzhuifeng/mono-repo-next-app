import React from 'react'
import { useAppStore } from '@/source/home/_store'
function Component2() {
  const { setCountNumber, countNumber } = useAppStore()
  return (
    <div>
      <button
        onClick={() => {
          setCountNumber(countNumber + 1)
        }}
      >
        +1
      </button>
    </div>
  )
}

export default Component2
