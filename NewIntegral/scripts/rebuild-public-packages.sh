#!/bin/bash

set -e # 任何命令失败都立即退出

# 1. 清理 apps/count-number/back-end/user 的构建缓存
echo "清理 apps/count-number/back-end/user 的构建缓存..."
cd /Users/raojiajun/Desktop/project/monorepo-next-app-latest/apps/count-number/back-end/user
rm -rf .next .turbo out

# 2. 清理并重新构建 packages/utils
echo "清理并重新构建 packages/utils..."
cd /Users/raojiajun/Desktop/project/monorepo-next-app-latest/packages/utils
rm -rf dist # 先清理旧的编译输出目录
pnpm build

# 3. 返回到项目根目录，并重新安装所有依赖
echo "返回到项目根目录，并重新安装所有依赖..."
cd /Users/raojiajun/Desktop/project/monorepo-next-app-latest
pnpm install

echo "公共包重新构建和依赖安装完成。请启动后端服务进行测试。"
