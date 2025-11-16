import React from 'react'
import { Layout } from 'antd'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'

const { Header, Content } = Layout

export default function HomePage() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#fff',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div className='px-6'>
            <h1 className='text-xl font-semibold'>Count Number 管理系统</h1>
          </div>
        </Header>
        <Content>
          <Dashboard />
        </Content>
      </Layout>
    </Layout>
  )
}
