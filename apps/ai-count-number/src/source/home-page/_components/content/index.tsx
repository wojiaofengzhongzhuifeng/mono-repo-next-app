import React from 'react'
import { useGlobalStore } from '@/store/global-store'
import Link from 'next/link'

function Content() {
  const { globalNumber, increment, decrement, reset } = useGlobalStore()

  return (
    <div className='p-8'>
      <h2 className='text-2xl font-bold mb-4'>Home Page</h2>
      <div className='bg-gray-100 p-6 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Global Number: {globalNumber}
        </h3>
        <div className='flex gap-4 mb-4'>
          <button
            onClick={increment}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            +1
          </button>
          <button
            onClick={decrement}
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
          >
            -1
          </button>
          <button
            onClick={reset}
            className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
          >
            Reset
          </button>
        </div>
        <Link
          href='/ai'
          className='inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
        >
          Go to AI Page
        </Link>
      </div>
    </div>
  )
}
export default Content
