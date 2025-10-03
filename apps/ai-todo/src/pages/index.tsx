import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Todo App test 2025年10月03日12:45:27
          </h1>
          <p className="text-xl text-gray-600 mb-8">欢迎来到智能待办事项应用</p>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                开始使用
              </h2>
              <p className="text-gray-600 mb-6">
                使用 AI 技术来管理您的待办事项，让生活更加高效有序。
              </p>

              <div className="space-y-4">
                <Link href="/ai">
                  <Button className="w-full">进入 AI 助手</Button>
                </Link>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    查看任务
                  </Button>
                  <Button variant="outline" className="w-full">
                    设置
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-blue-500 text-3xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold mb-2">AI 智能助手</h3>
                <p className="text-gray-600 text-sm">
                  使用先进的 AI 技术来帮助您管理任务
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-green-500 text-3xl mb-4">✓</div>
                <h3 className="text-lg font-semibold mb-2">任务管理</h3>
                <p className="text-gray-600 text-sm">
                  轻松创建、编辑和完成您的待办事项
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-purple-500 text-3xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">数据分析</h3>
                <p className="text-gray-600 text-sm">
                  查看您的任务完成情况和效率统计
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
