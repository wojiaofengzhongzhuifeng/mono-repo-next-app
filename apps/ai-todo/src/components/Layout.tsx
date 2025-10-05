import React from 'react'
import { Header, Footer, NavigationItem } from '@mono-repo/ui'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslation } from 'next-i18next'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation('common')
  
  const navigation: NavigationItem[] = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.ai'), href: '/ai' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        appName="AI Todo"
        tagline={t('ai.description')}
        navigation={navigation}
        userArea={{
          showWelcome: true,
          welcomeText: t('common.success'),
          actions: [
            {
              label: t('todo.addTodo'),
              onClick: () => {
                // 可以跳转到新建任务页面或打开模态框
                window.location.href = '/ai'
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
        companyName="AI Todo"
        sections={[
          {
            title: t('common.success'),
            content: "智能任务管理\nAI 辅助规划\n优先级自动排序"
          },
          {
            title: t('common.search'),
            links: [
              { name: t('navigation.home'), href: '/' },
              { name: t('navigation.ai'), href: '/ai' },
              { name: '使用文档', href: '#', external: true }
            ]
          },
          {
            title: t('common.edit'),
            content: "我们致力于提供最智能的待办事项管理体验"
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
