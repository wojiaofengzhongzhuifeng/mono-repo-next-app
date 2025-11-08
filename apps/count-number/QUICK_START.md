# 🚀 快速开始指南

## 环境变量配置步骤

### 1. 获取 Supabase 配置信息

1. 打开你的 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 进入 **Settings** → **API**
4. 复制以下信息：
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **anon public**: `eyJ...` (开头的密钥)

### 2. 配置环境变量

你需要配置 **3个** `.env.local` 文件：

#### 🔧 后端用户端配置

编辑 `apps/count-number/back-end/user/.env.local`：

```bash
# 替换你的实际 Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-actual-anon-key  # 临时使用
```

#### 🔧 后端管理端配置

编辑 `apps/count-number/back-end/admin/.env.local`：

```bash
# 替换你的实际 Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-actual-anon-key  # 临时使用
```

#### 🔧 前端管理端配置

编辑 `apps/count-number/front-end/admin/.env.local`：

```bash
# 后端 API 地址
NEXT_PUBLIC_API_URL=http://localhost:3011
```

### 3. 设置数据库

1. 在 Supabase Dashboard 中打开 **SQL Editor**
2. 复制并执行 `apps/count-number/database/schema.sql` 中的 SQL 语句
3. 确认表创建成功

### 4. 安装依赖

```bash
# 安装所有应用的依赖
pnpm install
```

### 5. 启动应用

#### 方法 1: 逐一启动

```bash
# 终端 1: 前端用户端
cd apps/count-number/front-end/user && pnpm dev

# 终端 2: 前端管理端
cd apps/count-number/front-end/admin && pnpm dev

# 终端 3: 后端用户端
cd apps/count-number/back-end/user && pnpm dev

# 终端 4: 后端管理端
cd apps/count-number/back-end/admin && pnpm dev
```

#### 方法 2: 使用脚本

在根目录添加到 `package.json`：

```json
{
  "scripts": {
    "dev:count-number": "concurrently \"pnpm --filter count-number dev\" \"pnpm --filter count-number-admin dev\" \"pnpm --filter count-number-backend-user dev\" \"pnpm --filter count-number-backend-admin dev\""
  }
}
```

### 6. 访问应用

- **前端用户端**: http://localhost:3008
- **前端管理端**: http://localhost:3009
- **后端用户端 API**: http://localhost:3010
- **后端管理端 API**: http://localhost:3011

## 🧪 测试功能

### 管理端功能测试

1. 访问 http://localhost:3009
2. 点击 "数字管理"
3. 测试添加、编辑、删除数字

### API 测试

```bash
# 测试获取数字列表
curl http://localhost:3011/api/admin/numbers

# 测试创建数字
curl -X POST http://localhost:3011/api/admin/numbers \
  -H "Content-Type: application/json" \
  -d '{"value": 123, "label": "测试数字", "status": "active"}'
```

## ❓ 常见问题

### Q: 找不到 Service Role Key？

**A**: 暂时使用 Anon Key 代替，功能基本正常。参考 `database/supabase-setup-guide.md`

### Q: 数据库连接失败？

**A**: 检查 Supabase URL 和密钥是否正确，确认数据库表已创建

### Q: 端口冲突？

**A**: 修改对应应用 `package.json` 中的端口配置

### Q: 依赖安装失败？

**A**: 尝试清理缓存：`rm -rf node_modules && pnpm install`

## 📞 需要帮助？

- 查看详细文档：`database/README.md`
- Supabase 配置指南：`database/supabase-setup-guide.md`
- 项目整体说明：`apps/count-number/README.md`
