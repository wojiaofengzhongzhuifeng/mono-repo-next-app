#!/bin/bash

# 新项目创建脚本
# 使用方法: ./scripts/create-app.sh <app-name>

set -e

# 检查参数
if [ $# -eq 0 ]; then
    echo "❌ 错误: 请提供新应用的名称"
    echo "使用方法: ./scripts/create-app.sh <app-name>"
    echo "示例: ./scripts/create-app.sh my-new-app"
    exit 1
fi

APP_NAME=$1
APP_DIR="apps/$APP_NAME"
TEMPLATE_DIR="apps/template"

# 检查 template 项目是否存在
if [ ! -d "$TEMPLATE_DIR" ]; then
    echo "❌ 错误: template 项目不存在 ($TEMPLATE_DIR)"
    exit 1
fi

# 检查新应用是否已存在
if [ -d "$APP_DIR" ]; then
    echo "❌ 错误: 应用 '$APP_NAME' 已存在 ($APP_DIR)"
    exit 1
fi

echo "🚀 开始创建新应用: $APP_NAME"

# 复制 template 项目
echo "📁 复制 template 项目..."
cp -r "$TEMPLATE_DIR" "$APP_DIR"

# 进入应用目录
cd "$APP_DIR"

# 更新 package.json
echo "📦 更新 package.json..."
# 使用 sed 替换项目名称
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/template/$APP_NAME/g" package.json
else
    # Linux
    sed -i "s/template/$APP_NAME/g" package.json
fi

# 更新 next.config.mjs 中的应用名称（如果存在）
if [ -f "next.config.mjs" ]; then
    echo "⚙️ 更新 next.config.mjs..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/template/$APP_NAME/g" next.config.mjs
    else
        sed -i "s/template/$APP_NAME/g" next.config.mjs
    fi
fi

# 清理可能的缓存和构建文件
echo "🧹 清理缓存文件..."
rm -rf .next
rm -rf node_modules
rm -f .env.local

# 返回根目录
cd ../..

# 更新根目录的 package.json，添加新的 dev 脚本
echo "📝 更新根目录 package.json..."
if ! grep -q "dev:$APP_NAME" package.json; then
    # 使用 Node.js 来安全地更新 package.json
    node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    pkg.scripts['dev:$APP_NAME'] = 'cd apps/$APP_NAME && pnpm dev';
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
    "
fi

# 安装依赖
echo "📦 安装依赖..."
pnpm install

echo ""
echo "✅ 新应用 '$APP_NAME' 创建成功!"
echo ""
echo "📋 接下来的步骤:"
echo "   1. cd apps/$APP_NAME"
echo "   2. 根据需要修改配置和代码"
echo "   3. 运行 'pnpm dev' 启动开发服务器"
echo ""
echo "🚀 或者在根目录运行 'pnpm dev:$APP_NAME' 启动应用"
echo ""