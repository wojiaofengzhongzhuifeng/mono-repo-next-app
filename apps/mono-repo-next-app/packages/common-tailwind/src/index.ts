// 导出所有插件
import centerContainerPlugin from './plugins/centerContainer'
import spacingPlugin from './plugins/spacing'
import fontSizePlugin from './plugins/fontSize'
import sectionBlockPlugin from './plugins/sectionBlock'

// 导出配置
import { spacingConfig } from './plugins/spacing'
import { fontSizeConfig } from './plugins/fontSize'
import { sectionBlockConfig } from './plugins/sectionBlock'

// 导出工具函数
import { generateSpacing } from './plugins/spacing'
import {
  generateFontSize,
  generateFontSizeAndLineHeight,
} from './plugins/fontSize'

// 单独导出插件
export {
  centerContainerPlugin,
  spacingPlugin,
  fontSizePlugin,
  sectionBlockPlugin,
}

// 导出配置
export { spacingConfig, fontSizeConfig, sectionBlockConfig }

// 导出工具函数
export { generateSpacing, generateFontSize, generateFontSizeAndLineHeight }

// 默认导出包含所有插件的数组
export const plugins = [
  centerContainerPlugin,
  spacingPlugin,
  fontSizePlugin,
  sectionBlockPlugin,
]

// 默认导出配置对象
export const configs = {
  spacing: spacingConfig,
  fontSize: fontSizeConfig,
}

// 便捷的完整配置导出
export const completeConfig = {
  plugins,
  theme: {
    extend: {
      spacing: spacingConfig.spacing,
      fontSize: fontSizeConfig.theme.extend.fontSize,
    },
  },
}

// 默认导出
export default {
  plugins,
  configs,
  completeConfig,
}
