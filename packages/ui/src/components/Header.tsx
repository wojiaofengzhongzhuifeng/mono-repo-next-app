import Link from 'next/link'
import { useRouter } from 'next/router'

interface HeaderProps {
  appName?: string
}

export function Header({ appName = 'My App' }: HeaderProps) {
  const router = useRouter()

  const navigation = [
    { name: 'Home', href: 'http://localhost:3000' },
    { name: 'About Us', href: 'http://localhost:3001' },
  ]

  const isActive = (href: string) => {
    if (href === 'http://localhost:3000') {
      return router.pathname === '/'
    }
    if (href === 'http://localhost:3001') {
      return router.pathname === '/'
    }
    return false
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <h1 className="text-xl font-bold text-gray-900">
                  {appName}
                </h1>
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-600">
              Welcome to our app
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}