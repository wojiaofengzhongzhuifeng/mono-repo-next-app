import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useTaskManagerStore } from "@/source/store/taskManagerStore";

function TaskManager() {
  const {
    tasks,
    activeTaskId,
    filter,
    sortBy,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    setActiveTask,
    setFilter,
    setSortBy,
    clearCompleted,
    getFilteredTasks,
    getTaskStats,
  } = useTaskManagerStore();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const filteredTasks = getFilteredTasks();
  const stats = getTaskStats();

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim(),
        completed: false,
        priority: newTaskPriority,
      });
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskPriority('medium');
    }
  };

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">任务管理器</h1>
      
      {/* 统计信息 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">总任务</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">已完成</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">待完成</div>
        </div>
      </div>

      {/* 添加任务表单 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">添加新任务</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="任务标题"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="任务描述（可选）"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={2}
          />
          <div className="flex gap-2 items-center">
            <span className="text-sm">优先级：</span>
            {(['low', 'medium', 'high'] as const).map((priority) => (
              <Button
                key={priority}
                onClick={() => setNewTaskPriority(priority)}
                variant={newTaskPriority === priority ? 'default' : 'outline'}
                size="sm"
              >
                {priority === 'low' ? '低' : priority === 'medium' ? '中' : '高'}
              </Button>
            ))}
            <Button onClick={handleAddTask} className="ml-auto">
              添加任务
            </Button>
          </div>
        </div>
      </div>

      {/* 过滤和排序 */}
      <div className="mb-4 flex flex-wrap gap-2">
        <div className="flex gap-2 items-center">
          <span className="text-sm">筛选：</span>
          {(['all', 'active', 'completed'] as const).map((f) => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
            >
              {f === 'all' ? '全部' : f === 'active' ? '进行中' : '已完成'}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2 items-center ml-4">
          <span className="text-sm">排序：</span>
          {(['createdAt', 'priority', 'title'] as const).map((sort) => (
            <Button
              key={sort}
              onClick={() => setSortBy(sort)}
              variant={sortBy === sort ? 'default' : 'outline'}
              size="sm"
            >
              {sort === 'createdAt' ? '创建时间' : sort === 'priority' ? '优先级' : '标题'}
            </Button>
          ))}
        </div>
        
        <Button onClick={clearCompleted} variant="outline" size="sm" className="ml-auto">
          清除已完成
        </Button>
      </div>

      {/* 任务列表 */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {tasks.length === 0 ? '暂无任务，请添加新任务' : '没有符合条件的任务'}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 border rounded-lg ${
                activeTaskId === task.id ? 'border-blue-500 bg-blue-50' : ''
              } ${task.completed ? 'bg-gray-50' : 'bg-white'}`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="mt-1"
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority === 'low' ? '低' : task.priority === 'medium' ? '中' : '高'}
                    </span>
                  </div>
                  
                  {task.description && (
                    <p className={`text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                      {task.description}
                    </p>
                  )}
                  
                  <div className="text-xs text-gray-400 mt-1">
                    创建: {new Date(task.createdAt).toLocaleString('zh-CN')}
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <Button
                    onClick={() => setActiveTask(activeTaskId === task.id ? null : task.id)}
                    variant={activeTaskId === task.id ? 'default' : 'outline'}
                    size="sm"
                  >
                    {activeTaskId === task.id ? '取消选中' : '选中'}
                  </Button>
                  <Button
                    onClick={() => deleteTask(task.id)}
                    variant="destructive"
                    size="sm"
                  >
                    删除
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 当前选中任务 */}
      {activeTaskId && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            当前选中任务 ID: {activeTaskId}
          </p>
        </div>
      )}
    </div>
  );
}

export default TaskManager;