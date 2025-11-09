'use client'

import { ConfigProvider, Layout as AntLayout } from 'antd'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const theme = {
  token: {
    colorPrimary: '#1890ff',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='zh-CN'>
      <body className={inter.className}>
        <ConfigProvider theme={theme}>{children}</ConfigProvider>
      </body>
    </html>
  )
}
