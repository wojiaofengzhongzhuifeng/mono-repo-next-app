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
    </div>
  )
}
