import React from 'react'
import { useAppStore } from '@/source/home/_store'
function Component1() {
  const { numbers } = useAppStore()
  console.log('numbers', numbers)
  return <div>Component1: {numbers.map(number => number.value).join(',')}</div>
}
export default Component1
