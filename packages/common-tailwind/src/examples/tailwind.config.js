// Tailwind CSS 配置示例
// 展示如何使用 common-tailwind 包中的插件

import { plugins, configs } from '@mono-repo/common-tailwind'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 合并 spacing 和 fontSize 配置
      ...configs.spacing.theme,
      ...configs.fontSize.theme,
      
      // 可以继续添加其他主题配置
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [
    // 添加所有插件
    ...plugins,
    
    // 或者单独添加插件
    // require('@mono-repo/common-tailwind').centerContainerPlugin,
    // require('@mono-repo/common-tailwind').spacingPlugin,
    // require('@mono-repo/common-tailwind').fontSizePlugin,
    // require('@mono-repo/common-tailwind').sectionBlockPlugin,
    
    // 可以继续添加其他插件
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}
