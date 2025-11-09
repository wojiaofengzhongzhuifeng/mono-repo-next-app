# Admin Frontend - Vercel 部署指南

## 📋 项目概述

Admin 前端用于管理数字计数数据，基于 Next.js 14.2.5 + React 18 + Ant Design + TypeScript 构建。

## 🚀 本地开发

### 1. 环境变量配置

复制环境变量模板：

```bash
cp .env.example .env.local
```

在 `.env.local` 中配置：

```env
# API Configuration - 后端管理端地址
NEXT_PUBLIC_API_URL=http://localhost:3011

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hntkigjaidhhdqoyclgy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. 安装依赖和运行

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问：http://localhost:3009

## 📦 Vercel 部署

### 方案一：前后端分离部署（推荐）

#### 1. 后端部署

```bash
# 在 back-end/admin 目录
vercel --prod
```

#### 2. 前端部署

```bash
# 在 front-end/admin 目录
vercel --prod
```

#### 3. Vercel 环境变量配置

**前端环境变量：**

- `NEXT_PUBLIC_API_URL`: 后端部署地址 (如: `https://count-number-admin-backend.vercel.app`)
- `NEXT_PUBLIC_SUPABASE_URL`: `https://hntkigjaidhhdqoyclgy.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 你的 Supabase 匿名密钥

**后端环境变量：**

- `NEXT_PUBLIC_SUPABASE_URL`: `https://hntkigjaidhhdqoyclgy.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY`: 你的 Supabase 服务角色密钥

### 方案二：单项目部署

#### 1. 项目结构调整

将后端 API 路由复制到前端的 `src/app/api` 目录下。

#### 2. 环境变量配置

```env
NEXT_PUBLIC_API_URL=https://your-project.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://hntkigjaidhhdqoyclgy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 🔧 API 接口调用

### 本地开发

```
前端 (3009) → 后端 (3011) → Supabase
     ↓              ↓              ↓
   React         Next.js        PostgreSQL
```

### 生产部署

```
前端 (Vercel) → 后端 (Vercel) → Supabase
     ↓              ↓              ↓
   React         Next.js        PostgreSQL
```

## 📡 API 端点

### 数字管理

- `GET /api/admin/numbers` - 获取所有数字记录
- `POST /api/admin/numbers` - 创建新数字记录
- `PUT /api/admin/numbers/[id]` - 更新数字记录
- `DELETE /api/admin/numbers/[id]` - 删除数字记录

### 统计信息

- `GET /api/admin/stats` - 获取统计信息

## 🛠️ 开发配置

### TypeScript 配置

- 严格模式已启用
- 路径别名：`@/*` 指向 `src/*`

### ESLint 配置

- 使用 Next.js 推荐配置
- 自动代码格式化和检查

### 样式配置

- Ant Design 5.x
- Tailwind CSS
- 支持响应式设计

## 🔍 调试和测试

### 1. API 调用测试

```bash
# 测试后端 API
curl http://localhost:3011/api/admin/numbers

# 测试前端重写
curl http://localhost:3009/api/admin/numbers
```

### 2. 环境变量检查

```typescript
import { printEnvInfo } from '@/lib/env'

// 在页面中调用查看环境配置
printEnvInfo()
```

### 3. 错误处理

- API 调用失败时会显示中文错误提示
- 开发环境下会显示详细的错误信息
- 生产环境下会降级处理，不影响用户体验

## 🚨 部署注意事项

### 1. 环境变量安全

- **绝对不要**在前端代码中使用 `SUPABASE_SERVICE_ROLE_KEY`
- 确保敏感信息通过 Vercel 环境变量配置
- 定期更换密钥

### 2. CORS 配置

- 后端已配置 CORS 头，支持跨域请求
- 生产环境下考虑限制允许的域名

### 3. 性能优化

- 使用 Vercel 的 Edge Network
- 配置适当的缓存策略
- 优化图片和静态资源

## 📞 支持

如果遇到部署问题：

1. 检查环境变量配置
2. 确认后端服务正常运行
3. 查看 Vercel 部署日志
4. 验证 Supabase 连接配置

## 🔄 部署流程

```bash
# 1. 测试本地环境
pnpm dev  # 前端
pnpm dev  # 后端 (在另一个终端)

# 2. 部署后端
cd back-end/admin
vercel --prod

# 3. 更新前端环境变量
# 在 Vercel Dashboard 中设置 NEXT_PUBLIC_API_URL

# 4. 部署前端
cd front-end/admin
vercel --prod

# 5. 验证部署
curl https://your-frontend.vercel.app/api/admin/numbers
```
