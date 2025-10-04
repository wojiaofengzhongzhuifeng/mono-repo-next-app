// 导出 Header 组件和相关类型
export { Header, defaultHeaderConfig } from './Header'
export type { HeaderProps, HeaderConfig } from './Header'

// 导出 Footer 组件和相关类型
export { Footer, defaultFooterConfig, footerPresets } from './Footer'
export type { FooterProps, FooterConfig, FooterSection, SocialLink } from './Footer'

// 导出共享类型
export type { NavigationItem } from './Header'

// 重新导入以供 LayoutComponents 使用
import { Header, defaultHeaderConfig } from './Header'
import { Footer, defaultFooterConfig, footerPresets } from './Footer'
import type { HeaderConfig } from './Header'
import type { FooterConfig } from './Footer'

// 导出布局组件组合
export const LayoutComponents = {
  Header,
  Footer,
  defaultHeaderConfig,
  defaultFooterConfig,
  footerPresets
}

// 便捷的布局组合函数
export interface LayoutConfig {
  header?: HeaderConfig
  footer?: FooterConfig
  showHeader?: boolean
  showFooter?: boolean
}

export const createLayoutConfig = (config: LayoutConfig = {}) => {
  return {
    header: {
      ...defaultHeaderConfig,
      ...config.header
    },
    footer: {
      ...defaultFooterConfig,
      ...config.footer
    },
    showHeader: config.showHeader ?? true,
    showFooter: config.showFooter ?? true
  }
}
