import React from 'react'
import { useHomeStore } from '@/source/home-page/_store'

function Header() {
  const { countNumber, increment } = useHomeStore()
  return (
    <div>
      Header 当前：{countNumber}
      <button onClick={increment}>home + 1</button>
    </div>
  )
}
export default Header
