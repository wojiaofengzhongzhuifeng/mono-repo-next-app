import React from 'react';
import { Button } from "@/components/ui/button";
import { useUserPreferencesStore } from "@/source/store/userPreferencesStore";
import { useTaskManagerStore } from "@/source/store/taskManagerStore";
import UserPreferences from "@/source/_components/user-preferences";
import TaskManager from "@/source/_components/task-manager";

function StoreDemo() {
  const { theme, language, setTheme, setLanguage } = useUserPreferencesStore();
  const { tasks, addTask, getTaskStats } = useTaskManagerStore();
  const stats = getTaskStats();

  // 演示 store 间的交互
  const handleAddSampleTask = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    
    addTask({
      title: `示例任务 - ${theme} 主题`,
      description: `当前语言: ${language === 'zh-CN' ? '中文' : 'English'}`,
      completed: false,
      priority: 'medium',
    });
    
    // 演示一个 store 影响另一个 store 的操作
    if (theme === 'dark') {
      setLanguage('en-US');
    } else if (theme === 'light') {
      setLanguage('zh-CN');
    }
  };

  const handleSwitchThemeBasedOnTasks = () => {
    // 根据任务数量切换主题
    if (stats.total > 5) {
      setTheme('dark');
    } else if (stats.total > 2) {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Zustand 按域分离架构演示
        </h1>
        
        {/* Store 交互演示区 */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Store 间交互演示</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">用户偏好状态</h3>
              <p className="text-sm">主题: {theme}</p>
              <p className="text-sm">语言: {language}</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold mb-2">任务管理状态</h3>
              <p className="text-sm">总任务: {stats.total}</p>
              <p className="text-sm">已完成: {stats.completed}</p>
              <p className="text-sm">待完成: {stats.pending}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleAddSampleTask}>
              添加示例任务 (跨 Store 影响)
            </Button>
            <Button onClick={handleSwitchThemeBasedOnTasks}>
              根据任务数量切换主题
            </Button>
          </div>
        </div>

        {/* 组件演示区 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">用户偏好组件</h2>
            <UserPreferences />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">任务管理组件</h2>
            <TaskManager />
          </div>
        </div>

        {/* 架构说明 */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">架构说明</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">按域分离的优势</h3>
              <ul className="text-sm space-y-1">
                <li>✅ 单一职责 - 每个 Store 专注一个业务域</li>
                <li>✅ 易于维护 - 减少代码耦合</li>
                <li>✅ 按需加载 - 只订阅需要的 Store</li>
                <li>✅ 独立测试 - 每个 Store 可单独测试</li>
                <li>✅ 团队协作 - 不同成员负责不同域</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Store 间交互方式</h3>
              <ul className="text-sm space-y-1">
                <li>🔄 组件层协调 - 在组件中组合多个 Store</li>
                <li>📊 数据同步 - 通过组件逻辑实现数据流</li>
                <li>🎯 精准更新 - 只更新相关的状态</li>
                <li>🔧 松耦合 - Store 间不直接依赖</li>
                <li>📈 可扩展性 - 容易添加新的业务域</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreDemo;