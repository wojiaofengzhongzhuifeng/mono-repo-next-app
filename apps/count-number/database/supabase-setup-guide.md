# Supabase Service Role Key 获取指南

## 获取 Service Role Key 的方法

### 方法 1: 通过 Supabase Dashboard (推荐)

1. 打开你的 Supabase 项目 Dashboard
2. 进入 **Settings** → **API**
3. 在 "Project API keys" 部分，你应该看到：

   - `anon public` - 这是公开密钥
   - `service_role` - 这是服务端私有密钥

4. Service Role Key 旁边通常会有一个 **"Reveal"** 或 **👁️"** 图标
5. 点击显示密钥，然后复制

### 方法 2: 重新生成 Service Role Key

如果找不到现有的 Service Role Key：

1. 在 Settings → API 页面
2. 找到 Service Role Key 部分
3. 点击 **"Regenerate"** 或 **"Reset"**
4. ⚠️ **注意**: 这会使旧的 Service Role Key 失效

### 方法 3: 使用 Supabase CLI

如果你安装了 Supabase CLI：

```bash
# 获取项目信息
supabase projects list

# 获取特定项目的密钥
supabase projects get <project-ref>
```

## 环境变量配置

找到 Service Role Key 后，在相应的 `.env` 文件中配置：

### 后端用户端 (back-end/user/.env.local)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 后端管理端 (back-end/admin/.env.local)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 安全注意事项

1. **Service Role Key 拥有完全访问权限** - 可以绕过所有 RLS 策略
2. **绝不要在客户端代码中使用 Service Role Key**
3. **只在服务端/后端 API 中使用**
4. **不要提交到版本控制系统**

## 临时解决方案

如果你暂时找不到 Service Role Key，可以先使用 Anon Key 进行开发：

```bash
# 临时配置 (仅用于开发测试)
SUPABASE_SERVICE_ROLE_KEY=your_anon_key_here
```

但要注意：

- Anon Key 受 RLS 策略限制
- 某些管理员操作可能无法执行
- 生产环境必须使用 Service Role Key
