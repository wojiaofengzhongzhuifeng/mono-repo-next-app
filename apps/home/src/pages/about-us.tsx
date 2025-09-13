import type { NextPage } from 'next'
import Head from 'next/head'

const AboutUsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us - Next.js Monorepo Template</title>
        <meta name="description" content="Learn more about our company and mission" />
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
                    href="/"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Home
                  </a>
                  <a
                    href="/about-us"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-gray-900"
                  >
                    About Us
                  </a>
                  <a
                    href="/count-number"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Count Number
                  </a>
                </nav>
              </div>
              <div className="flex items-center">
                <div className="text-sm text-gray-600">
                  About our company
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  About Us
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Learn more about our company, our mission, and the team behind this amazing application.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  We are dedicated to building cutting-edge web applications that make a difference in people's lives. 
                  Our mission is to leverage modern technology to create intuitive, efficient, and beautiful solutions 
                  that solve real-world problems.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  With a focus on user experience and technical excellence, we strive to push the boundaries of what's 
                  possible on the web while maintaining accessibility and performance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Values</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span><strong>Innovation:</strong> Always exploring new technologies and approaches</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span><strong>Quality:</strong> Delivering excellence in every line of code</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span><strong>Collaboration:</strong> Working together to achieve greatness</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span><strong>User-Centric:</strong> Putting users first in everything we do</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Technology Stack</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded p-3 text-center">
                      <div className="font-semibold text-gray-800">Next.js 14</div>
                      <div className="text-sm text-gray-600">React Framework</div>
                    </div>
                    <div className="bg-gray-50 rounded p-3 text-center">
                      <div className="font-semibold text-gray-800">TypeScript</div>
                      <div className="text-sm text-gray-600">Type Safety</div>
                    </div>
                    <div className="bg-gray-50 rounded p-3 text-center">
                      <div className="font-semibold text-gray-800">Tailwind CSS</div>
                      <div className="text-sm text-gray-600">Styling</div>
                    </div>
                    <div className="bg-gray-50 rounded p-3 text-center">
                      <div className="font-semibold text-gray-800">Zustand</div>
                      <div className="text-sm text-gray-600">State Management</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-6">
                  We'd love to hear from you! Whether you have questions about our services, 
                  want to collaborate, or just want to say hello, feel free to reach out.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📧</div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">contact@example.com</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">📱</div>
                    <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">📍</div>
                    <h4 className="font-semibold text-gray-800 mb-1">Location</h4>
                    <p className="text-gray-600">San Francisco, CA</p>
                  </div>
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
                  <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                  <li><a href="/about-us" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="/count-number" className="text-gray-300 hover:text-white transition-colors">Count Number</a></li>
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

export default AboutUsPage