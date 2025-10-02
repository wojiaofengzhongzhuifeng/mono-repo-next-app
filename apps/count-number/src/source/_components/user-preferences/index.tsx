import React from 'react';
import { Button } from "@/components/ui/button";
import { useUserPreferencesStore } from "@/source/store/userPreferencesStore";

function UserPreferences() {
  const {
    theme,
    language,
    fontSize,
    sidebarCollapsed,
    emailNotifications,
    pushNotifications,
    setTheme,
    setLanguage,
    setFontSize,
    toggleSidebar,
    toggleEmailNotifications,
    togglePushNotifications,
    resetPreferences,
  } = useUserPreferencesStore();

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">用户偏好设置</h1>
      
      <div className="space-y-6">
        {/* 主题设置 */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-3">主题设置</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">主题模式</label>
              <div className="flex gap-2">
                {(['light', 'dark', 'system'] as const).map((mode) => (
                  <Button
                    key={mode}
                    onClick={() => setTheme(mode)}
                    variant={theme === mode ? 'default' : 'outline'}
                    size="sm"
                  >
                    {mode === 'light' ? '浅色' : mode === 'dark' ? '深色' : '跟随系统'}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">字体大小</label>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <Button
                    key={size}
                    onClick={() => setFontSize(size)}
                    variant={fontSize === size ? 'default' : 'outline'}
                    size="sm"
                  >
                    {size === 'small' ? '小' : size === 'medium' ? '中' : '大'}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 语言设置 */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-3">语言设置</h2>
          <div className="flex gap-2">
            {(['zh-CN', 'en-US'] as const).map((lang) => (
              <Button
                key={lang}
                onClick={() => setLanguage(lang)}
                variant={language === lang ? 'default' : 'outline'}
                size="sm"
              >
                {lang === 'zh-CN' ? '中文' : 'English'}
              </Button>
            ))}
          </div>
        </div>

        {/* 界面设置 */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-3">界面设置</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">侧边栏折叠</span>
              <Button
                onClick={toggleSidebar}
                variant={sidebarCollapsed ? 'default' : 'outline'}
                size="sm"
              >
                {sidebarCollapsed ? '已折叠' : '已展开'}
              </Button>
            </div>
          </div>
        </div>

        {/* 通知设置 */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-3">通知设置</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">邮件通知</span>
              <Button
                onClick={toggleEmailNotifications}
                variant={emailNotifications ? 'default' : 'outline'}
                size="sm"
              >
                {emailNotifications ? '已开启' : '已关闭'}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">推送通知</span>
              <Button
                onClick={togglePushNotifications}
                variant={pushNotifications ? 'default' : 'outline'}
                size="sm"
              >
                {pushNotifications ? '已开启' : '已关闭'}
              </Button>
            </div>
          </div>
        </div>

        {/* 当前设置预览 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">当前设置</h3>
          <div className="text-sm space-y-1">
            <p>主题: {theme === 'light' ? '浅色' : theme === 'dark' ? '深色' : '跟随系统'}</p>
            <p>语言: {language === 'zh-CN' ? '中文' : 'English'}</p>
            <p>字体: {fontSize === 'small' ? '小' : fontSize === 'medium' ? '中' : '大'}</p>
            <p>侧边栏: {sidebarCollapsed ? '折叠' : '展开'}</p>
            <p>邮件通知: {emailNotifications ? '开启' : '关闭'}</p>
            <p>推送通知: {pushNotifications ? '开启' : '关闭'}</p>
          </div>
        </div>

        {/* 重置按钮 */}
        <div className="flex justify-center">
          <Button onClick={resetPreferences} variant="destructive">
            重置所有设置
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserPreferences;