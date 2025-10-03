# Vercel 部署指南

本项目是一个 monorepo，包含两个独立的 Next.js 应用：
- `ai-todo` - AI 待办事项应用
- `ai-count-number` - AI 计数器应用

## 部署方式

### 方式一：分别部署两个应用（推荐）

每个应用都有独立的 Vercel 配置文件，可以分别部署：

#### 部署 ai-todo
1. 在 Vercel 中创建新项目
2. 连接到你的 GitHub 仓库
3. **Root Directory** 设置为：`apps/ai-todo`
4. Vercel 会自动读取 `apps/ai-todo/vercel.json` 配置
5. 点击 Deploy

#### 部署 ai-count-number
1. 在 Vercel 中创建另一个新项目
2. 连接到同一个 GitHub 仓库
3. **Root Directory** 设置为：`apps/ai-count-number`
4. Vercel 会自动读取 `apps/ai-count-number/vercel.json` 配置
5. 点击 Deploy

### 方式二：使用 Vercel Teams 的 Monorepo 功能

如果你有 Vercel Teams 账户，可以使用 monorepo 功能：

1. 在项目根目录创建 `vercel.json`（已存在）
2. 在 Vercel 项目设置中配置 monorepo
3. Vercel 会自动检测到多个应用

## 配置文件说明

### 根目录 vercel.json
```json
{
  "version": 2,
  "installCommand": "pnpm install",
  "buildCommand": "turbo run build"
}
```

### apps/ai-todo/vercel.json
```json
{
  "version": 2,
  "name": "ai-todo",
  "installCommand": "cd ../.. && pnpm install",
  "buildCommand": "cd ../.. && turbo run build --filter=ai-todo",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

### apps/ai-count-number/vercel.json
```json
{
  "version": 2,
  "name": "ai-count-number",
  "installCommand": "cd ../.. && pnpm install",
  "buildCommand": "cd ../.. && turbo run build --filter=ai-count-number",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

## 端口配置

- `ai-todo`: 开发服务器运行在 `http://localhost:3005`
- `ai-count-number`: 开发服务器运行在 `http://localhost:3006`

## 本地开发

```bash
# 安装依赖
pnpm install

# 构建所有项目
pnpm build

# 启动 ai-todo 开发服务器
cd apps/ai-todo && pnpm dev

# 启动 ai-count-number 开发服务器
cd apps/ai-count-number && pnpm dev
```

## 注意事项

1. **不要在 Vercel 项目设置中使用 Root Directory 字段**，这会导致 "Invalid request: should NOT have additional property `rootDirectory`" 错误
2. 每个应用都有独立的配置文件，确保构建命令正确
3. 使用 Turbo 进行构建优化，提高构建速度
4. 所有应用共享相同的依赖包，通过 pnpm workspace 管理

## 故障排除

如果遇到构建问题：

1. 检查 `package.json` 中的构建脚本
2. 确认 `turbo.json` 配置正确
3. 验证 `pnpm-workspace.yaml` 包含所有应用
4. 检查 TypeScript 配置和路径别名

## 环境变量

每个应用可以设置独立的环境变量：

- `ai-todo`: 在 Vercel 项目设置中添加环境变量
- `ai-count-number`: 在其 Vercel 项目设置中添加环境变量

共享的环境变量可以在根目录的 `.env` 文件中配置。
