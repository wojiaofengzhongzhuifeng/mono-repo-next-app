import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTodoStore } from '@/source/store/todoStore'
import { useAppStore } from '@/source/store/appStore'
import { getPriorityColor, getPriorityLabel, formatDate } from '@/source/_utils'

export default function TodoList() {
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all')
  const [sortBy, setSortBy] = useState<'createdAt' | 'priority' | 'text'>('createdAt')
  
  const { 
    todos, 
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    updateTodo,
    getTodoStats 
  } = useTodoStore()
  
  const { language } = useAppStore()
  
  const stats = getTodoStats()
  
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim())
      setNewTodo('')
    }
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }
  
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed
      case 'pending':
        return !todo.completed
      default:
        return true
    }
  })
  
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      case 'text':
        return a.text.localeCompare(b.text)
      case 'createdAt':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })
  
  return (
    <div className="space-y-6">
      {/* 添加任务 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={language === 'zh-CN' ? '添加新任务...' : 'Add new task...'}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={handleAddTodo}>
          {language === 'zh-CN' ? '添加' : 'Add'}
        </Button>
      </div>
      
      {/* 筛选和排序 */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            {language === 'zh-CN' ? '全部' : 'All'} ({stats.total})
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            {language === 'zh-CN' ? '待完成' : 'Pending'} ({stats.pending})
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            {language === 'zh-CN' ? '已完成' : 'Completed'} ({stats.completed})
          </Button>
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="createdAt">
            {language === 'zh-CN' ? '按创建时间' : 'By Created Time'}
          </option>
          <option value="priority">
            {language === 'zh-CN' ? '按优先级' : 'By Priority'}
          </option>
          <option value="text">
            {language === 'zh-CN' ? '按文本' : 'By Text'}
          </option>
        </select>
      </div>
      
      {/* 任务列表 */}
      <div className="space-y-2">
        {sortedTodos.map(todo => (
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
            
            <div className="flex-1">
              <span
                className={`block ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
              >
                {todo.text}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(todo.createdAt, language)}
              </span>
            </div>
            
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
              {getPriorityLabel(todo.priority, language)}
            </span>
            
            <select
              value={todo.priority}
              onChange={(e) => updateTodo(todo.id, { priority: e.target.value as any })}
              className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="low">{getPriorityLabel('low', language)}</option>
              <option value="medium">{getPriorityLabel('medium', language)}</option>
              <option value="high">{getPriorityLabel('high', language)}</option>
            </select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => deleteTodo(todo.id)}
            >
              {language === 'zh-CN' ? '删除' : 'Delete'}
            </Button>
          </div>
        ))}
        
        {sortedTodos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {language === 'zh-CN' ? '暂无任务' : 'No tasks'}
          </div>
        )}
      </div>
      
      {/* 批量操作 */}
      {stats.completed > 0 && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => {
              todos.filter(todo => todo.completed).forEach(todo => deleteTodo(todo.id))
            }}
          >
            {language === 'zh-CN' ? `清除已完成任务 (${stats.completed})` : `Clear Completed (${stats.completed})`}
          </Button>
        </div>
      )}
    </div>
  )
}
