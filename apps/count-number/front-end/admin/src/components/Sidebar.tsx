'use client'

import { useState } from 'react'
import { Layout, Menu } from 'antd'
import { useRouter } from 'next/navigation'
import { DashboardOutlined, NumberOutlined } from '@ant-design/icons'

const { Sider } = Layout

const menuItems = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: '仪表盘',
  },
  {
    key: '/numbers',
    icon: <NumberOutlined />,
    label: '数字管理',
  },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key)
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className='h-16 m-4 flex items-center justify-center bg-white/10 rounded-lg'>
        <h1
          className={`font-bold text-white ${collapsed ? 'text-sm' : 'text-base'}`}
        >
          {collapsed ? 'Admin' : 'Admin Panel'}
        </h1>
      </div>
      <Menu
        theme='dark'
        mode='inline'
        selectedKeys={[
          typeof window !== 'undefined' ? window.location.pathname : '/',
        ]}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  )
}
