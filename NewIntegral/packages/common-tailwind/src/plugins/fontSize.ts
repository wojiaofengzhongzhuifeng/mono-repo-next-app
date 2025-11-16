import type { PluginCreator } from 'tailwindcss/types/config'

/**
 * 生成 font-* 的样式，从 12px 到 80px
 * font-12, font-13, ... font-80
 * 表示：font-size: 12px, font-size: 13px, ... font-size: 80px
 * @returns {Object}
 */
const generateFontSize = () => {
  return Array(69)
    .fill(0)
    .reduce((acc: Record<string, string>, _, index) => {
      acc[index + 12] = index + 12 + 'px'
      return acc
    }, {})
}

/**
 * 生成 font-* 的样式，从 12px 到 80px
 * font-12/12, font-12/14, ... font-80/80
 * 表示：{font-size: 12px; line-height: 12px;}
 *       {font-size: 12px; line-height: 14px;}
 *       ...
 *       {font-size: 80px; line-height: 80px;}
 * @returns {Object}
 */
const generateFontSizeAndLineHeight = () => {
  // 12px 到 80px 的偶数
  const sizes = Array(80 - 10)
    .fill(0)
    .map((_, index) => index + 12)
    .filter(item => item % 2 === 0)
  const values: Record<string, string> = {}

  for (let size of sizes) {
    for (let lh = size; lh <= 80; lh += 2) {
      values[`${size}/${lh}`] = `${size}/${lh}`
    }
  }

  return values
}

/**
 * 字体大小插件 - 支持 12px 到 80px 的字体大小和行高
 */
const fontSizePlugin: PluginCreator = function ({ matchUtilities }) {
  // 支持 text-12/12 这种格式
  // 表示 font-size: 12px, line-height: 12px
  matchUtilities(
    {
      text: (value: string) => {
        const [fontSize, lineHeight] = value.split('/')
        if (!fontSize || !lineHeight) return null
        return {
          'font-size': `${fontSize}px`,
          'line-height': `${lineHeight}px`,
        }
      },
    },
    {
      values: generateFontSizeAndLineHeight(),
      type: 'any',
    }
  )
}

export default fontSizePlugin

// 导出字体大小配置，用于在 tailwind.config.js 中使用
export const fontSizeConfig = {
  theme: {
    extend: {
      fontSize: {
        ...generateFontSize(),
      },
    },
  },
}

// 导出生成函数，供其他插件使用
export { generateFontSize, generateFontSizeAndLineHeight }
