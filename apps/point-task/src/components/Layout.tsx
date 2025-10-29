import React from 'react'
import { useRouter } from 'next/router'
import { Header, Footer, NavigationItem } from '@mono-repo/ui'
import { useAppStore } from '@/source/home/_store'
import { Button } from '@/components/ui/button'

interface LayoutProps {
  children: React.ReactNode
}

const navigation: NavigationItem[] = [
  { name: '首页', href: '/' },
  { name: '商品列表', href: '/home' },
]

export function Layout({ children }: LayoutProps) {
  const router = useRouter()

  const handleCartClick = () => {
    router.push('/shopcar')
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Header
        appName='AI Shop'
        tagline='智能商店'
        navigation={navigation}
        userArea={{
          showWelcome: true,
          welcomeText: '欢迎来到 AI 商城',
          actions: [
            {
              label: '开始购物',
              onClick: () => {
                router.push('/home')
              },
              variant: 'primary',
            },
            {
              label: '重置',
              onClick: () => {
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
