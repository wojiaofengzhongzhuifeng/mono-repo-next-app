import React from 'react'
import { useAppStore } from '@/source/home/_store'
function Component1() {
  const { numbers, getNumbersLoading } = useAppStore()

  return (
    <div>
      {getNumbersLoading ? '加载中...' : '加载完成'}
      <div>
        Component1: {numbers.map(number => number.numberValue).join(',')}
      </div>
    </div>
  )
}
export default Component1
