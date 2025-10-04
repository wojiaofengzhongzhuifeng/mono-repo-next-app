import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark' | 'auto'

export function useTheme(initialTheme: Theme = 'auto') {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    // 从 localStorage 读取保存的主题
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // 应用主题到 document
    const root = document.documentElement
    
    if (theme === 'auto') {
      // 检测系统主题偏好
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const applySystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
        root.classList.toggle('dark', e.matches)
      }
      
      applySystemTheme(mediaQuery)
      mediaQuery.addEventListener('change', applySystemTheme)
      
      return () => {
        mediaQuery.removeEventListener('change', applySystemTheme)
      }
    } else {
      root.classList.toggle('dark', theme === 'dark')
    }

    // 保存到 localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'auto'
      return 'light'
    })
  }

  const setLightTheme = () => setTheme('light')
  const setDarkTheme = () => setTheme('dark')
  const setAutoTheme = () => setTheme('auto')

  return {
    theme,
    setTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setAutoTheme,
    isDark: theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches),
    isLight: theme === 'light' || (theme === 'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches)
  }
}
