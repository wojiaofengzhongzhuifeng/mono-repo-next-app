import React from 'react'
import { useAppStore } from '@/source/home/_store'
import { NumberItem } from '@/source/home/_components/NumberList/SubComponent/NumberItem'
import { GetCountNumberResponse } from '@/source/home/_api/get-number'
import { add } from '@mono-repo/test-utils' // 修正导入来源

console.log('add(1, 2)', add(1, 2))

export function NumberList() {
  const { numbers, getNumbersLoading } = useAppStore()

  if (getNumbersLoading) {
    return <div>正在加载中……</div>
  }
  return (
    <div>
      {numbers.map((numberItem: GetCountNumberResponse) => {
        return <NumberItem {...numberItem} key={numberItem.id} />
      })}
    </div>
  )
}
