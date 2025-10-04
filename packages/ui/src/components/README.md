# 通用 Header 和 Footer 组件

这是一个高度可配置的通用 Header 和 Footer 组件库，专为 monorepo 项目设计。

## 组件特性

### Header 组件
- ✅ **智能导航**：自动识别当前页面并高亮对应导航项
- ✅ **多种布局**：支持 default、minimal、centered 三种布局
- ✅ **主题切换**：支持 light、dark、auto 主题
- ✅ **用户区域**：可配置欢迎信息和操作按钮
- ✅ **响应式设计**：完美适配移动端和桌面端
- ✅ **粘性定位**：可选的 sticky 定位

### Footer 组件
- ✅ **灵活布局**：支持 1-4 列的自定义布局
- ✅ **多种变体**：default、minimal、compact 三种样式
- ✅ **内容区块**：支持文本、链接、自定义内容
- ✅ **社交媒体**：内置社交媒体链接支持
- ✅ **版权信息**：自动生成版权信息
- ✅ **主题适配**：与 Header 组件主题保持一致

## 快速开始

### 基础用法

```tsx
import { Header, Footer } from '@mono-repo/ui'

// 使用默认配置
export default function Layout() {
  return (
    <div>
      <Header appName="My App" />
      <main>页面内容</main>
      <Footer companyName="My App" />
    </div>
  )
}
```

### 自定义配置

```tsx
import { Header, Footer, NavigationItem } from '@mono-repo/ui'

const navigation: NavigationItem[] = [
  { name: '首页', href: '/' },
  { name: '产品', href: '/products' },
  { name: '关于我们', href: '/about' },
  { name: '博客', href: '/blog', external: true }
]

export default function CustomLayout() {
  return (
    <div>
      <Header
        appName="我的应用"
        tagline="构建现代化的 Web 应用"
        navigation={navigation}
        userArea={{
          showWelcome: true,
          welcomeText: "欢迎来到我的应用",
          actions: [
            {
              label: "登录",
              onClick: () => console.log("登录"),
              variant: "primary"
            },
            {
              label: "注册",
              onClick: () => console.log("注册"),
              variant: "secondary"
            }
          ]
        }}
        theme="light"
        variant="default"
        sticky={true}
      />
      
      <main>页面内容</main>
      
      <Footer
        companyName="我的应用"
        sections={[
          {
            title: "关于我们",
            content: "我们致力于提供最优质的产品和服务"
          },
          {
            title: "快速链接",
            links: navigation
          },
          {
            title: "联系方式",
            content: "邮箱: contact@example.com\n电话: +86 123-4567-8900"
          }
        ]}
        socialLinks={[
          { name: "Twitter", href: "https://twitter.com", external: true },
          { name: "GitHub", href: "https://github.com", external: true }
        ]}
        theme="dark"
        variant="default"
        columns={3}
      />
    </div>
  )
}
```

## 配置选项

### Header 配置

```tsx
interface HeaderConfig {
  // 基础信息
  appName?: string          // 应用名称
  logo?: React.ReactNode    // 自定义 Logo
  tagline?: string          // 标语/口号
  
  // 导航配置
  navigation?: NavigationItem[]  // 导航项列表
  
  // 用户区域
  userArea?: {
    showWelcome?: boolean
    welcomeText?: string
    actions?: Array<{
      label: string
      onClick: () => void
      variant?: 'primary' | 'secondary' | 'ghost'
    }>
  }
  
  // 样式配置
  theme?: 'light' | 'dark' | 'auto'
  variant?: 'default' | 'minimal' | 'centered'
  
  // 行为配置
  sticky?: boolean
  showBorder?: boolean
}
```

### Footer 配置

```tsx
interface FooterConfig {
  // 基础信息
  companyName?: string
  copyrightText?: string
  logo?: React.ReactNode
  
  // 主要内容区块
  sections?: FooterSection[]
  
  // 底部信息
  bottomInfo?: {
    showCopyright?: boolean
    copyrightYear?: number
    additionalText?: string
    showSocialLinks?: boolean
  }
  
  // 社交媒体
  socialLinks?: SocialLink[]
  
  // 样式配置
  theme?: 'light' | 'dark' | 'auto'
  variant?: 'default' | 'minimal' | 'compact'
  
  // 布局配置
  columns?: number
  showTopBorder?: boolean
}
```

## 预设配置

### Footer 预设

```tsx
import { Footer, footerPresets } from '@mono-repo/ui'

// 企业网站预设
<Footer {...footerPresets.corporate} />

// 个人博客预设
<Footer {...footerPresets.blog} />

// 最简预设
<Footer {...footerPresets.minimal} />
```

## 布局组合工具

```tsx
import { createLayoutConfig } from '@mono-repo/ui'

// 创建统一的布局配置
const layoutConfig = createLayoutConfig({
  header: {
    appName: "我的应用",
    theme: "light",
    sticky: true
  },
  footer: {
    companyName: "我的应用",
    theme: "dark"
  },
  showHeader: true,
  showFooter: true
})

// 在组件中使用
<Header {...layoutConfig.header} />
<Footer {...layoutConfig.footer} />
```

## 在不同项目中的使用示例

### 企业官网

```tsx
// apps/corporate/src/components/Layout.tsx
import { Header, Footer, footerPresets } from '@mono-repo/ui'

export function CorporateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        appName="科技公司"
        tagline="创新引领未来"
        navigation={[
          { name: '首页', href: '/' },
          { name: '产品', href: '/products' },
          { name: '解决方案', href: '/solutions' },
          { name: '关于我们', href: '/about' },
          { name: '联系我们', href: '/contact' }
        ]}
        userArea={{
          showWelcome: false,
          actions: [
            { label: '免费试用', onClick: () => {}, variant: 'primary' }
          ]
        }}
        sticky={true}
      />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer {...footerPresets.corporate} />
    </div>
  )
}
```

### 个人博客

```tsx
// apps/blog/src/components/Layout.tsx
import { Header, Footer, footerPresets } from '@mono-repo/ui'

export function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        appName="我的博客"
        tagline="记录技术生活"
        variant="centered"
        navigation={[
          { name: '首页', href: '/' },
          { name: '文章', href: '/posts' },
          { name: '关于', href: '/about' }
        ]}
        userArea={{
          showWelcome: true,
          welcomeText: "欢迎来到我的博客"
        }}
      />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
      
      <Footer {...footerPresets.blog} />
    </div>
  )
}
```

### 管理后台

```tsx
// apps/admin/src/components/Layout.tsx
import { Header } from '@mono-repo/ui'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        appName="管理后台"
        variant="minimal"
        userArea={{
          showWelcome: true,
          welcomeText: "管理员",
          actions: [
            { label: '退出', onClick: () => {}, variant: 'ghost' }
          ]
        }}
        theme="light"
      />
      
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}
```

## 样式定制

组件使用 Tailwind CSS，可以通过以下方式自定义样式：

1. **修改主题配置**：在 `tailwind.config.js` 中扩展颜色和样式
2. **覆盖 CSS 类**：通过 `className` prop 添加自定义样式
3. **使用 CSS 变量**：通过 CSS 变量动态调整主题

## 最佳实践

1. **配置集中管理**：将布局配置放在单独的文件中
2. **主题一致性**：确保 Header 和 Footer 使用协调的主题
3. **响应式优先**：在移动端优先测试布局效果
4. **性能优化**：使用 React.memo 包装布局组件
5. **可访问性**：确保导航和链接符合无障碍标准

## 类型安全

所有组件都提供完整的 TypeScript 类型定义，确保开发时的类型安全和智能提示。
