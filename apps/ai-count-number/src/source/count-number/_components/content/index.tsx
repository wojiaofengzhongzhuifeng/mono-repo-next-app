import React from 'react'
import { useGlobalStore } from '@/store/global-store'
import { useCountNumberStore } from '@/source/count-number/_store'
import Link from 'next/link'

function Content() {
  const { globalNumber, increment, decrement, reset } = useGlobalStore()
  const {
    countNumber,
    increment: countIncrement,
    decrement: countDecrement,
    reset: countReset,
  } = useCountNumberStore()

  return (
    <div className='p-8'>
      <h2 className='text-2xl font-bold mb-4'>Count Number Page</h2>
      <div className='bg-gray-100 p-6 rounded-lg mb-4'>
        <h3 className='text-lg font-semibold mb-4'>
          Global Number from Home: {globalNumber}
        </h3>
      </div>
      <div className='bg-blue-100 p-6 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Count Number: {countNumber}
        </h3>
        <div className='flex gap-2'>
          <button
            onClick={countIncrement}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            +1
          </button>
          <button
            onClick={countDecrement}
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
          >
            -1
          </button>
          <button
            onClick={countReset}
            className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
export default Content
