import React from 'react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/source/ai/store/appStore'

export default function AppSettings() {
  const { theme, language, setTheme, setLanguage, toggleTheme } = useAppStore() as unknown as {
    theme: 'light' | 'dark' | 'system'
    language: 'zh-CN' | 'en'
    setTheme: (theme: 'light' | 'dark' | 'system') => void
    setLanguage: (language: 'zh-CN' | 'en') => void
    toggleTheme: () => void
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">
          {language === 'zh-CN' ? '应用设置' : 'App Settings'}
        </h3>
        
        {/* 主题设置 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">
            {language === 'zh-CN' ? '主题' : 'Theme'}
          </label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('light')}
              >
                {language === 'zh-CN' ? '浅色' : 'Light'}
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('dark')}
              >
                {language === 'zh-CN' ? '深色' : 'Dark'}
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('system')}
              >
                {language === 'zh-CN' ? '跟随系统' : 'System'}
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
            >
              {language === 'zh-CN' ? '切换主题' : 'Toggle Theme'}
            </Button>
          </div>
        </div>
        
        {/* 语言设置 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">
            {language === 'zh-CN' ? '语言' : 'Language'}
          </label>
          <div className="flex gap-2">
            <Button
              variant={language === 'zh-CN' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('zh-CN')}
            >
              中文
            </Button>
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
            >
              English
            </Button>
          </div>
        </div>
        
        {/* 当前设置显示 */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">
            {language === 'zh-CN' ? '当前设置' : 'Current Settings'}
          </h4>
          <div className="space-y-1 text-sm text-gray-600">
            <div>
              {language === 'zh-CN' ? '主题: ' : 'Theme: '}
              <span className="font-medium">
                {theme === 'light' 
                  ? (language === 'zh-CN' ? '浅色' : 'Light')
                  : theme === 'dark' 
                    ? (language === 'zh-CN' ? '深色' : 'Dark')
                    : (language === 'zh-CN' ? '跟随系统' : 'System')
                }
              </span>
            </div>
            <div>
              {language === 'zh-CN' ? '语言: ' : 'Language: '}
              <span className="font-medium">
                {language === 'zh-CN' ? '中文' : 'English'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
