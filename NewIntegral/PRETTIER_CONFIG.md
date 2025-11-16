# Prettier 配置说明

本项目使用 **项目级别** 的 Prettier 配置，确保所有团队成员的代码风格一致。

## 配置文件

### 1. `.prettierrc` - Prettier 规则

项目根目录的 Prettier 配置文件，定义代码格式化规则：

```json
{
  "semi": false, // 不使用分号
  "singleQuote": true, // 使用单引号
  "tabWidth": 2, // 2 个空格缩进 ⭐
  "trailingComma": "es5", // ES5 风格的尾随逗号
  "printWidth": 80, // 行宽 80 字符
  "bracketSpacing": true, // 对象括号内有空格 { foo: bar }
  "arrowParens": "avoid", // 箭头函数单参数时省略括号
  "endOfLine": "lf", // 使用 LF 换行符
  "bracketSameLine": false, // JSX 标签的 > 换行
  "jsxSingleQuote": true, // JSX 中使用单引号
  "proseWrap": "preserve" // Markdown 文本不自动换行
}
```

### 2. `.prettierignore` - 忽略文件

定义哪些文件不需要格式化：

- `node_modules/` - 依赖包
- `dist/`, `.next/`, `out/` - 构建产物
- `*.log`, `*.lock` - 日志和锁文件
- `.env*` - 环境配置文件
- `.vscode/` - 编辑器配置

### 3. `.editorconfig` - 编辑器配置

跨编辑器的通用配置，与 Prettier 保持一致：

- 缩进：2 个空格
- 换行符：LF
- 文件末尾添加空行
- 删除行尾空格

### 4. `.vscode/settings.json` - 项目编辑器设置

VSCode/Cursor 的项目级别配置：

- ✅ **自动格式化**：保存和粘贴时自动使用 Prettier
- ✅ **强制 2 个空格**：禁用自动检测缩进
- ✅ **优先级最高**：覆盖用户的全局设置

## 使用方法

### 自动格式化（推荐）

1. **安装扩展**：打开项目后安装推荐的 Prettier 扩展
2. **保存时格式化**：保存文件时自动格式化（已配置）
3. **粘贴时格式化**：粘贴代码时自动格式化（已配置）

### 手动格式化

```bash
# 格式化整个项目
pnpm prettier --write .

# 格式化特定目录
pnpm prettier --write "apps/count-number/**/*.{ts,tsx,js,jsx}"

# 检查格式（不修改）
pnpm prettier --check .
```

### 快捷键

- **格式化文档**：`Shift + Option + F` (Mac) / `Shift + Alt + F` (Windows/Linux)
- **格式化选区**：选中代码后使用相同快捷键

## 配置优先级

配置的应用顺序（从高到低）：

```
1. .vscode/settings.json (项目配置)    ← 最高优先级 ⭐
   ↓
2. .prettierrc (Prettier 规则)        ← 格式化规则
   ↓
3. .editorconfig (编辑器配置)          ← 跨编辑器通用
   ↓
4. 用户全局设置                        ← 会被项目配置覆盖
```

**关键点**：`.vscode/settings.json` 会覆盖用户的全局设置，确保所有团队成员使用相同的 2 个空格缩进。

## 验证配置

### 检查当前文件的缩进

保存以下代码，应该自动格式化为 2 个空格：

```typescript
// 保存前（4 个空格）
function test() {
  const data = {
    name: 'test',
    value: 123,
  }
  return data
}

// 保存后（2 个空格）
function test() {
  const data = {
    name: 'test',
    value: 123,
  }
  return data
}
```

### 验证配置生效

1. 打开任意 `.ts` 或 `.tsx` 文件
2. 故意使用 4 个空格缩进
3. 保存文件（`Cmd/Ctrl + S`）
4. 应该自动格式化为 2 个空格

## 常见问题

### Q: 保存时没有自动格式化？

**A**: 检查以下内容：

1. 是否安装了 Prettier 扩展（`esbenp.prettier-vscode`）
2. 重启 VSCode/Cursor
3. 确认 `.vscode/settings.json` 文件存在

### Q: 还是显示 4 个空格？

**A**:

1. 检查 `.prettierrc` 的 `tabWidth` 是否为 2
2. 确认 `.vscode/settings.json` 中 `editor.detectIndentation` 为 `false`
3. 手动运行 `pnpm prettier --write <文件路径>` 格式化文件

### Q: 某些文件不需要格式化？

**A**: 在 `.prettierignore` 中添加文件或目录路径

### Q: 如何禁用某行的格式化？

**A**: 使用注释：

```typescript
// prettier-ignore
const uglyCode = { foo:1,bar:2 }
```

## Git 提交时自动格式化

项目已配置 `lint-staged`，在提交时自动格式化暂存的文件：

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"],
  "*.{css,scss,less}": ["prettier --write"]
}
```

## 总结

✅ **项目级别配置**：不依赖个人编辑器设置
✅ **2 个空格缩进**：`.prettierrc` 中的 `tabWidth: 2`
✅ **保存时自动格式化**：`.vscode/settings.json` 已配置
✅ **团队一致性**：所有成员使用相同的格式化规则

**重要**：请勿修改个人编辑器的全局设置来覆盖项目配置。项目配置优先级最高，确保代码风格统一。
