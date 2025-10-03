import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Todo {
  id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

export default function AIPage() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: '学习 React 框架', completed: false, priority: 'high' },
    { id: '2', text: '完成项目文档', completed: true, priority: 'medium' },
    { id: '3', text: '准备明天的会议', completed: false, priority: 'high' },
  ])
  const [newTodo, setNewTodo] = useState('')
  const [aiSuggestion, setAiSuggestion] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
        priority: 'medium',
      }
      setTodos([...todos, todo])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const generateAISuggestion = () => {
    const suggestions = [
      '建议您优先完成高优先级任务',
      '您可以尝试使用番茄工作法来提高效率',
      '记得在任务之间适当休息',
      '将大任务分解为小任务会更容易完成',
      '建议每天早上规划当天的任务',
    ]
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
    setAiSuggestion(randomSuggestion)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI 助手</h1>
              <p className="text-gray-600 mt-2">智能管理您的待办事项</p>
            </div>
            <Link href="/">
              <Button variant="outline">返回首页</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Todo List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">任务列表</h2>
                
                {/* Add Todo */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="添加新任务..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button onClick={addTodo}>添加</Button>
                </div>

                {/* Todo Items */}
                <div className="space-y-2">
                  {todos.map(todo => (
                    <div
                      key={todo.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span
                        className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
                      >
                        {todo.text}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                        {todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低'}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        删除
                      </Button>
                    </div>
                  ))}
                </div>

                {todos.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    暂无任务，添加您的第一个任务吧！
                  </div>
                )}
              </div>
            </div>

            {/* AI Assistant */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">AI 建议</h2>
                
                <div className="mb-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">🤖</div>
                      <div>
                        <p className="text-sm text-gray-700">
                          {aiSuggestion || '点击下方按钮获取 AI 建议'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={generateAISuggestion} className="w-full mb-4">
                  获取 AI 建议
                </Button>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">统计信息</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">总任务数:</span>
                      <span className="font-medium">{todos.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">已完成:</span>
                      <span className="font-medium text-green-600">
                        {todos.filter(t => t.completed).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">待完成:</span>
                      <span className="font-medium text-orange-600">
                        {todos.filter(t => !t.completed).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">完成率:</span>
                      <span className="font-medium">
                        {todos.length > 0 
                          ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100)
                          : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
