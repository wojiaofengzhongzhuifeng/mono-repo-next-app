import React from 'react'
import { useCountNumberStore } from '@/source/count-number/_store'

function Header() {
  const { countNumber, increment } = useCountNumberStore()
  return (
    <div>
      Header 当前countNumber： {countNumber}
      <button onClick={increment}>+1</button>
    </div>
  )
}
export default Header
