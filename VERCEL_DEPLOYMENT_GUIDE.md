# AI Todo App - Vercel 部署指南

## 概述
本指南将帮助您将 AI Todo 应用部署到 Vercel 平台。

## 前置条件
- Vercel 账号
- GitHub/GitLab/Bitbucket 账号（推荐）
- 项目代码已推送到 Git 仓库

## 部署步骤

### 方法一：通过 Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```

4. **按照提示操作**
   - 选择项目范围
   - 确认项目设置
   - 等待部署完成

### 方法二：通过 Vercel 网页界面部署（推荐）

#### 方式 A：使用 vercel.json 配置文件（最简单）

1. **访问 Vercel 控制台**
   - 打开 [vercel.com](https://vercel.com)
   - 登录您的账号

2. **创建新项目**
   - 点击 "New Project"
   - 导入您的 Git 仓库
   - 或选择 "Import Git Repository"

3. **配置项目设置**
   - **Framework Preset**: Next.js（Vercel 会自动检测）
   - **Root Directory**: 保持默认（根目录）
   - **Build Command**: 自动读取 `vercel.json` 中的配置
   - **Output Directory**: 自动读取 `vercel.json` 中的配置
   - **Install Command**: 自动读取 `vercel.json` 中的配置

   📋 **说明**：
   - 项目根目录的 `vercel.json` 文件包含了所有必要配置
   - Vercel 会自动识别并应用这些设置
   - 无需手动修改任何配置

#### 方式 B：手动配置（备选方案）

1. **访问 Vercel 控制台**
   - 打开 [vercel.com](https://vercel.com)
   - 登录您的账号

2. **创建新项目**
   - 点击 "New Project"
   - 导入您的 Git 仓库
   - 或选择 "Import Git Repository"

3. **配置项目设置（重要）**
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps` ← **推荐设置：这样可以管理多个应用**
   - **Build Command**: `cd .. && pnpm build` ← **从根目录构建以确保依赖包正确构建**
   - **Output Directory**: `ai-todo/.next`
   - **Install Command**: `pnpm install`

   📋 **详细配置步骤：**
   - 在 "Configure Project" 页面
   - 找到 "Root Directory" 字段
   - 输入：`apps`
   - 在 "Output Directory" 字段输入：`ai-todo/.next`
   - 其他字段按上述配置
   - 确认无误即可

   **备选方案（如果上述方案有问题）：**
   - **Root Directory**: `apps/ai-todo`
   - **Build Command**: `cd ../../ && pnpm build`
   - **Output Directory**: `.next`

4. **环境变量配置**
   在 Vercel 控制台中添加环境变量：
   - `NEXT_PUBLIC_APP_URL`: 您的 Vercel 域名
   - `NEXT_PUBLIC_APP_NAME`: AI Todo App
   - 其他需要的环境变量

5. **部署**
   - 点击 "Deploy"
   - 等待构建和部署完成

## 项目配置说明

### 重要提示
对于 monorepo 项目，现在有两种部署方式：

**方式一：使用 vercel.json 配置文件（推荐）**
- 项目根目录已包含 `vercel.json` 配置文件
- **Root Directory**: 保持默认（根目录）
- Vercel 会自动读取配置文件，无需手动设置

**方式二：手动配置（备选）**
- **Root Directory**: `apps` （推荐，便于管理多个应用）
- **备选**: `apps/ai-todo` （如果只有一个应用）

这样 Vercel 才能正确识别 Next.js 应用并处理构建依赖。

### 环境变量
参考 `.env.example` 文件配置环境变量。在 Vercel 控制台的 Environment Variables 部分添加：
- 生产环境变量
- 预览环境变量
- 开发环境变量

## Monorepo 特殊配置

由于这是一个 monorepo 项目，我们使用了以下配置：

1. **工作区配置**: `pnpm-workspace.yaml`
2. **构建工具**: Turbo
3. **包管理器**: pnpm

Vercel 会自动识别 monorepo 结构并正确处理依赖关系。

## 部署后验证

1. **检查部署状态**
   - 在 Vercel 控制台查看部署日志
   - 确认构建成功

2. **功能测试**
   - 访问部署的 URL
   - 测试所有页面和功能
   - 检查控制台是否有错误

3. **性能优化**
   - 查看 Vercel Analytics
   - 检查 Core Web Vitals
   - 优化加载速度

## 常见问题

### Q: 构建失败怎么办？
A: 检查以下几点：
- 确保 `pnpm-lock.yaml` 文件存在
- 检查依赖版本兼容性
- 查看构建日志中的错误信息

### Q: 环境变量不生效？
A: 确认：
- 变量名以 `NEXT_PUBLIC_` 开头（客户端访问）
- 在 Vercel 控制台正确配置
- 重新部署项目

### Q: 自定义域名配置？
A: 在 Vercel 控制台的 Domains 部分添加您的域名并配置 DNS。

### Q: 报错 "No Next.js version detected" 怎么办？
A: 这是 monorepo 项目的常见问题，解决方法：

**方案一（推荐）**：
1. 在 Vercel 控制台中设置 **Root Directory** 为 `apps`
2. 确保 **Build Command** 为 `cd .. && pnpm build`
3. 确保 **Output Directory** 为 `ai-todo/.next`
4. 重新部署项目

**方案二（备选）**：
1. 在 Vercel 控制台中设置 **Root Directory** 为 `apps/ai-todo`
2. 确保 **Build Command** 为 `cd ../../ && pnpm build`
3. 确保 **Output Directory** 为 `.next`
4. 重新部署项目

### Q: 报错 "Module '@mono-repo/utils' has no exported member 'get'" 怎么办？
A: 这是 monorepo 依赖包构建问题，解决方法：

**方案一（推荐）**：
1. **Root Directory**: `apps`
2. **Build Command**: `cd .. && pnpm build`
3. **Output Directory**: `ai-todo/.next`

**方案二（备选）**：
1. **Root Directory**: `apps/ai-todo`
2. **Build Command**: `cd ../../ && pnpm build`
3. **Output Directory**: `.next`

**关键步骤**：
1. 确认构建命令从根目录运行，这样会先构建 `packages/utils` 和 `packages/ui`
2. 确认 `turbo.json` 中的 `dependsOn: ["^build"]` 配置正确
3. 本地测试：运行 `pnpm build` 确保构建成功
4. 重新部署项目

**原因分析**：
- Vercel 默认只构建应用目录，不会构建依赖的内部包
- 需要从根目录运行构建命令，利用 Turbo 的依赖管理
- Turbo 会按正确顺序构建：先构建 packages，再构建 apps

## 配置方案对比

### 方案一：Root Directory = `apps`（推荐）

**优点**：
- 便于管理多个应用
- 构建路径更简洁：`cd .. && pnpm build`
- 为未来添加新应用做准备
- 更符合 monorepo 的架构理念

**缺点**：
- 需要明确指定 Output Directory：`ai-todo/.next`
- 配置稍微复杂一点

### 方案二：Root Directory = `apps/ai-todo`（备选）

**优点**：
- 配置简单直接
- Output Directory 就是 `.next`
- 适合单一应用的项目

**缺点**：
- 构建路径较长：`cd ../../ && pnpm build`
- 不便于扩展多个应用
- 不太符合 monorepo 最佳实践

## 自动部署

设置 Git 集成后，每次推送代码到主分支都会自动触发部署：
- 推送到 `main` 分支 → 生产环境部署
- 推送到其他分支 → 预览环境部署

## 联系支持

如果遇到问题，可以：
- 查看 [Vercel 文档](https://vercel.com/docs)
- 联系 Vercel 支持
- 检查项目 Issues
