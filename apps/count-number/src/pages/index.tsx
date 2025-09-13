import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

const CountNumberPage: NextPage = () => {
  const [count, setCount] = useState(0)
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(0)

  return (
    <>
      <Head>
        <title>Count Number - Next.js Monorepo Template</title>
        <meta name="description" content="Interactive counter demonstration with state management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">
                    My App
                  </h1>
                </div>
                <nav className="ml-6 flex space-x-8">
                  <a
                    href="http://localhost:3000"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Home
                  </a>
                  <a
                    href="http://localhost:3001"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    About Us
                  </a>
                  <a
                    href="/"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-gray-900"
                  >
                    Count Number
                  </a>
                </nav>
              </div>
              <div className="flex items-center">
                <div className="text-sm text-gray-600">
                  Interactive Counter
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                  Count Number Demo
                </h1>
                
                <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                  This interactive counter demonstrates React state management with increment, 
                  decrement, and reset functionality.
                </p>

                <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Counter
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Use the buttons below to interact with the counter.
                  </p>
                  
                  <div className="text-8xl font-bold text-blue-600 mb-8">
                    {count}
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={decrement}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors transform hover:scale-105"
                    >
                      <span className="text-2xl">-</span>
                    </button>
                    <button
                      onClick={reset}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors transform hover:scale-105"
                    >
                      Reset
                    </button>
                    <button
                      onClick={increment}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors transform hover:scale-105"
                    >
                      <span className="text-2xl">+</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Increment
                    </h3>
                    <p className="text-gray-600">
                      Increases the counter value by 1 each time
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Decrement
                    </h3>
                    <p className="text-gray-600">
                      Decreases the counter value by 1 each time
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Reset
                    </h3>
                    <p className="text-gray-600">
                      Resets the counter back to zero
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">
                    State Management
                  </h3>
                  <p className="text-blue-700">
                    This counter uses React's built-in useState hook for state management. 
                    The state is preserved during navigation within the single page application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <p className="text-gray-300 text-sm">
                  We are building amazing applications with modern technology stack.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="http://localhost:3000" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                  <li><a href="http://localhost:3001" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="http://localhost:3002" className="text-gray-300 hover:text-white transition-colors">Count Number</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-gray-300 text-sm">
                  Email: contact@example.com<br />
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-300">
              <p>&copy; 2024 My App. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default CountNumberPage