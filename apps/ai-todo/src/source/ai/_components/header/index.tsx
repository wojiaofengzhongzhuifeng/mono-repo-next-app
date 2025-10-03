import React from 'react'
import { useAiStore } from '@/source/ai/_store'

function Header() {
  const { countNumber, increment } = useAiStore()
  return (
    <div>
      Header 当前countNumber： {countNumber}
      <button onClick={increment}>+1</button>
    </div>
  )
}
export default Header
