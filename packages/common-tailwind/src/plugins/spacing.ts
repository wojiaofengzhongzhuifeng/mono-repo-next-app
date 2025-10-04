import type { PluginCreator } from 'tailwindcss/types/config'

/**
 * 生成 { n:'2npx' }的样式，从 0 到 99
 * p-0, p-1, ... p-99
 * 表示：padding: 0px, padding: 2px, ... padding: 198px
 */
const generateSpacing = () => {
  return Array(100)
    .fill(0)
    .reduce((acc: Record<string, string>, _, index) => {
      acc[index] = index * 2 + 'px'
      return acc
    }, {})
}

/**
 * 间距插件 - 基于 2 倍规则的间距系统
 * 数字 n 表示 n*2px 的间距
 * 例如：spacing-45 表示 90px (45*2=90)
 */
const spacingPlugin: PluginCreator = function () {
  // 这个插件主要通过 theme 配置来工作
  return {}
}

export default spacingPlugin

// 导出 spacing 配置，用于在 tailwind.config.js 中使用
export const spacingConfig = {
  spacing: {
    px: '1px',
    ...generateSpacing(),
  },
}

// 导出生成函数，供其他插件使用
export { generateSpacing }
