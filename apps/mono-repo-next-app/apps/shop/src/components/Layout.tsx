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
  const { cartItems } = useAppStore()

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0)
  }

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
          customContent: (
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={handleCartClick}
                className='relative p-2'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                {getTotalItems() > 0 && (
                  <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </div>
          ),
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
