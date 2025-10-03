import React from 'react'
import TodoList from '@/source/ai/_components/todo-list'
import AIAssistant from '@/source/ai/_components/ai-assistant'
import AppSettings from '@/source/ai/_components/app-settings'
import { useTodoStore } from '@/source/ai/store/todoStore'
import { useAIStore } from '@/source/ai/store/aiStore'
import { useAppStore } from '@/source/ai/store/appStore'
import { getThemeClasses } from '@/source/ai/_utils'

function Page() {
  const { theme, language } = useAppStore() as unknown as {
    theme: 'light' | 'dark' | 'system'
    language: 'zh-CN' | 'en'
  }
  const { getTodoStats } = useTodoStore()
  const { currentSuggestion } = useAIStore()

  const stats = getTodoStats()
  const themeClasses = getThemeClasses(theme)

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              test123321
              {language === 'zh-CN' ? 'AI Todo App' : 'AI Todo App'}
            </h1>
            <p className="text-xl opacity-80">
              {language === 'zh-CN'
                ? '使用 AI 技术来管理您的待办事项，让生活更加高效有序'
                : 'Manage your todos with AI technology for a more efficient and organized life'}
            </p>
          </div>

          {/* 域间数据交互演示区 */}
          <div
            className={`mb-8 p-6 rounded-lg shadow-lg ${themeClasses.card} ${themeClasses.border} border`}
          >
            <h2 className="text-xl font-semibold mb-4">
              {language === 'zh-CN'
                ? '跨域数据交互'
                : 'Cross-Domain Data Interaction'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div
                className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50'}`}
              >
                <h3 className="font-semibold mb-2">
                  {language === 'zh-CN' ? '任务域状态' : 'Task Domain State'}
                </h3>
                <p className="text-sm">
                  {language === 'zh-CN'
                    ? `总任务: ${stats.total}`
                    : `Total Tasks: ${stats.total}`}
                </p>
                <p className="text-sm">
                  {language === 'zh-CN'
                    ? `已完成: ${stats.completed}`
                    : `Completed: ${stats.completed}`}
                </p>
              </div>

              <div
                className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900' : 'bg-green-50'}`}
              >
                <h3 className="font-semibold mb-2">
                  {language === 'zh-CN' ? '应用域状态' : 'App Domain State'}
                </h3>
                <p className="text-sm">
                  {language === 'zh-CN' ? `主题: ${theme}` : `Theme: ${theme}`}
                </p>
                <p className="text-sm">
                  {language === 'zh-CN'
                    ? `语言: ${language}`
                    : `Language: ${language}`}
                </p>
              </div>

              <div
                className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900' : 'bg-purple-50'}`}
              >
                <h3 className="font-semibold mb-2">
                  {language === 'zh-CN' ? 'AI 域状态' : 'AI Domain State'}
                </h3>
                <p className="text-sm">
                  {language === 'zh-CN'
                    ? currentSuggestion
                      ? '有建议'
                      : '无建议'
                    : currentSuggestion
                      ? 'Has Suggestion'
                      : 'No Suggestion'}
                </p>
                <p className="text-sm">
                  {language === 'zh-CN'
                    ? `完成率: ${stats.completionRate}%`
                    : `Completion: ${stats.completionRate}%`}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                  // 演示跨域交互：根据任务完成率生成特定类型的建议
                  if (stats.completionRate < 30) {
                    console.log(
                      'Low completion rate - generate productivity suggestion'
                    )
                  } else if (stats.completionRate > 80) {
                    console.log(
                      'High completion rate - generate wellness suggestion'
                    )
                  }
                }}
              >
                {language === 'zh-CN'
                  ? '智能分析任务状态'
                  : 'Analyze Task Status'}
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => {
                  // 演示跨域交互：根据语言设置调整界面
                  console.log('Language-based UI adjustment')
                }}
              >
                {language === 'zh-CN' ? '优化界面设置' : 'Optimize UI Settings'}
              </button>
            </div>
          </div>

          {/* 主要功能区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Todo List - 任务域 */}
            <div className="lg:col-span-2">
              <div
                className={`p-6 rounded-lg border-4 ${theme === 'dark' ? 'border-blue-400' : 'border-blue-600'} ${themeClasses.card}`}
              >
                <div
                  className={`mb-4 p-3 rounded text-sm font-medium ${theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}
                >
                  📋{' '}
                  {language === 'zh-CN'
                    ? '任务域 - 负责任务的增删改查'
                    : 'Task Domain - Manages CRUD operations for tasks'}
                </div>
                <h2 className="text-xl font-semibold mb-4">
                  {language === 'zh-CN' ? '任务管理' : 'Task Management'}
                </h2>
                <TodoList />
              </div>
            </div>

            {/* AI Assistant & Settings - 侧边栏 */}
            <div className="space-y-8">
              {/* AI Assistant - AI 域 */}
              <div
                className={`p-6 rounded-lg border-4 ${theme === 'dark' ? 'border-purple-400' : 'border-purple-600'} ${themeClasses.card}`}
              >
                <div
                  className={`mb-4 p-3 rounded text-sm font-medium ${theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}
                >
                  🤖{' '}
                  {language === 'zh-CN'
                    ? 'AI 域 - 负责智能建议和分析'
                    : 'AI Domain - Provides intelligent suggestions and analysis'}
                </div>
                <h2 className="text-xl font-semibold mb-4">
                  {language === 'zh-CN' ? 'AI 助手' : 'AI Assistant'}
                </h2>
                <AIAssistant />
              </div>

              {/* App Settings - 应用域 */}
              <div
                className={`p-6 rounded-lg border-4 ${theme === 'dark' ? 'border-green-400' : 'border-green-600'} ${themeClasses.card}`}
              >
                <div
                  className={`mb-4 p-3 rounded text-sm font-medium ${theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}
                >
                  ⚙️{' '}
                  {language === 'zh-CN'
                    ? '应用域 - 负责主题、语言等设置'
                    : 'App Domain - Manages theme, language and other settings'}
                </div>
                <h2 className="text-xl font-semibold mb-4">
                  {language === 'zh-CN' ? '应用设置' : 'App Settings'}
                </h2>
                <AppSettings />
              </div>
            </div>
          </div>

          {/* 数据流说明 */}
          <div
            className={`mt-12 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
          >
            <h2 className="text-xl font-semibold mb-4">
              {language === 'zh-CN'
                ? '跨域数据流说明'
                : 'Cross-Domain Data Flow Explanation'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">
                  {language === 'zh-CN'
                    ? '数据交互方式'
                    : 'Data Interaction Methods'}
                </h3>
                <ul className="text-sm space-y-1">
                  <li>
                    🔄{' '}
                    {language === 'zh-CN'
                      ? '页面组件协调多个域的Store'
                      : 'Page component coordinates multiple domain Stores'}
                  </li>
                  <li>
                    📊{' '}
                    {language === 'zh-CN'
                      ? '任务域 → AI域: 根据任务状态生成建议'
                      : 'Task Domain → AI Domain: Generate suggestions based on task status'}
                  </li>
                  <li>
                    🎯{' '}
                    {language === 'zh-CN'
                      ? '应用域 → 所有域: 主题和语言设置影响全局'
                      : 'App Domain → All Domains: Theme and language affect globally'}
                  </li>
                  <li>
                    📈{' '}
                    {language === 'zh-CN'
                      ? 'AI域 → 任务域: 提供任务管理建议'
                      : 'AI Domain → Task Domain: Provide task management suggestions'}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">
                  {language === 'zh-CN'
                    ? '架构优势'
                    : 'Architectural Advantages'}
                </h3>
                <ul className="text-sm space-y-1">
                  <li>
                    ✅{' '}
                    {language === 'zh-CN'
                      ? '松耦合 - 各域独立管理状态'
                      : 'Loose Coupling - Each domain manages state independently'}
                  </li>
                  <li>
                    🎯{' '}
                    {language === 'zh-CN'
                      ? '精准更新 - 只更新相关状态'
                      : 'Precise Updates - Only update relevant states'}
                  </li>
                  <li>
                    🔧{' '}
                    {language === 'zh-CN'
                      ? '易维护 - 单一职责原则'
                      : 'Easy Maintenance - Single responsibility principle'}
                  </li>
                  <li>
                    📊{' '}
                    {language === 'zh-CN'
                      ? '可观测 - 清晰的数据流向'
                      : 'Observable - Clear data flow direction'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
