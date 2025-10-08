## 阅读区域参考代码

/\*\*

- 生成 center-container 的类名
- center-container
- 表示：居中容器，包含响应式内边距和最大宽度
-
- 基于原始 CenterContainer 组件的样式逻辑：
- - 基础样式：mx-auto box-content
- - 响应式内边距：px-3 (默认) -> px-4 (375.1px+) -> px-6 (768.1px+)
- - 响应式最大宽度：calc(100vw-24px) (默认) -> 736px (375.1px+) -> 1200px (768.1px+)
    \*/

module.exports = function ({ addUtilities }) {
const newUtilities = {}

// center-container 基础类名
newUtilities['.center-container'] = {
// 基础样式：居中对齐，内容盒模型
'margin-left': 'auto',
'margin-right': 'auto',
'box-sizing': 'content-box',

    // 默认样式 (375px 以下)
    'padding-left': '12px',  // px-3
    'padding-right': '12px', // px-3
    'max-width': 'calc(100vw - 24px)',

    // 375.1px 以上
    '@media (min-width: 375.1px)': {
      'padding-left': '16px',   // px-4
      'padding-right': '16px',  // px-4
      'max-width': '736px',
    },

    // 768.1px 以上
    '@media (min-width: 768.1px)': {
      'padding-left': '24px',   // px-6
      'padding-right': '24px',  // px-6
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

## 间距

const plugin = require('tailwindcss/plugin')
/\*\*

- 生成 { n:'2npx' }的样式，从 0 到 99
- p-0, p-1, ... p-99
- 表示：padding: 0px, padding: 2px, ... padding: 198px
  _/
  const generateSpacing = () => {
  return Array(100)
  .fill(0)
  .reduce((acc, \_, index) => {
  acc[index] = index _ 2 + 'px'
  return acc
  }, {})
  }

module.exports = plugin(() => {}, {
theme: {
spacing: {
px: '1px',
...generateSpacing(),
},
},
})

## 字体大小

const plugin = require('tailwindcss/plugin')
const fontSize = require('../postcss/font-size.json')

/\*\*

- 生成 font-\* 的样式，从 12px 到 80px
- font-12, font-13, ... font-80
- 表示：font-size: 12px, font-size: 13px, ... font-size: 80px
- @returns {Object}
  \*/
  const generateFontSize = () => {
  return Array(69)
  .fill(0)
  .reduce((acc, \_, index) => {
  acc[index + 12] = index + 12 + 'px'
  return acc
  }, {})
  }

/\*\*

- 生成 font-\* 的样式，从 12px 到 80px
- font-12/12, font-12/14, ... font-80/80
- 表示：{font-size: 12px; line-height: 12px;}
-       {font-size: 12px; line-height: 14px;}
-       ...
-       {font-size: 80px; line-height: 80px;}
- @returns {Object}
  \*/
  const generateFontSizeAndLineHeight = () => {
  // 12px 到 80px 的偶数
  const sizes = Array(80 - 10)
  .fill(0)
  .map((\_, index) => index + 12)
  .filter(item => item % 2 === 0)
  const values = {}

for (let size of sizes) {
for (let lh = size; lh <= 80; lh += 2) {
values[`${size}/${lh}`] = `${size}/${lh}`
}
}

return values
}

module.exports = plugin(
({ matchUtilities }) => {
// 支持 text-12/12 这种格式
// 表示 font-size: 12px, line-height: 12px
matchUtilities(
{
text: value => {
const [fontSize, lineHeight] = value.split('/')
if (!fontSize || !lineHeight) return undefined
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
},
{
theme: {
extend: {
fontSize: {
...fontSize,
...generateFontSize(),
},
},
},
}
)

## section block （内容区块）

/\*\*

- 生成 section-block 相关的类名，与 spacing-plugin 保持一致的 2 倍规则
-
- 基于 spacing-plugin 的设计：
- - 数字 n 表示 n\*2px 的间距
- - 例如：section-block-45 表示 90px 上下间距 (45\*2=90)
- - 例如：section-block-20 表示 40px 上下间距 (20\*2=40)
-
- 使用方式：
- - section-block: 默认间距 (90px桌面端, 40px移动端)
- - section-block-{n}: 指定桌面端间距为 n\*2px (移动端自动适配为一半)
- - section-block-{n}-{h5n}: 分别指定桌面端 n*2px 和移动端 h5n*2px
- - section-block-{topN}-{bottomN}: 不对称间距 (上下不同)
    \*/

module.exports = function ({ addUtilities, matchUtilities }) {
const newUtilities = {}

// 常用的间距值 (数字，实际像素为 n\*2)
const commonGaps = [10, 12, 16, 20, 24, 26, 30, 40, 45, 50, 60, 80, 90]

// 1. 生成默认的 section-block 类名 (45*2=90px桌面端, 20*2=40px移动端)
newUtilities['.section-block'] = {
'padding-top': '90px',
'padding-bottom': '90px',
'@media (max-width: 992px)': {
'padding-top': '24px',
'padding-bottom': '24px',
}
}

// 2. 生成常用的对称间距类名 section-block-{n}
// 桌面端和移动端都使用 n*2px，保持一致
commonGaps.forEach(gap => {
const px = gap * 2 // n\*2px，桌面端和移动端保持一致

    newUtilities[`.section-block-${gap}`] = {
      'padding-top': `${px}px`,
      'padding-bottom': `${px}px`,
      '@media (max-width: 992px)': {
        'padding-top': `${px}px`,
        'padding-bottom': `${px}px`,
      }
    }

})

// 3. 生成指定桌面端和移动端间距的类名 section-block-{n}-{h5n}
const mobileGaps = [8, 10, 12, 16, 20, 24, 30]
commonGaps.forEach(gap => {
mobileGaps.forEach(h5gap => {
const desktopPx = gap * 2 // n*2px
const mobilePx = h5gap * 2 // h5n*2px

      newUtilities[`.section-block-${gap}-${h5gap}`] = {
        'padding-top': `${desktopPx}px`,
        'padding-bottom': `${desktopPx}px`,
        '@media (max-width: 992px)': {
          'padding-top': `${mobilePx}px`,
          'padding-bottom': `${mobilePx}px`,
        }
      }
    })

})

// 4. 生成不对称间距类名 section-block-{topN}-{bottomN}
commonGaps.forEach(topGap => {
commonGaps.forEach(bottomGap => {
if (topGap !== bottomGap) { // 只生成不对称的
const topPx = topGap _ 2
const bottomPx = bottomGap _ 2

        newUtilities[`.section-block-${topGap}-${bottomGap}`] = {
          'padding-top': `${topPx}px`,
          'padding-bottom': `${bottomPx}px`,
          '@media (max-width: 992px)': {
            'padding-top': `${topPx}px`,
            'padding-bottom': `${bottomPx}px`,
          }
        }
      }
    })

})

// 5. 生成只有顶部或底部间距的类名
newUtilities['.section-block-top-0'] = {
'padding-top': '0px',
}

newUtilities['.section-block-bottom-0'] = {
'padding-bottom': '0px',
}

commonGaps.forEach(gap => {
const px = gap \* 2 // 桌面端和移动端保持一致

    // 只有顶部间距
    newUtilities[`.section-block-top-${gap}`] = {
      'padding-top': `${px}px`,
      '@media (max-width: 992px)': {
        'padding-top': `${px}px`,
      }
    }

    // 只有底部间距
    newUtilities[`.section-block-bottom-${gap}`] = {
      'padding-bottom': `${px}px`,
      '@media (max-width: 992px)': {
        'padding-bottom': `${px}px`,
      }
    }

})

// 6. 使用 matchUtilities 支持任意值
matchUtilities(
{
'section-block': (value) => {
const parts = value.split('-')

        if (parts.length === 1) {
          // section-block-[45] - 对称间距 (45*2=90px)，桌面端和移动端保持一致
          const gap = parseInt(parts[0])
          const px = gap * 2
          return {
            'padding-top': `${px}px`,
            'padding-bottom': `${px}px`,
            '@media (max-width: 992px)': {
              'padding-top': `${px}px`,
              'padding-bottom': `${px}px`,
            }
          }
        } else if (parts.length === 2) {
          // section-block-[45-20] - 桌面端n-移动端h5n
          // 或 section-block-[45-30] - 顶部n-底部n
          // 或 section-block-[14px-16px] - 直接使用像素值

          const firstStr = parts[0]
          const secondStr = parts[1]

          // 检查是否包含 px 单位
          const firstHasPx = firstStr.includes('px')
          const secondHasPx = secondStr.includes('px')

          if (firstHasPx || secondHasPx) {
            // 如果包含 px 单位，直接使用像素值，不应用 2 倍规则
            const firstValue = firstHasPx ? parseInt(firstStr.replace('px', '')) : parseInt(firstStr) * 2
            const secondValue = secondHasPx ? parseInt(secondStr.replace('px', '')) : parseInt(secondStr) * 2

            if (!isNaN(firstValue) && !isNaN(secondValue)) {
              return {
                'padding-top': `${firstValue}px`,
                'padding-bottom': `${secondValue}px`,
                '@media (max-width: 992px)': {
                  'padding-top': `${firstValue}px`,
                  'padding-bottom': `${secondValue}px`,
                }
              }
            }
          } else {
            // 数字格式，应用 2 倍规则
            const [first, second] = parts.map(p => parseInt(p))

            // 判断是桌面端-移动端还是顶部-底部
            // 如果第二个值较小，认为是移动端间距
            if (second < first * 0.8) {
              const desktopPx = first * 2
              const mobilePx = second * 2
              return {
                'padding-top': `${desktopPx}px`,
                'padding-bottom': `${desktopPx}px`,
                '@media (max-width: 992px)': {
                  'padding-top': `${mobilePx}px`,
                  'padding-bottom': `${mobilePx}px`,
                }
              }
            } else {
              // 不对称间距，桌面端和移动端保持一致
              const topPx = first * 2
              const bottomPx = second * 2
              return {
                'padding-top': `${topPx}px`,
                'padding-bottom': `${bottomPx}px`,
                '@media (max-width: 992px)': {
                  'padding-top': `${topPx}px`,
                  'padding-bottom': `${bottomPx}px`,
                }
              }
            }
          }
        }

        return {}
      },
    },
    {
      values: {
        // 提供一些示例值 (数字表示 n*2px)
        'default': '45',    // 45*2=90px
        'sm': '20',         // 20*2=40px
        'md': '30',         // 30*2=60px
        'lg': '45',         // 45*2=90px
        'xl': '60',         // 60*2=120px
        'asymmetric': '45-30',  // 90px-60px
        'custom': '45-20',      // 90px-40px
      },
      type: 'any',
    }

)

addUtilities(newUtilities)
}
