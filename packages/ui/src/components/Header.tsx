import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// 导航项接口
export interface NavigationItem {
  name: string
  href: string
  external?: boolean
}

// Header 配置接口
export interface HeaderConfig {
  // 基础信息
  appName?: string
  logo?: React.ReactNode
  tagline?: string
  
  // 导航配置
  navigation?: NavigationItem[]
  
  // 用户区域
  userArea?: {
    showWelcome?: boolean
    welcomeText?: string
    actions?: Array<{
      label: string
      onClick: () => void
      variant?: 'primary' | 'secondary' | 'ghost'
    }>
    customContent?: React.ReactNode
  }
  
  // 样式配置
  theme?: 'light' | 'dark' | 'auto'
  variant?: 'default' | 'minimal' | 'centered'
  
  // 行为配置
  sticky?: boolean
  showBorder?: boolean
}

// Header 组件 Props
export interface HeaderProps extends HeaderConfig {
  className?: string
}

export function Header({
  appName = 'My App',
  logo,
  tagline,
  navigation = [],
  userArea = { showWelcome: true, welcomeText: 'Welcome to our app' },
  theme = 'light',
  variant = 'default',
  sticky = false,
  showBorder = true,
  className = ''
}: HeaderProps) {
  const router = useRouter()

  // 默认导航项（如果没有提供）
  const defaultNavigation: NavigationItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
  ]

  const finalNavigation = navigation.length > 0 ? navigation : defaultNavigation

  // 判断导航项是否激活
  const isActive = (item: NavigationItem) => {
    if (item.external) return false
    
    // 精确匹配
    if (item.href === router.pathname) return true
    
    // 根路径匹配
    if (item.href === '/' && router.pathname === '/') return true
    
    // 父路径匹配（例如 /products 匹配 /products/1）
    if (item.href !== '/' && router.pathname.startsWith(item.href + '/')) return true
    
    return false
  }

  // 主题样式映射
  const themeClasses = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
    auto: 'bg-white text-gray-900 dark:bg-gray-900 dark:text-white'
  }

  // 变体样式映射
  const variantClasses = {
    default: 'justify-between',
    minimal: 'justify-center',
    centered: 'justify-center'
  }

  return (
    <header 
      className={`
        ${themeClasses[theme]}
        ${showBorder ? 'border-b border-gray-200 dark:border-gray-700' : ''}
        ${sticky ? 'sticky top-0 z-50 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90' : ''}
        shadow-md hover:shadow-lg transition-shadow duration-300
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex h-16 ${variantClasses[variant]} items-center`}>
          {/* 左侧：Logo 和主导航 */}
          <div className="flex items-center">
            {/* Logo 区域 */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="group flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
                {logo || (
                  <div className="relative">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
                      {appName}
                    </h1>
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                )}
                {tagline && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline font-medium">
                    {tagline}
                  </span>
                )}
              </Link>
            </div>

            {/* 主导航 */}
            {variant === 'default' && finalNavigation.length > 0 && (
              <nav className="ml-8 lg:ml-12 flex space-x-6 lg:space-x-8">
                {finalNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className={`
                      relative inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300 group
                      ${isActive(item)
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }
                    `}
                  >
                    {item.name}
                    <span className={`
                      absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform transition-transform duration-300
                      ${isActive(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                    `}></span>
                  </Link>
                ))}
              </nav>
            )}
          </div>

          {/* 居中导航（centered 变体） */}
          {variant === 'centered' && finalNavigation.length > 0 && (
            <nav className="flex space-x-6 lg:space-x-8">
              {finalNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className={`
                    relative inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300 group
                    ${isActive(item)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                >
                  {item.name}
                  <span className={`
                    absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform transition-transform duration-300
                    ${isActive(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `}></span>
                </Link>
              ))}
            </nav>
          )}

          {/* 右侧：用户区域 */}
          <div className="flex items-center space-x-4">
            {userArea.showWelcome && (
              <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-300 font-medium px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                {userArea.welcomeText}
              </div>
            )}
            
            {userArea.actions && userArea.actions.length > 0 && (
              <div className="flex items-center space-x-3">
                {userArea.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95
                      ${action.variant === 'primary' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg' 
                        : action.variant === 'secondary'
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
            
            {userArea.customContent && (
              <div className="flex items-center">
                {userArea.customContent}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

// 默认配置导出
export const defaultHeaderConfig: HeaderConfig = {
  appName: 'My App',
  userArea: {
    showWelcome: true,
    welcomeText: 'Welcome to our app'
  },
  theme: 'light',
  variant: 'default',
  sticky: false,
  showBorder: true
}
