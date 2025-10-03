import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Todo, TodoStats } from '@/source/_types'

interface TodoStore {
  todos: Todo[]
  addTodo: (text: string, priority?: 'low' | 'medium' | 'high') => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, updates: Partial<Todo>) => void
  clearCompleted: () => void
  getTodoStats: () => TodoStats
  getTodosByPriority: (priority: 'low' | 'medium' | 'high') => Todo[]
  getCompletedTodos: () => Todo[]
  getPendingTodos: () => Todo[]
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      
      addTodo: (text: string, priority: 'medium' = 'medium') => {
        const newTodo: Todo = {
          id: Date.now().toString(),
          text: text.trim(),
          completed: false,
          priority,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        
        set((state) => ({
          todos: [...state.todos, newTodo],
        }))
      },
      
      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
              : todo
          ),
        }))
      },
      
      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }))
      },
      
      updateTodo: (id: string, updates: Partial<Todo>) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, ...updates, updatedAt: new Date() }
              : todo
          ),
        }))
      },
      
      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }))
      },
      
      getTodoStats: () => {
        const { todos } = get()
        const completed = todos.filter((todo) => todo.completed).length
        const pending = todos.filter((todo) => !todo.completed).length
        const total = todos.length
        
        return {
          total,
          completed,
          pending,
          completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        }
      },
      
      getTodosByPriority: (priority: 'low' | 'medium' | 'high') => {
        const { todos } = get()
        return todos.filter((todo) => todo.priority === priority)
      },
      
      getCompletedTodos: () => {
        const { todos } = get()
        return todos.filter((todo) => todo.completed)
      },
      
      getPendingTodos: () => {
        const { todos } = get()
        return todos.filter((todo) => !todo.completed)
      },
    }),
    {
      name: 'todo-storage',
    }
  )
)
