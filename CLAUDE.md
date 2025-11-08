# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导说明。

## 项目结构

这是一个使用 pnpm workspaces 和 Turbo 进行构建编排的 monorepo 项目。代码库包含：

- **apps/**: Next.js 应用程序 (ai-headshot-generator, count-number, mbti, shop, template)
- **packages/**: 共享包 (common-tailwind, test-utils, ui, utils)
- **Root**: 包含 monorepo 配置和共享依赖

## 开发命令

### 构建和开发

- `pnpm dev` - 通过 Turbo 在开发模式下启动所有应用
- `pnpm build` - 构建所有包和应用
- `pnpm build:ui` - 仅构建 UI 包
- `pnpm dev:count-number` - 启动特定应用（将 'count-number' 替换为应用名称）
- `pnpm dev:all` - 同时启动所有应用

### 代码质量

- `pnpm lint` - 在所有包中运行代码检查
- `pnpm format` - 在所有包中使用 Prettier 格式化代码
- `pnpm clean` - 清理构建产物和 node_modules
- `pnpm test` - 在所有包中运行测试

### 单独应用开发

导航到特定应用目录并运行：

- `pnpm dev` - 启动开发服务器（端口因应用而异）
- `pnpm build` - 构建应用
- `pnpm lint` - 检查应用代码
- `pnpm format` - 格式化应用代码

## 架构说明

### Monorepo 配置

- 使用 **pnpm workspaces** 进行包管理
- 使用 **Turbo** 进行构建编排和缓存
- 共享包使用 `workspace:*` 协议进行内部依赖
- 所有应用运行在不同端口上（例如：count-number admin 后端在 3011）

### 关键技术

- **Next.js 14.2.5** 用于应用程序
- 全面使用 **TypeScript**
- **Tailwind CSS** 用于样式
- **shadcn/ui** 组件（通过共享 ui 包）
- **Zustand** 用于状态管理
- **ESLint + Prettier** 用于代码质量
- **Husky + lint-staged** 用于提交前钩子

### 共享包

- `@mono-repo/ui` - 共享 React 组件
- `@mono-repo/utils` - 工具函数
- `@mono-repo/common-tailwind` - 共享 Tailwind 配置
- `@mono-repo/test-utils` - 测试工具

### 代理服务器

某些应用（如 ai-headshot-generator）包含用于 API 调用的代理服务器，以处理 CORS 和环境变量管理。

## 包管理

- 包管理器：**pnpm@9.0.0**
- Node 版本要求：**>=18**
- 工作区配置在 `pnpm-workspace.yaml` 中
- Turbo 配置在 `turbo.json` 中

## 代码质量工具

- 通过 Husky 进行提交前钩子
- 使用 eslint-plugin-unused-imports 自动清理未使用的导入
- 使用 Prettier 格式化
- 使用 ESLint 和 Next.js 代码检查规则

## API 文档规范

- 如果需要创建 API 接口文档，请生成 **OpenAPI 3.0 YAML 格式**文件
- 文档应包含完整的 CRUD 操作说明、请求/响应示例和数据模型定义
- YAML 文件可以直接导入到 Postman、Insomnia 等 API 开发工具中使用
