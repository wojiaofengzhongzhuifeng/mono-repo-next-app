# 代码自动格式化指南

本项目已配置完整的代码自动格式化系统，包括 Prettier、ESLint 和 Git hooks。

## 📋 配置概览

### Prettier 配置

- **配置文件**: `.prettierrc`
- **主要规则**:
  - 不使用分号 (`semi: false`)
  - 使用单引号 (`singleQuote: true`)
  - 缩进 2 个空格 (`tabWidth: 2`)
  - 行宽 80 字符 (`printWidth: 80`)
  - JSX 使用单引号 (`jsxSingleQuote: true`)

### ESLint 配置

- **配置文件**: `.eslintrc.json`
- **功能**: 代码质量检查和自动修复

### Git Hooks (Husky + lint-staged)

- **Pre-commit**: 自动格式化暂存的文件
- **lint-staged**: 只对变更的文件运行格式化

## 🚀 使用方法

### 1. 手动格式化所有文件

```bash
# 格式化整个项目
pnpm format

# 或者格式化特定应用
cd apps/shop && pnpm format
```

### 2. Git 提交时自动格式化

当你执行 `git commit` 时，会自动：

1. 对暂存的文件运行 Prettier 格式化
2. 运行 ESLint 自动修复
3. 如果格式化后有变更，会重新暂存文件

### 3. VSCode 自动格式化

项目已配置 VSCode 设置，支持：

- **保存时自动格式化**: `editor.formatOnSave: true`
- **粘贴时自动格式化**: `editor.formatOnPaste: true`
- **保存时自动修复 ESLint 问题**: `source.fixAll.eslint`

## 📦 推荐的 VSCode 扩展

项目已配置推荐的扩展列表，包括：

- **Prettier**: 代码格式化
- **ESLint**: 代码质量检查
- **Tailwind CSS IntelliSense**: Tailwind 类名智能提示
- **TypeScript Importer**: 自动导入模块

## 🔧 故障排除

### 如果 Git hooks 不工作

```bash
# 重新安装 husky
pnpm exec husky install

# 检查 pre-commit hook 权限
chmod +x .husky/pre-commit
```

### 如果 VSCode 格式化不工作

1. 确保安装了推荐的扩展
2. 检查 `.vscode/settings.json` 配置
3. 重启 VSCode

### 手动运行 lint-staged

```bash
# 测试 lint-staged 配置
npx lint-staged --verbose
```

## 📝 配置文件说明

- `.prettierrc`: Prettier 格式化规则
- `.prettierignore`: 忽略格式化的文件/目录
- `.husky/pre-commit`: Git pre-commit hook
- `package.json`: lint-staged 配置
- `.vscode/settings.json`: VSCode 编辑器配置
- `.vscode/extensions.json`: 推荐扩展列表

## 🎯 最佳实践

1. **提交前**: 让 Git hooks 自动处理格式化
2. **开发时**: 依赖 VSCode 保存时自动格式化
3. **CI/CD**: 在构建流程中运行 `pnpm format` 检查
4. **团队协作**: 确保所有成员使用相同的 Prettier 配置

这样配置后，你的代码将始终保持一致的格式，无需手动处理！
