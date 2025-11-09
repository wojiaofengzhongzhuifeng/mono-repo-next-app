import React from 'react'
import ShopHome from '@/source/home/page'

console.log(123321)

export default function ShopHomePage() {
  return (
    <div>
      <div className='center-container bg-red-100 p-4 my-4'>
        <h1 className='text-2xl font-bold text-center'>
          Center Container Test
        </h1>
        <p className='text-center'>
          This container should be centered with responsive padding
        </p>
      </div>

      <div className='center-container-sm bg-blue-100 p-4 my-4'>
        <h2 className='text-xl font-bold text-center'>
          Small Center Container
        </h2>
        <p className='text-center'>This should be smaller (max-width: 640px)</p>
      </div>

      <div className='center-container-lg bg-green-100 p-4 my-4'>
        <h2 className='text-xl font-bold text-center'>
          Large Center Container
        </h2>
        <p className='text-center'>This should be larger (max-width: 1024px)</p>
      </div>

      <ShopHome />
    </div>
  )
}
