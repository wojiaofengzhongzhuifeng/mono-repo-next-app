import React from 'react'
import { useAppStore } from '@/source/home/_store'
function Component1() {
  const { countNumber } = useAppStore()
  return <div>Component1: {countNumber}</div>
}
export default Component1
