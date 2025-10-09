import React from 'react'
import { Header, Footer, NavigationItem } from '@mono-repo/ui'

interface LayoutProps {
  children: React.ReactNode
}

const navigation: NavigationItem[] = [
  { name: '首页', href: '/' },
  { name: '数字计数', href: '/home' },
]

export function Layout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header
        appName='AI Shop'
        tagline='智能商店'
        navigation={navigation}
        userArea={{
          showWelcome: true,
          welcomeText: '欢迎使用 AI 计数工具',
          actions: [
            {
              label: '开始计数',
              onClick: () => {
                // 可以跳转到计数页面
                window.location.href = '/home'
              },
              variant: 'primary',
            },
            {
              label: '重置',
              onClick: () => {
                // 可以触发重置功能
                window.location.reload()
              },
              variant: 'secondary',
            },
          ],
        }}
        theme='light'
        variant='default'
        sticky={true}
        showBorder={true}
      />

      <main className='flex-1'>{children}</main>

      <Footer
        companyName='AI Count Number'
        sections={[
          {
            title: '产品特性',
            content: '实时数字统计\n智能计数算法\n数据可视化展示',
          },
          {
            title: '快速链接',
            links: [
              { name: '首页', href: '/' },
              { name: '数字计数', href: '/home' },
              { name: '使用指南', href: '#', external: true },
            ],
          },
          {
            title: '技术支持',
            content: '基于 Next.js 构建\n使用 React Hooks\n响应式设计',
          },
        ]}
        socialLinks={[
          { name: 'GitHub', href: 'https://github.com', external: true },
          { name: '技术博客', href: '#', external: true },
        ]}
        theme='dark'
        variant='default'
        columns={3}
        showTopBorder={true}
      />
    </div>
  )
}
