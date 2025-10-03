import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/source/store/appStore'

export default function Home() {
  const { language } = useAppStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Todo App</h1>
          <p className="text-xl text-gray-600 mb-8">
            {language === 'zh-CN'
              ? '欢迎来到智能待办事项应用'
              : 'Welcome to the Smart Todo Application'}
          </p>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '开始使用' : 'Get Started'}
              </h2>
              <p className="text-gray-600 mb-6">
                {language === 'zh-CN'
                  ? '使用 AI 技术来管理您的待办事项，让生活更加高效有序。'
                  : 'Use AI technology to manage your todos for a more efficient and organized life.'}
              </p>

              <div className="space-y-4">
                <Link href="/ai">
                  <Button className="w-full">
                    {language === 'zh-CN'
                      ? '进入 AI 助手'
                      : 'Enter AI Assistant'}
                  </Button>
                </Link>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    {language === 'zh-CN' ? '查看任务' : 'View Tasks'}
                  </Button>
                  <Button variant="outline" className="w-full">
                    {language === 'zh-CN' ? '设置' : 'Settings'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-blue-500 text-3xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'zh-CN' ? 'AI 智能助手' : 'AI Smart Assistant'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'zh-CN'
                    ? '使用先进的 AI 技术来帮助您管理任务'
                    : 'Use advanced AI technology to help you manage tasks'}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-green-500 text-3xl mb-4">✓</div>
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'zh-CN' ? '任务管理' : 'Task Management'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'zh-CN'
                    ? '轻松创建、编辑和完成您的待办事项'
                    : 'Easily create, edit and complete your todos'}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-purple-500 text-3xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'zh-CN' ? '数据分析' : 'Data Analytics'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'zh-CN'
                    ? '查看您的任务完成情况和效率统计'
                    : 'View your task completion and efficiency statistics'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
