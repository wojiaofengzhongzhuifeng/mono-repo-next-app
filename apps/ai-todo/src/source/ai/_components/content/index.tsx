import React from 'react'
import { useGlobalStore } from '@/store/global-store'
import Link from 'next/link'

function Content() {
  const { globalNumber, increment, decrement, reset } = useGlobalStore()

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">AI Page</h2>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          Global Number from Home: {globalNumber}
        </h3>
      </div>
    </div>
  )
}
export default Content
