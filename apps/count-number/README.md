# Count Number 全栈应用

这是一个基于 Next.js + Supabase 的全栈数字管理应用，包含用户端和管理端。

## 项目结构

```
apps/count-number/
├── front-end/
│   ├── user/          # 前端用户端 (Next.js + Tailwind CSS)
│   └── admin/         # 前端管理端 (Next.js + Ant Design)
├── back-end/
│   ├── user/          # 后端用户端 API (Next.js + Supabase)
│   └── admin/         # 后端管理端 API (Next.js + Supabase)
    └── database/
      ├── schema.sql     # 数据库结构
      └── README.md      # 数据库配置指南


```

## 功能特性

### 前端用户端

- 基于 Next.js 14 和 Tailwind CSS
- 使用现有的组件库结构
- 展示激活状态的数字列表
- 响应式设计

### 前端管理端

- 基于 Next.js 14 和 Ant Design
- 完整的数字 CRUD 操作
- 仪表盘统计
- 侧边栏导航
- 表格管理和搜索

### 后端用户端

- Next.js API Routes
- Supabase 数据库集成
- 只返回激活状态的数字
- RESTful API 设计

### 后端管理端

- 完整的管理 API
- 支持所有 CRUD 操作
- 统计数据接口
- 使用 Service Role Key 进行管理员操作

## 快速开始

### 1. 环境准备

- Node.js >= 18
- pnpm >= 9.0.0
- Supabase 账户

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置数据库

参考 `database/README.md` 配置 Supabase 数据库

### 4. 启动应用

#### 从根目录启动所有应用：

```bash
pnpm dev:count-number
```

#### 或者单独启动：

```bash
# 前端用户端 (端口 3008)
cd apps/count-number/front-end/user && pnpm dev

# 前端管理端 (端口 3009)
cd apps/count-number/front-end/admin && pnpm dev

# 后端用户端 (端口 3010)
cd apps/count-number/back-end/user && pnpm dev

# 后端管理端 (端口 3011)
cd apps/count-number/back-end/admin && pnpm dev
```

## API 文档

### 用户端 API (端口 3010)

- `GET /api/user/numbers` - 获取激活数字列表
- `GET /api/user/numbers/[id]` - 获取单个激活数字

### 管理端 API (端口 3011)

- `GET /api/admin/numbers` - 获取所有数字
- `POST /api/admin/numbers` - 创建数字
- `PUT /api/admin/numbers/[id]` - 更新数字
- `DELETE /api/admin/numbers/[id]` - 删除数字
- `GET /api/admin/stats` - 获取统计数据

## 技术栈

- **前端框架**: Next.js 14
- **UI 库**: Tailwind CSS, Ant Design
- **后端**: Next.js API Routes
- **数据库**: Supabase (PostgreSQL)
- **状态管理**: Zustand
- **HTTP 客户端**: Axios
- **开发工具**: TypeScript, ESLint, Prettier

## 开发命令

```bash
# 开发
pnpm dev

# 构建
pnpm build

# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 清理
pnpm clean
```

## 部署

### 前端部署

可以部署到 Vercel、Netlify 等平台

### 后端部署

可以部署到 Vercel Serverless Functions、Railway、Render 等

### 数据库

使用 Supabase 云端服务，自动处理扩展和备份
