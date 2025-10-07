import React from 'react'
import { useRouter } from 'next/router'
import { Header, Footer, NavigationItem } from '@mono-repo/ui'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslation } from 'next-i18next'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation('common')
  const router = useRouter()
  
  const navigation: NavigationItem[] = [
    { name: t('home'), href: '/' },
    { name: t('marquee'), href: '/marquee' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        appName="Marquee"
        tagline={t('title')}
        navigation={navigation}
        userArea={{
          showWelcome: true,
          welcomeText: t('title'),
          actions: [
            {
              label: t('marquee'),
              onClick: () => {
                router.push('/marquee')
              },
              variant: "primary"
            }
          ],
          customContent: <LanguageSwitcher />
        }}
        theme="light"
        variant="default"
        sticky={true}
        showBorder={true}
      />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer
        companyName="Marquee"
        sections={[
          {
            title: t('title'),
            content: "文本跑马灯效果\n多种动画效果\n自定义配置"
          },
          {
            title: t('marquee'),
            links: [
              { name: t('home'), href: '/' },
              { name: t('marquee'), href: '/marquee' },
              { name: '使用文档', href: '#', external: true }
            ]
          },
          {
            title: t('title'),
            content: "我们致力于提供最丰富的文本动画效果体验"
          }
        ]}
        socialLinks={[
          { name: "GitHub", href: "https://github.com", external: true },
          { name: "Twitter", href: "https://twitter.com", external: true }
        ]}
        theme="dark"
        variant="default"
        columns={3}
        showTopBorder={true}
      />
    </div>
  )
}
