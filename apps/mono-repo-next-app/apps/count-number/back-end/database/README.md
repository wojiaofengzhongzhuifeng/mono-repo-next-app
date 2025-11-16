# 数据库设置指南

## Supabase 数据库配置

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com)
2. 创建新项目
3. 记录项目的 URL 和 API 密钥

### 2. 执行数据库 schema

1. 在 Supabase Dashboard 中打开 SQL Editor
2. 执行 `schema.sql` 中的 SQL 语句
3. 这将创建 `numbers` 表并插入示例数据

### 3. 环境变量配置

#### 后端用户端 (back-end/user)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### 后端管理端 (back-end/admin)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### 前端管理端 (front-end/admin)

```bash
NEXT_PUBLIC_API_URL=http://localhost:3011
```

### 4. API 端点

#### 用户端 API (端口 3010)

- `GET /api/user/numbers` - 获取所有激活的数字
- `GET /api/user/numbers/[id]` - 获取指定ID的激活数字
- `POST /api/user/numbers` - 创建新数字

#### 管理端 API (端口 3011)

- `GET /api/admin/numbers` - 获取所有数字（包括停用的）
- `GET /api/admin/numbers/[id]` - 获取指定ID的数字
- `POST /api/admin/numbers` - 创建新数字
- `PUT /api/admin/numbers/[id]` - 更新数字
- `DELETE /api/admin/numbers/[id]` - 删除数字
- `GET /api/admin/stats` - 获取统计信息

### 5. 数据表结构

```sql
numbers (
    id BIGINT PRIMARY KEY,
    value INTEGER NOT NULL,
    label VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)
```

### 6. 行级安全策略 (RLS)

- 普通用户只能看到状态为 'active' 的数字
- 管理员（使用 service role key）可以管理所有数字

### 7. 安装依赖

在各个应用目录中运行：

```bash
pnpm install
```

### 8. 启动应用

```bash
# 前端用户端
cd apps/count-number/front-end/user && pnpm dev

# 前端管理端
cd apps/count-number/front-end/admin && pnpm dev

# 后端用户端
cd apps/count-number/back-end/user && pnpm dev

# 后端管理端
cd apps/count-number/back-end/admin && pnpm dev
```

### 9. 访问地址

- 前端用户端: http://localhost:3008
- 前端管理端: http://localhost:3009
- 后端用户端 API: http://localhost:3010
- 后端管理端 API: http://localhost:3011
