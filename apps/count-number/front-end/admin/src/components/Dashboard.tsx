'use client'

import React from 'react'
import { Card, Row, Col, Statistic, Typography } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

const { Title } = Typography

interface NumberStats {
  totalCount: number
  activeCount: number
  inactiveCount: number
}

export default function Dashboard() {
  const stats: NumberStats = {
    totalCount: 156,
    activeCount: 89,
    inactiveCount: 67,
  }

  return (
    <div>
      <Title level={2} className='mb-6'>
        仪表盘
      </Title>

      <Row gutter={16} className='mb-8'>
        <Col span={8}>
          <Card>
            <Statistic
              title='总数'
              value={stats.totalCount}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title='激活数量'
              value={stats.activeCount}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title='停用数量'
              value={stats.inactiveCount}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title='快速操作'>
        <div className='space-y-4'>
          <div>
            <h4>数字管理</h4>
            <p className='text-gray-600'>管理系统中的所有数字配置</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
