import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// 任务类型定义
interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
  updatedAt: Date
}

// 任务管理的业务域
interface TaskManagerState {
  // 任务数据
  tasks: Task[]
  activeTaskId: string | null
  
  // UI 状态
  filter: 'all' | 'active' | 'completed'
  sortBy: 'createdAt' | 'priority' | 'title'
  
  // 统计信息
  totalTasks: number
  completedTasks: number
  
  // 动作方法
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTaskCompletion: (id: string) => void
  setActiveTask: (id: string | null) => void
  setFilter: (filter: 'all' | 'active' | 'completed') => void
  setSortBy: (sortBy: 'createdAt' | 'priority' | 'title') => void
  clearCompleted: () => void
  getFilteredTasks: () => Task[]
  getTaskStats: () => { total: number; completed: number; pending: number }
}

const initialTasksState: Omit<TaskManagerState, 'addTask' | 'updateTask' | 'deleteTask' | 'toggleTaskCompletion' | 'setActiveTask' | 'setFilter' | 'setSortBy' | 'clearCompleted' | 'getFilteredTasks' | 'getTaskStats'> = {
  tasks: [],
  activeTaskId: null,
  filter: 'all',
  sortBy: 'createdAt',
  totalTasks: 0,
  completedTasks: 0,
}

export const useTaskManagerStore = create<TaskManagerState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialTasksState,
        
        // 基础 CRUD 操作
        addTask: (taskData) => {
          const newTask: Task = {
            ...taskData,
            id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          
          set((state) => ({
            tasks: [...state.tasks, newTask],
            totalTasks: state.totalTasks + 1,
          }))
        },
        
        updateTask: (id, updates) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
            ),
          }))
        },
        
        deleteTask: (id) => {
          set((state) => {
            const taskToDelete = state.tasks.find(task => task.id === id)
            const isCompleted = taskToDelete?.completed
            
            return {
              tasks: state.tasks.filter((task) => task.id !== id),
              totalTasks: state.totalTasks - 1,
              completedTasks: isCompleted ? state.completedTasks - 1 : state.completedTasks,
              activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
            }
          })
        },
        
        toggleTaskCompletion: (id) => {
          set((state) => {
            const task = state.tasks.find(task => task.id === id)
            if (!task) return state
            
            const isCompleting = !task.completed
            
            return {
              tasks: state.tasks.map((task) =>
                task.id === id 
                  ? { ...task, completed: isCompleting, updatedAt: new Date() } 
                  : task
              ),
              completedTasks: isCompleting 
                ? state.completedTasks + 1 
                : state.completedTasks - 1,
            }
          })
        },
        
        // UI 状态管理
        setActiveTask: (id) => set({ activeTaskId: id }),
        setFilter: (filter) => set({ filter }),
        setSortBy: (sortBy) => set({ sortBy }),
        
        // 批量操作
        clearCompleted: () => {
          set((state) => {
            const activeTasks = state.tasks.filter(task => !task.completed)
            return {
              tasks: activeTasks,
              totalTasks: activeTasks.length,
              completedTasks: 0,
              activeTaskId: state.activeTaskId && activeTasks.some(t => t.id === state.activeTaskId) 
                ? state.activeTaskId 
                : null,
            }
          })
        },
        
        // 计算属性
        getFilteredTasks: () => {
          const { tasks, filter, sortBy } = get()
          
          // 过滤
          let filtered = tasks
          if (filter === 'active') {
            filtered = tasks.filter(task => !task.completed)
          } else if (filter === 'completed') {
            filtered = tasks.filter(task => task.completed)
          }
          
          // 排序
          return [...filtered].sort((a, b) => {
            switch (sortBy) {
              case 'priority':
                const priorityOrder = { high: 3, medium: 2, low: 1 }
                return priorityOrder[b.priority] - priorityOrder[a.priority]
              case 'title':
                return a.title.localeCompare(b.title)
              case 'createdAt':
              default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            }
          })
        },
        
        getTaskStats: () => {
          const { tasks, completedTasks } = get()
          return {
            total: tasks.length,
            completed: completedTasks,
            pending: tasks.length - completedTasks,
          }
        },
      }),
      {
        name: 'task-manager-storage',
        // 只持久化任务数据，不持久化 UI 状态
        partialize: (state) => ({
          tasks: state.tasks,
          totalTasks: state.totalTasks,
          completedTasks: state.completedTasks,
        }),
      }
    ),
    {
      name: 'task-manager-store',
    }
  )
)