// UI Components
export { Button } from './ui/button'

// Source Components - AI Domain
export { default as TodoList } from '../source/ai/_components/todo-list'
export { default as AIAssistant } from '../source/ai/_components/ai-assistant'
export { default as AppSettings } from '../source/ai/_components/app-settings'

// Source Components - Home Domain
export { default as HomeTodoList } from '../source/home-page/_components/todo-list'
export { default as HomeAIAssistant } from '../source/home-page/_components/ai-assistant'
export { default as HomeAppSettings } from '../source/home-page/_components/app-settings'

// Pages
export { default as AIPage } from '../source/ai/page'
export { default as HomePage } from '../source/home-page/page'

// Stores - AI Domain
export { useTodoStore } from '../source/ai/store/todoStore'
export { useAIStore } from '../source/ai/store/aiStore'
export { useAppStore } from '../source/ai/store/appStore'

// Stores - Home Domain
export { useTodoStore as useHomeTodoStore } from '../source/home-page/store/todoStore'
export { useAIStore as useHomeAIStore } from '../source/home-page/store/aiStore'
export { useAppStore as useHomeAppStore } from '../source/home-page/store/appStore'

// Utils
export { getThemeClasses } from '../source/ai/_utils'
export { getThemeClasses as getHomeThemeClasses } from '../source/home-page/_utils'

// Types
export type { Todo, TodoStats, AISuggestion, AppState } from '../source/ai/_types'
