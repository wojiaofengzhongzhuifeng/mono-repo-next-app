# Shadcn/ui 组件导入指南

本文档说明在 monorepo 项目中导入和使用 shadcn/ui 组件的步骤。

## 前提条件

确保项目已经正确配置了 shadcn/ui 和 Tailwind CSS：

- ✅ 已安装 Tailwind CSS 和相关依赖
- ✅ 已安装 shadcn/ui 核心依赖
- ✅ 已配置 `components.json` 文件
- ✅ 已配置 `tailwind.config.ts` 文件
- ✅ 已创建 `src/lib/utils.ts` 工具函数
- ✅ 已在 `_app.tsx` 中导入全局 CSS

## 导入组件步骤

### 1. 添加组件依赖

#### 安装 Radix UI 依赖（在 workspace 根目录）

```bash
# 在 monorepo 根目录安装依赖
pnpm add -w @radix-ui/react-slot
```

#### 添加 shadcn/ui 组件（在具体应用目录）

```bash
# 进入具体的应用目录
cd apps/home
# 或者
cd apps/about-us  
# 或者
cd apps/ai

# 使用 pnpm 添加 shadcn/ui 组件
pnpm dlx shadcn@latest add button
```

**说明：**
- 使用 `pnpm dlx` 替代 `npx` 来保持包管理器一致性
- 需要在具体的应用目录中运行，而不是在 monorepo 根目录
- 每个应用需要单独添加所需的组件

### 2. 检查组件文件

组件会被自动安装到 `src/components/ui/` 目录下：

```
src/
├── components/
│   └── ui/
│       └── button.tsx
└── lib/
    └── utils.ts
```

### 3. 在组件中导入

使用 `@` 路径别名导入组件：

```tsx
import { Button } from "@/components/ui/button"

function MyComponent() {
  return (
    <Button>
      Click me
    </Button>
  )
}
```

### 4. 使用组件

shadcn/ui 组件支持多种变体和属性：

```tsx
import { Button } from "@/components/ui/button"

function Example() {
  return (
    <div className="space-x-4">
      {/* 默认按钮 */}
      <Button>Default</Button>
      
      {/* 不同变体 */}
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      
      {/* 不同尺寸 */}
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🎨</Button>
      
      {/* 禁用状态 */}
      <Button disabled>Disabled</Button>
      
      {/* 带点击事件 */}
      <Button onClick={() => console.log('clicked')}>
        Click Handler
      </Button>
    </div>
  )
}
```

## 常用组件列表

### 基础组件
- `Button` - 按钮组件
- `Input` - 输入框组件
- `Card` - 卡片组件
- `Badge` - 徽章组件

### 表单组件
- `Form` - 表单组件
- `Label` - 标签组件
- `Select` - 选择器组件
- `Checkbox` - 复选框组件
- `RadioGroup` - 单选框组

### 布局组件
- `Dialog` - 对话框组件
- `Sheet` - 侧边栏组件
- `Toast` - 提示组件
- `Alert` - 警告组件

## 故障排除

### 1. 组件未找到错误

确保：
- 组件已正确安装到 `src/components/ui/` 目录
- 使用正确的导入路径 `@/components/ui/组件名`
- 重新启动开发服务器

### 2. 样式不生效

确保：
- 在 `_app.tsx` 中导入了全局 CSS：`import '../styles/globals.css'`
- Tailwind CSS 配置正确
- CSS 变量已正确定义

### 3. TypeScript 错误

确保：
- `tsconfig.json` 中的路径映射正确：
  ```json
  "paths": {
    "@/*": ["./src/*"]
  }
  ```
- 组件文件正确导出

## 示例项目

查看 `apps/count-number/src/source/_components/number-action/index.tsx` 获取完整的使用示例。

## 相关资源

- [shadcn/ui 官方文档](https://ui.shadcn.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Next.js 路径别名文档](https://nextjs.org/docs/advanced-features/compiler#path-alias)