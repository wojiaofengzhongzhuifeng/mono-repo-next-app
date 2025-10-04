import React from 'react'
import { Header, Footer, NavigationItem } from '@mono-repo/ui'

interface LayoutProps {
  children: React.ReactNode
}

const navigation: NavigationItem[] = [
  { name: '首页', href: '/' },
  { name: 'AI 助手', href: '/ai' },
]

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        appName="AI Todo"
        tagline="智能待办事项管理"
        navigation={navigation}
        userArea={{
          showWelcome: true,
          welcomeText: "欢迎使用 AI Todo",
          actions: [
            {
              label: "新建任务",
              onClick: () => {
                // 可以跳转到新建任务页面或打开模态框
                window.location.href = '/ai'
              },
              variant: "primary"
            }
          ]
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
            title: "产品功能",
            content: "智能任务管理\nAI 辅助规划\n优先级自动排序"
          },
          {
            title: "快速链接",
            links: [
              { name: '首页', href: '/' },
              { name: 'AI 助手', href: '/ai' },
              { name: '使用文档', href: '#', external: true }
            ]
          },
          {
            title: "关于我们",
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
