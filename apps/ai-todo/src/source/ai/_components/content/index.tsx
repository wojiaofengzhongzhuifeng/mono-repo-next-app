import React from 'react'
import { useGlobalStore } from '@/store/global-store'
import Link from 'next/link'

function Content() {
  const { globalNumber, increment, decrement, reset } = useGlobalStore()

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">AI Page</h2>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Global Number from Home: {globalNumber}</h3>
        <p className="mb-4 text-gray-600">
          这个数字是从 home 页面传递过来的全局状态。你可以在当前页面继续操作这个数字。
        </p>
        <div className="flex gap-4 mb-4">
          <button
            onClick={increment}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            +1
          </button>
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            -1
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
        <Link 
          href="/" 
          className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-4"
        >
          Back to Home
        </Link>
        <Link 
          href="/" 
          className="inline-block px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          刷新页面测试状态保持
        </Link>
      </div>
    </div>
  )
}
export default Content
