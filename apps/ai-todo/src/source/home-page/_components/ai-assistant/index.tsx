import React from 'react'
import { Button } from '@/components/ui/button'
import { useAIStore } from '@/source/home-page/store/aiStore'
import { useTodoStore } from '@/source/home-page/store/todoStore'
import { useAppStore } from '@/source/home-page/store/appStore'

export default function AIAssistant() {
  const { currentSuggestion, generateSuggestion, suggestions } = useAIStore()
  const { getTodoStats } = useTodoStore()
  const { language } = useAppStore() as unknown as { language: 'zh-CN' | 'en' }
  
  const stats = getTodoStats()
  
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'productivity':
        return '⚡'
      case 'priority':
        return '🎯'
      case 'planning':
        return '📋'
      case 'wellness':
        return '🌱'
      default:
        return '🤖'
    }
  }
  
  const getSuggestionTypeLabel = (type: string) => {
    const labels = {
      'zh-CN': {
        productivity: '效率',
        priority: '优先级',
        planning: '规划',
        wellness: '健康',
      },
      'en': {
        productivity: 'Productivity',
        priority: 'Priority',
        planning: 'Planning',
        wellness: 'Wellness',
      },
    }
    return labels[language][type as keyof typeof labels[typeof language]]
  }
  
  return (
    <div className="space-y-6">
      {/* 当前建议 */}
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">
            {currentSuggestion ? getSuggestionIcon(currentSuggestion.type) : '🤖'}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">
              {language === 'zh-CN' ? 'AI 建议' : 'AI Suggestion'}
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              {currentSuggestion?.text || (language === 'zh-CN' ? '点击下方按钮获取 AI 建议' : 'Click the button below to get AI suggestions')}
            </p>
            {currentSuggestion && (
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {getSuggestionTypeLabel(currentSuggestion.type)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* 生成建议按钮 */}
      <Button onClick={generateSuggestion} className="w-full">
        {language === 'zh-CN' ? '获取 AI 建议' : 'Get AI Suggestion'}
      </Button>
      
      {/* 统计信息 */}
      <div className="border-t pt-4">
        <h3 className="font-medium mb-4">
          {language === 'zh-CN' ? '任务统计' : 'Task Statistics'}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {language === 'zh-CN' ? '总任务数:' : 'Total Tasks:'}
            </span>
            <span className="font-medium">{stats.total}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {language === 'zh-CN' ? '已完成:' : 'Completed:'}
            </span>
            <span className="font-medium text-green-600">{stats.completed}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {language === 'zh-CN' ? '待完成:' : 'Pending:'}
            </span>
            <span className="font-medium text-orange-600">{stats.pending}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {language === 'zh-CN' ? '完成率:' : 'Completion Rate:'}
            </span>
            <span className="font-medium">{stats.completionRate}%</span>
          </div>
        </div>
        
        {/* 进度条 */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* 历史建议 */}
      {suggestions.length > 1 && (
        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">
            {language === 'zh-CN' ? '最近建议' : 'Recent Suggestions'}
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {suggestions.slice(1, 6).map((suggestion) => (
              <div key={suggestion.id} className="flex items-start gap-2 text-sm">
                <span>{getSuggestionIcon(suggestion.type)}</span>
                <p className="text-gray-600 line-clamp-2">{suggestion.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 智能洞察 */}
      {stats.total > 0 && (
        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">
            {language === 'zh-CN' ? '智能洞察' : 'Smart Insights'}
          </h3>
          <div className="space-y-2 text-sm">
            {stats.completionRate >= 80 && (
              <div className="flex items-center gap-2 text-green-600">
                <span>🎉</span>
                <span>
                  {language === 'zh-CN' 
                    ? '完成率很高，继续保持！' 
                    : 'Great completion rate, keep it up!'}
                </span>
              </div>
            )}
            {stats.pending > 10 && (
              <div className="flex items-center gap-2 text-orange-600">
                <span>⚠️</span>
                <span>
                  {language === 'zh-CN' 
                    ? '待完成任务较多，建议优先处理高优先级任务。' 
                    : 'Many pending tasks, prioritize high-priority ones.'}
                </span>
              </div>
            )}
            {stats.total === 0 && (
              <div className="flex items-center gap-2 text-blue-600">
                <span>💡</span>
                <span>
                  {language === 'zh-CN' 
                    ? '开始添加您的第一个任务吧！' 
                    : 'Start by adding your first task!'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
