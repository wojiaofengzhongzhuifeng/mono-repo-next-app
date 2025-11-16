# Git Pre-commit Hook 配置指南

## 概述

本项目已配置了 Git pre-commit hook，在每次 `git commit` 时自动运行 Prettier 格式化代码，确保提交的代码符合项目的代码风格规范。

## 配置详情

### 工具链

- **Husky**: Git hooks 管理工具
- **lint-staged**: 对暂存文件运行代码检查和格式化
- **Prettier**: 代码格式化工具

### 配置文件

1. **`.husky/pre-commit`**: Git pre-commit hook 脚本

   ```bash
   npx lint-staged
   ```

2. **`package.json`** 中的 `lint-staged` 配置：

   ```json
   "lint-staged": {
     "*.{js,jsx,ts,tsx}": [
       "prettier --write"
     ],
     "*.{json,md,yml,yaml}": [
       "prettier --write"
     ],
     "*.{css,scss,less}": [
       "prettier --write"
     ]
   }
   ```

3. **`.prettierrc`**: Prettier 配置文件

   ```json
   {
     "semi": false,
     "singleQuote": true,
     "tabWidth": 2,
     "trailingComma": "es5",
     "printWidth": 80,
     "bracketSpacing": true,
     "arrowParens": "avoid",
     "endOfLine": "lf",
     "bracketSameLine": false,
     "quoteProps": "as-needed",
     "jsxSingleQuote": true,
     "proseWrap": "preserve"
   }
   ```

4. **`.prettierignore`**: Prettier 忽略文件配置

   ```
   # Dependencies
   node_modules/
   apps/*/node_modules/
   packages/*/node_modules/

   # Build outputs
   dist/
   .next/
   .turbo/
   out/

   # Generated files
   *.log
   *.lock

   # Other common ignores
   .git/
   .idea/
   .claude/
   coverage/
   .nyc_output/
   ```

## 工作流程

1. 开发者修改代码文件
2. 运行 `git add` 将文件添加到暂存区
3. 运行 `git commit` 提交代码
4. Husky 自动触发 pre-commit hook
5. lint-staged 对暂存文件运行 Prettier 格式化
6. 格式化完成后，代码被提交

## 支持的文件类型

- JavaScript/TypeScript 文件: `*.{js,jsx,ts,tsx}`
- 配置文件: `*.{json,md,yml,yaml}`
- 样式文件: `*.{css,scss,less}`

## 手动运行格式化

如果需要手动格式化代码，可以运行：

```bash
# 格式化所有文件
pnpm format

# 格式化特定文件
npx prettier --write src/app.js
```

## 注意事项

1. **自动格式化**: Pre-commit hook 会自动格式化暂存的文件，无需手动操作
2. **提交失败**: 如果格式化过程中出现错误，提交会失败，请检查错误信息
3. **IDE 配置**: 建议在 IDE 中安装 Prettier 插件，以便在开发时实时预览格式化效果
4. **团队协作**: 所有团队成员都会使用相同的格式化规则，确保代码风格一致

## 故障排除

### 如果 pre-commit hook 不工作

1. 检查 Husky 是否正确安装：

   ```bash
   npx husky install
   ```

2. 检查 hook 文件权限：

   ```bash
   chmod +x .husky/pre-commit
   ```

3. 重新安装依赖：
   ```bash
   pnpm install
   ```

### 如果需要跳过 pre-commit hook（不推荐）

```bash
git commit --no-verify -m "commit message"
```

**注意**: 这会跳过所有 pre-commit 检查，请谨慎使用。

## 更新配置

如需修改格式化规则或支持的文件类型，请编辑相应的配置文件：

- 修改 Prettier 规则: 编辑 `.prettierrc`
- 修改支持的文件类型: 编辑 `package.json` 中的 `lint-staged` 配置
- 修改忽略文件: 编辑 `.prettierignore`
