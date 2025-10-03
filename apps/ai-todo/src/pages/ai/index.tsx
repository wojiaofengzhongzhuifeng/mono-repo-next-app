import React from 'react'
import Link from 'next/link'
import { Button } from '@/components'
import AIPage from '@/source/ai/page'

export default function AIPageRoute() {
  return (
    <div>
      {/* Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Todo App</h1>
            <p className="text-gray-600">智能管理您的待办事项</p>
          </div>
          <Link href="/">
            <Button variant="outline">返回首页</Button>
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <AIPage />
    </div>
  )
}
