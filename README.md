# Mono Repo Next Template

这是一个基于 Next.js 的 monorepo 项目模板，包含多个应用和共享包。

## 项目结构

```
mono-repo-next-template/
├── apps/                    # 应用目录
│   ├── ai-todo/            # AI Todo 应用
│   └── count-number/       # 计数器应用
├── packages/               # 共享包目录
│   ├── ui/                 # UI 组件包
│   └── utils/              # 工具函数包
├── VERCEL_DEPLOYMENT_GUIDE.md  # Vercel 部署指南
└── README.md               # 项目说明文档
```

## 快速开始

### 环境要求

- Node.js 18+
- pnpm 8+

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

#### 启动 AI Todo 应用
```bash
cd apps/ai-todo
pnpm run dev
```
访问 http://localhost:3000

#### 启动计数器应用
```bash
cd apps/count-number
pnpm run dev
```
访问 http://localhost:3002/count-number

## 部署

### Vercel 部署

详细的部署指南请参考 [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)

**关键配置：**
- Root Directory: `apps/ai-todo`
- Build Command: `pnpm build`
- Output Directory: `.next`
- Install Command: `pnpm install`

## 更新代码流程

### 开发流程

1. **创建新分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或者
   git checkout -b fix/your-fix-name
   ```

2. **进行代码修改**
   - 修改相关文件
   - 添加新功能或修复 bug
   - 确保代码符合项目规范

3. **本地测试**
   ```bash
   # 测试 AI Todo 应用
   cd apps/ai-todo
   pnpm run dev
   
   # 测试计数器应用（如果需要）
   cd ../count-number
   pnpm run dev
   ```

4. **代码检查**
   ```bash
   # 在项目根目录执行
   pnpm lint
   pnpm type-check
   ```

5. **提交代码**
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   # 或
   git commit -m "fix: 修复问题描述"
   ```

6. **推送到远程仓库**
   ```bash
   git push origin feature/your-feature-name
   ```

### 自动部署

推送代码后会触发自动部署：

- **推送到 `main` 分支** → 生产环境自动部署
- **推送到其他分支** → 预览环境自动部署

### 部署验证

1. **检查部署状态**
   - 访问 Vercel 控制台查看部署日志
   - 确认构建成功

2. **功能测试**
   - 访问部署的 URL
   - 测试修改的功能
   - 检查控制台是否有错误

3. **合并到主分支**
   ```bash
   git checkout main
   git pull origin main
   git merge feature/your-feature-name
   git push origin main
   ```

4. **清理分支**
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

## 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

示例：
```bash
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复页面加载错误"
git commit -m "docs: 更新部署文档"
```

## 常见问题

### Q: 部署失败怎么办？
A: 检查以下几点：
- 确保 `pnpm-lock.yaml` 文件存在
- 检查依赖版本兼容性
- 查看构建日志中的错误信息
- 确认 Root Directory 设置为 `apps/ai-todo`

### Q: 环境变量不生效？
A: 确认：
- 变量名以 `NEXT_PUBLIC_` 开头（客户端访问）
- 在 Vercel 控制台正确配置
- 重新部署项目

### Q: 如何添加新的应用？
A: 在 `apps/` 目录下创建新的应用目录，并配置相应的 `package.json` 和 `next.config.js`。

## 技术栈

- **框架**: Next.js
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **包管理**: pnpm
- **构建工具**: Turbo
- **部署**: Vercel

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License
