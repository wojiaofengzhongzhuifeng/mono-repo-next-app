import React from 'react'
import Link from 'next/link'
import { NavigationItem } from './Header'

// Footer 区块配置接口
export interface FooterSection {
  title: string
  content?: string
  links?: NavigationItem[]
  customContent?: React.ReactNode
}

// 社交媒体链接接口
export interface SocialLink {
  name: string
  href: string
  icon?: React.ReactNode
  external?: boolean
}

// Footer 配置接口
export interface FooterConfig {
  // 基础信息
  companyName?: string
  copyrightText?: string
  logo?: React.ReactNode
  
  // 主要内容区块
  sections?: FooterSection[]
  
  // 底部信息
  bottomInfo?: {
    showCopyright?: boolean
    copyrightYear?: number
    additionalText?: string
    showSocialLinks?: boolean
  }
  
  // 社交媒体
  socialLinks?: SocialLink[]
  
  // 样式配置
  theme?: 'light' | 'dark' | 'auto'
  variant?: 'default' | 'minimal' | 'compact'
  
  // 布局配置
  columns?: number
  showTopBorder?: boolean
}

// Footer 组件 Props
export interface FooterProps extends FooterConfig {
  className?: string
}

export function Footer({
  companyName = 'My App',
  copyrightText,
  logo,
  sections = [],
  bottomInfo = { showCopyright: true, showSocialLinks: true },
  socialLinks = [],
  theme = 'dark',
  variant = 'default',
  columns = 3,
  showTopBorder = false,
  className = ''
}: FooterProps) {
  // 获取当前年份
  const currentYear = new Date().getFullYear()

  // 默认区块（如果没有提供）
  const defaultSections: FooterSection[] = [
    {
      title: 'About Us',
      content: 'We are building amazing applications with modern technology stack.'
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Contact',
      content: 'Email: contact@example.com\nPhone: +1 (555) 123-4567'
    }
  ]

  const finalSections = sections.length > 0 ? sections : defaultSections

  // 默认社交媒体链接
  const defaultSocialLinks: SocialLink[] = [
    { name: 'Twitter', href: '#', external: true },
    { name: 'GitHub', href: '#', external: true },
    { name: 'LinkedIn', href: '#', external: true }
  ]

  const finalSocialLinks = socialLinks.length > 0 ? socialLinks : defaultSocialLinks

  // 主题样式映射
  const themeClasses = {
    light: 'bg-gray-50 text-gray-900',
    dark: 'bg-gray-900 text-white',
    auto: 'bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white'
  }

  // 变体样式映射
  const variantClasses = {
    default: 'py-12',
    minimal: 'py-8',
    compact: 'py-6'
  }

  // 网格列数映射
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <footer 
      className={`
        ${themeClasses[theme]}
        ${showTopBorder ? 'border-t border-gray-200 dark:border-gray-700' : ''}
        ${variantClasses[variant]}
        relative overflow-hidden
        ${className}
      `}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 主要内容区块 */}
        <div className={`grid ${gridClasses[columns as keyof typeof gridClasses]} gap-8 lg:gap-12`}>
          {finalSections.map((section, index) => (
            <div key={index} className="group">
              <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {section.title}
              </h3>
              
              {/* 自定义内容 */}
              {section.customContent && (
                <div className="text-sm leading-relaxed">
                  {section.customContent}
                </div>
              )}
              
              {/* 文本内容 */}
              {section.content && !section.customContent && (
                <p className="text-sm leading-relaxed opacity-80 dark:opacity-70 whitespace-pre-line">
                  {section.content}
                </p>
              )}
              
              {/* 链接列表 */}
              {section.links && section.links.length > 0 && (
                <ul className="space-y-3 text-sm">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {link.href.startsWith('#') ? (
                        <span className="opacity-60 dark:opacity-50 cursor-not-allowed">
                          {link.name}
                        </span>
                      ) : (
                        <Link
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          className="relative inline-block opacity-80 dark:opacity-70 hover:opacity-100 dark:hover:opacity-90 transition-all duration-300 group/link"
                        >
                          {link.name}
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"></span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* 底部信息区域 */}
        <div className={`
          mt-12 pt-8 border-t border-gray-200 dark:border-gray-700
          ${variant === 'compact' ? 'text-center' : 'text-center sm:text-left'}
        `}>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* 版权信息 */}
            {bottomInfo.showCopyright && (
              <div className="text-sm opacity-60 dark:opacity-50">
                <p className="flex items-center justify-center sm:justify-start space-x-2">
                  <span>&copy;</span>
                  <span>{bottomInfo.copyrightYear || currentYear}</span>
                  <span className="font-medium">{companyName}</span>
                  <span>.</span>
                  <span>{copyrightText || 'All rights reserved.'}</span>
                </p>
                {bottomInfo.additionalText && (
                  <p className="mt-2 text-center sm:text-left">{bottomInfo.additionalText}</p>
                )}
              </div>
            )}

            {/* 社交媒体链接 */}
            {bottomInfo.showSocialLinks && finalSocialLinks.length > 0 && (
              <div className="flex items-center space-x-6">
                {finalSocialLinks.map((social) => (
                  <div key={social.name} className="group/social">
                    {social.href.startsWith('#') ? (
                      <span className="text-sm opacity-60 dark:opacity-50 cursor-not-allowed">
                        {social.name}
                      </span>
                    ) : (
                      <Link
                        href={social.href}
                        target={social.external ? '_blank' : undefined}
                        rel={social.external ? 'noopener noreferrer' : undefined}
                        className="relative flex items-center space-x-2 text-sm opacity-60 dark:opacity-50 hover:opacity-100 dark:hover:opacity-90 transition-all duration-300 group/social"
                      >
                        <span className="transform group-hover/social:scale-110 transition-transform duration-300">
                          {social.icon || (
                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
                          )}
                        </span>
                        <span className="hidden lg:inline">{social.name}</span>
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

// 默认配置导出
export const defaultFooterConfig: FooterConfig = {
  companyName: 'My App',
  bottomInfo: {
    showCopyright: true,
    showSocialLinks: true
  },
  theme: 'dark',
  variant: 'default',
  columns: 3,
  showTopBorder: false
}

// 预设配置
export const footerPresets = {
  // 企业网站预设
  corporate: {
    ...defaultFooterConfig,
    sections: [
      {
        title: 'About Company',
        content: 'Leading provider of innovative solutions for modern businesses.'
      },
      {
        title: 'Services',
        links: [
          { name: 'Consulting', href: '/services/consulting' },
          { name: 'Development', href: '/services/development' },
          { name: 'Support', href: '/services/support' }
        ]
      },
      {
        title: 'Contact',
        content: 'Email: info@company.com\nPhone: +1 (555) 123-4567'
      }
    ]
  } as FooterConfig,

  // 个人博客预设
  blog: {
    ...defaultFooterConfig,
    companyName: 'My Blog',
    sections: [
      {
        title: 'About',
        content: 'Personal blog about technology and life.'
      },
      {
        title: 'Categories',
        links: [
          { name: 'Tech', href: '/category/tech' },
          { name: 'Life', href: '/category/life' },
          { name: 'Travel', href: '/category/travel' }
        ]
      },
      {
        title: 'Follow Me',
        links: [
          { name: 'Twitter', href: '#', external: true },
          { name: 'GitHub', href: '#', external: true }
        ]
      }
    ]
  } as FooterConfig,

  // 最简预设
  minimal: {
    companyName: 'My App',
    sections: [],
    bottomInfo: {
      showCopyright: true,
      showSocialLinks: false
    },
    theme: 'dark',
    variant: 'compact',
    columns: 1,
    showTopBorder: true
  } as FooterConfig
}
