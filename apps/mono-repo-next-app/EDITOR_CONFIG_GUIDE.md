# 编辑器保存时自动格式化配置指南

本项目已配置 Prettier，支持在保存时自动格式化代码。以下是不同编辑器的配置方法：

## 📁 已创建的配置文件

- `.prettierrc` - Prettier 配置文件
- `.prettierignore` - Prettier 忽略文件配置
- `.editorconfig` - 跨编辑器通用配置
- `.vscode/settings.json` - VS Code 配置
- `.vscode/extensions.json` - VS Code 推荐扩展
- `.idea/codeStyles/` - WebStorm/IDEA 配置

## 🔧 VS Code 配置∑

### 1. 安装必需扩展

VS Code 会自动提示安装以下扩展：

- **Prettier - Code formatter** (`esbenp.prettier-vscode`)
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)

### 2. 自动配置

项目已包含 `.vscode/settings.json`，会自动配置：

- ✅ 保存时自动格式化 (`editor.formatOnSave: true`)
- ✅ 粘贴时自动格式化 (`editor.formatOnPaste: true`)
- ✅ 保存时自动修复 ESLint 问题
- ✅ 保存时自动整理导入

### 3. 手动验证

1. 打开任意 `.js`、`.ts`、`.jsx`、`.tsx` 文件
2. 按 `Cmd/Ctrl + S` 保存
3. 代码应该自动按照 Prettier 规则格式化

## 🛠️ WebStorm / IDEA 配置

### 1. Prettier 插件配置

1. 打开 **Settings/Preferences** (`Cmd/Ctrl + ,`)
2. 导航到 **Languages & Frameworks** → **JavaScript** → **Prettier**
3. 配置如下：
   - ✅ **Run for files**: `{**/*,*}.{js,ts,jsx,tsx,json,css,scss,less,md,yml,yaml}`
   - ✅ **On code reformat**: Prettier
   - ✅ **On save**: 勾选

### 2. 保存时自动格式化

1. 打开 **Settings/Preferences**
2. 导航到 **Tools** → **Actions on Save**
3. 勾选以下选项：
   - ✅ **Reformat code**
   - ✅ **Run code cleanup**
   - ✅ **Optimize imports**

### 3. 代码风格配置

项目已包含 `.idea/codeStyles/` 配置文件，会自动应用：

- ✅ 不使用分号
- ✅ 多行时使用尾随逗号
- ✅ 2 空格缩进
- ✅ 80 字符行宽限制

## 🌟 其他编辑器

### Sublime Text

1. 安装 `JsPrettier` 插件
2. 在用户设置中添加：
   ```json
   {
     "auto_format_on_save": true,
     "prettier_cli_path": "/path/to/project/node_modules/.bin/prettier"
   }
   ```

### Vim / Neovim

1. 安装 `prettier` 和 `vim-prettier` 插件
2. 在 `.vimrc` 中添加：
   ```vim
   let g:prettier#autoformat = 1
   let g:prettier#autoformat_require_pragma = 0
   autocmd BufWritePre *.js,*.ts,*.jsx,*.tsx Prettier
   ```

## 📋 Prettier 配置规则

当前 `.prettierrc` 配置：

```json
{
  "semi": false, // 不使用分号
  "singleQuote": true, // 使用单引号
  "tabWidth": 2, // 2 空格缩进
  "trailingComma": "es5", // ES5 尾随逗号
  "printWidth": 80, // 80 字符行宽
  "bracketSpacing": true, // 对象括号空格
  "arrowParens": "avoid", // 箭头函数单参数时省略括号
  "endOfLine": "lf", // LF 换行符
  "bracketSameLine": false, // JSX 括号换行
  "jsxSingleQuote": true // JSX 使用单引号
}
```

## 🚀 使用方法

### 手动格式化

```bash
# 格式化所有文件
npx prettier --write .

# 格式化特定文件
npx prettier --write src/**/*.tsx

# 检查格式（不修改文件）
npx prettier --check .
```

### Git Hooks

项目已配置 `lint-staged`，在提交时会自动格式化暂存的文件：

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "prettier --write",
    "eslint --fix"
  ]
}
```

## 🔍 故障排除

### 1. VS Code 不自动格式化

- 确认安装了 Prettier 扩展
- 检查 `.vscode/settings.json` 是否正确加载
- 重启 VS Code

### 2. WebStorm 不自动格式化

- 确认 Prettier 插件已启用
- 检查 Prettier 路径是否正确指向项目的 `node_modules/.bin/prettier`
- 重新加载项目配置

### 3. 格式化不一致

- 确认所有配置文件都已正确创建
- 检查是否有覆盖项目配置的编辑器设置
- 运行 `npx prettier --check .` 验证配置

## 📞 获取帮助

如果遇到问题，请：

1. 检查 Prettier 版本：`npx prettier --version`
2. 查看编辑器控制台错误信息
3. 确认所有配置文件路径正确
4. 重启编辑器后重试

---

**提示**：配置完成后，保存文件时应该会自动应用 Prettier 格式化。如果没有自动格式化，请检查上述配置步骤。
