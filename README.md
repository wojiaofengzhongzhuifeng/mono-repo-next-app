# Next.js Monorepo Template

一个现代化的 Next.js monorepo 模板，采用独立应用架构，每个页面都是独立的应用。

## 🏗️ 项目架构

```
mono-repo-next-template/
├── apps/                      # 应用目录
│   ├── home/                  # Home 应用 (端口 3000)
│   │   ├── src/
│   │   │   ├── assets/        # 静态资源
│   │   │   ├── components/    # 组件
│   │   │   ├── hooks/         # React Hooks
│   │   │   ├── middleware/    # 中间件
│   │   │   ├── pages/         # 页面 (Pages Router)
│   │   │   ├── source/        # 源代码
│   │   │   ├── store/         # 状态管理
│   │   │   ├── styles/        # 样式文件
│   │   │   ├── types/         # TypeScript 类型
│   │   │   └── utils/         # 工具函数
│   │   ├── public/            # 公共资源
│   │   └── 配置文件...
│   └── about-us/              # About Us 应用 (端口 3001)
│       └── (与 home 相同的结构)
├── packages/                  # 共享包
│   └── ui/                    # 公共 UI 组件包
│       ├── src/
│       │   ├── components/    # 共享组件
│       │   ├── hooks/         # 共享 Hooks
│       │   ├── types/         # 共享类型
│       │   └── utils/         # 共享工具
├── turbo.json                 # Turborepo 配置
├── pnpm-workspace.yaml       # pnpm workspace 配置
└── package.json              # 根包配置
```

## ✨ 功能特性

- **🚀 现代化技术栈**: Next.js 14, TypeScript, Tailwind CSS
- **📦 Monorepo 管理**: Turborepo + pnpm workspaces
- **🏢 独立应用架构**: 每个页面都是独立的应用，便于维护和部署
- **🎨 原子化 CSS**: Tailwind CSS 提供高效的样式管理
- **🔧 完整工具链**: ESLint, Prettier, Stylelint, Husky
- **📊 状态管理**: Zustand 轻量级状态管理
- **🌐 HTTP 客户端**: Axios 配置完整
- **🔗 共享组件**: 可复用的 UI 组件包

## 🚀 快速开始

### 环境要求

- Node.js 18 或更高版本
- pnpm 包管理器

### 安装依赖

```bash
pnpm install
```

### 开发环境

#### 启动单个应用

```bash
# 启动 Home 应用 (端口 3000)
pnpm dev:home

# 启动 About Us 应用 (端口 3001)
pnpm dev:about-us
```

#### 同时启动所有应用

```bash
# 同时启动所有应用
pnpm dev:all
```

### 构建项目

```bash
# 构建所有应用
pnpm build

# 构建 UI 组件包
pnpm build:ui
```

### 代码检查和格式化

```bash
# 运行代码检查
pnpm lint

# 格式化代码
pnpm format

# 清理构建文件
pnpm clean
```

## 📱 应用列表

### 1. Home 应用 (`apps/home`)
- **端口**: 3000
- **访问**: http://localhost:3000
- **功能**: 
  - 欢迎页面
  - 计数器演示
  - 技术栈展示
  - 响应式设计

### 2. About Us 应用 (`apps/about-us`)
- **端口**: 3001
- **访问**: http://localhost:3001
- **功能**:
  - 公司介绍
  - 使命和价值观
  - 技术栈展示
  - 联系信息

## 🔧 开发工具

### 代码质量
- **ESLint**: JavaScript/TypeScript 代码检查
- **Prettier**: 代码格式化
- **Stylelint**: CSS 样式检查
- **Husky**: Git hooks
- **lint-staged**: 暂存文件检查

### 构建工具
- **Turborepo**: 高效的 monorepo 构建工具
- **Next.js**: React 框架
- **TypeScript**: 类型安全
- **Tailwind CSS**: 原子化 CSS

### 状态管理
- **Zustand**: 轻量级状态管理库
- **React Hooks**: 内置状态管理

## 📦 共享包

### @mono-repo/ui (`packages/ui`)
公共 UI 组件包，包含：
- **Header**: 响应式头部组件
- **Footer**: 页脚组件
- **Hooks**: 通用 React Hooks
- **Utils**: 工具函数
- **Types**: TypeScript 类型定义

#### 使用共享组件

```tsx
import { Header, Footer } from '@mono-repo/ui'

function MyPage() {
  return (
    <div>
      <Header appName="My App" />
      <main>
        {/* 页面内容 */}
      </main>
      <Footer companyName="My Company" />
    </div>
  )
}
```

## ⚙️ 配置文件

每个应用都有独立的配置文件：
- `package.json`: 应用依赖和脚本
- `next.config.js`: Next.js 配置
- `tsconfig.json`: TypeScript 配置
- `tailwind.config.ts`: Tailwind CSS 配置
- `postcss.config.js`: PostCSS 配置
- `.eslintrc.json`: ESLint 配置
- `.prettierrc`: Prettier 配置
- `.stylelintrc.json`: Stylelint 配置

## 🔄 工作流

### 开发新功能

1. 在对应应用的 `src/pages/` 目录创建页面
2. 在 `src/components/` 目录创建组件
3. 使用 `src/store/` 进行状态管理
4. 在 `src/utils/` 添加工具函数
5. 运行 `pnpm lint` 检查代码
6. 运行 `pnpm format` 格式化代码

### 添加共享组件

1. 在 `packages/ui/src/components/` 创建组件
2. 在 `packages/ui/src/index.ts` 导出组件
3. 运行 `pnpm build:ui` 构建包
4. 在应用中导入使用

## 🐛 故障排除

### 端口占用
如果端口被占用，可以修改 `package.json` 中的端口号：

```json
{
  "scripts": {
    "dev": "next dev -p 3002"
  }
}
```

### 依赖问题
如果遇到依赖问题，尝试：

```bash
# 清理 node_modules
pnpm clean

# 重新安装依赖
pnpm install
```

### Husky 配置
如果 Git hooks 不工作，手动安装：

```bash
# 在应用目录下
npx husky install
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！