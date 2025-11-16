# Common Tailwind 插件包

为 monorepo 项目提供统一的 Tailwind CSS 插件和工具类。

## 功能特性

### 1. Center Container 插件

提供响应式的居中容器类名。

**基础用法：**

```html
<div class="center-container">
  <!-- 内容 -->
</div>
```

**变体：**

- `.center-container` - 默认响应式容器
- `.center-container-sm` - 小尺寸容器 (640px)
- `.center-container-md` - 中尺寸容器 (768px)
- `.center-container-lg` - 大尺寸容器 (1024px)
- `.center-container-xl` - 超大尺寸容器 (1200px)

**响应式特性：**

- 默认：px-3, max-width: calc(100vw - 24px)
- 375.1px+：px-4, max-width: 736px
- 768.1px+：px-6, max-width: 1200px

### 2. Spacing 插件

基于 2 倍规则的间距系统。

**规则：**

- 数字 `n` 表示 `n*2px` 的间距
- 范围：0-99
- 例如：`p-20` = 40px, `m-10` = 20px

**用法示例：**

```html
<div class="p-10 m-20 gap-5">
  <!-- padding: 20px, margin: 40px, gap: 10px -->
</div>
```

### 3. Font Size 插件

支持 12px 到 80px 的字体大小和行高组合。

**基础字体大小：**

```html
<p class="font-12">12px 字体</p>
<p class="font-16">16px 字体</p>
<p class="font-24">24px 字体</p>
```

**字体大小/行高组合：**

```html
<p class="text-12/14">12px 字体, 14px 行高</p>
<p class="text-16/20">16px 字体, 20px 行高</p>
<p class="text-24/32">24px 字体, 32px 行高</p>
```

### 4. Section Block 插件

内容区块间距插件，支持响应式和不对称间距。

**基础用法：**

```html
<section class="section-block">
  <!-- 默认间距：桌面端 90px, 移动端 24px -->
</section>
```

**指定间距：**

```html
<section class="section-block-20">
  <!-- 上下间距：40px (20*2) -->
</section>
```

**不对称间距：**

```html
<section class="section-block-30-20">
  <!-- 上间距：60px, 下间距：40px -->
</section>
```

**响应式间距：**

```html
<section class="section-block-45-20">
  <!-- 桌面端：90px, 移动端：40px -->
</section>
```

**仅顶部或底部：**

```html
<section class="section-block-top-20 section-block-bottom-10">
  <!-- 仅上间距：40px, 仅下间距：20px -->
</section>
```

## 安装和配置

### 1. 安装包

```bash
npm install @mono-repo/common-tailwind
# 或
pnpm add @mono-repo/common-tailwind
```

### 2. 配置 Tailwind CSS

**完整配置：**

```javascript
// tailwind.config.js
import { plugins, configs } from '@mono-repo/common-tailwind'

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 合并 spacing 和 fontSize 配置
      ...configs.spacing.theme,
      ...configs.fontSize.theme,
    },
  },
  plugins: [
    // 添加所有插件
    ...plugins,
  ],
}
```

**单独使用插件：**

```javascript
// tailwind.config.js
import {
  centerContainerPlugin,
  spacingPlugin,
  fontSizePlugin,
  sectionBlockPlugin,
  spacingConfig,
  fontSizeConfig,
} from '@mono-repo/common-tailwind'

module.exports = {
  theme: {
    extend: {
      ...spacingConfig.theme,
      ...fontSizeConfig.theme,
    },
  },
  plugins: [
    centerContainerPlugin,
    spacingPlugin,
    fontSizePlugin,
    sectionBlockPlugin,
  ],
}
```

## API 参考

### 插件导出

```javascript
import {
  // 插件
  centerContainerPlugin,
  spacingPlugin,
  fontSizePlugin,
  sectionBlockPlugin,

  // 配置
  spacingConfig,
  fontSizeConfig,
  sectionBlockConfig,

  // 工具函数
  generateSpacing,
  generateFontSize,
  generateFontSizeAndLineHeight,

  // 便捷导出
  plugins,
  configs,
  completeConfig,
} from '@mono-repo/common-tailwind'
```

### 工具函数

**generateSpacing()**
生成 0-99 的间距配置对象。

```javascript
import { generateSpacing } from '@mono-repo/common-tailwind'

const spacing = generateSpacing()
console.log(spacing) // { 0: '0px', 1: '2px', 2: '4px', ... }
```

**generateFontSize()**
生成 12-80px 的字体大小配置。

```javascript
import { generateFontSize } from '@mono-repo/common-tailwind'

const fontSize = generateFontSize()
console.log(fontSize) // { 12: '12px', 13: '13px', ... }
```

**generateFontSizeAndLineHeight()**
生成字体大小/行高组合配置。

```javascript
import { generateFontSizeAndLineHeight } from '@mono-repo/common-tailwind'

const combinations = generateFontSizeAndLineHeight()
console.log(combinations) // { '12/14': '12/14', '12/16': '12/16', ... }
```

## 示例

查看 `src/examples/` 目录中的示例文件：

- `tailwind.config.js` - 配置示例
- `demo.html` - 完整演示页面

## 设计原则

### 2 倍规则

所有间距和字体大小都遵循 2 倍规则，确保设计的一致性：

- 数字 `n` 表示 `n*2px`
- 例如：`spacing-20` = 40px, `font-16` = 16px

### 响应式优先

所有工具类都考虑了响应式设计，提供移动端优先的体验。

### 开发友好

提供清晰的命名规则和丰富的变体，提高开发效率。

## 兼容性

- Tailwind CSS 3.0+
- TypeScript 4.0+
- Node.js 14+

## 许可证

MIT License
