import type { PluginCreator } from 'tailwindcss/types/config'

/**
 * 生成 center-container 的类名
 * center-container 表示：居中容器，包含响应式内边距和最大宽度
 *
 * 基于原始 CenterContainer 组件的样式逻辑：
 * - 基础样式：mx-auto box-content
 * - 响应式内边距：px-3 (默认) -> px-4 (375.1px+) -> px-6 (768.1px+)
 * - 响应式最大宽度：calc(100vw-24px) (默认) -> 736px (375.1px+) -> 1200px (768.1px+)
 */
const centerContainerPlugin: PluginCreator = function ({ addUtilities }) {
  const newUtilities: Record<string, any> = {}

  // center-container 基础类名
  newUtilities['.center-container'] = {
    // 基础样式：居中对齐，内容盒模型
    'margin-left': 'auto',
    'margin-right': 'auto',
    'box-sizing': 'content-box',

    // 默认样式 (375px 以下)
    'padding-left': '12px', // px-3
    'padding-right': '12px', // px-3
    'max-width': 'calc(100vw - 24px)',

    // 375.1px 以上
    '@media (min-width: 375.1px)': {
      'padding-left': '16px', // px-4
      'padding-right': '16px', // px-4
      'max-width': '736px',
    },

    // 768.1px 以上
    '@media (min-width: 768.1px)': {
      'padding-left': '24px', // px-6
      'padding-right': '24px', // px-6
      'max-width': '1200px',
    },
  }

  // 可选的变体
  newUtilities['.center-container-sm'] = {
    'margin-left': 'auto',
    'margin-right': 'auto',
    'box-sizing': 'content-box',
    'padding-left': '16px',
    'padding-right': '16px',
    'max-width': '640px',
  }

  newUtilities['.center-container-md'] = {
    'margin-left': 'auto',
    'margin-right': 'auto',
    'box-sizing': 'content-box',
    'padding-left': '24px',
    'padding-right': '24px',
    'max-width': '768px',
  }

  newUtilities['.center-container-lg'] = {
    'margin-left': 'auto',
    'margin-right': 'auto',
    'box-sizing': 'content-box',
    'padding-left': '32px',
    'padding-right': '32px',
    'max-width': '1024px',
  }

  newUtilities['.center-container-xl'] = {
    'margin-left': 'auto',
    'margin-right': 'auto',
    'box-sizing': 'content-box',
    'padding-left': '40px',
    'padding-right': '40px',
    'max-width': '1200px',
  }

  addUtilities(newUtilities)
}

export default centerContainerPlugin
