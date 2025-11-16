# 脚本说明

## create-app.sh

基于 template 项目创建新应用的脚本。

### 使用方法

```bash
./scripts/create-app.sh <app-name>
```

### 示例

```bash
./scripts/create-app.sh my-new-app
```

### 功能

- 复制 template 项目到 apps 目录
- 更新 package.json 中的应用名称
- 清理缓存文件和依赖
- 更新根目录 package.json 添加新的 dev 脚本
- 自动安装依赖

### 注意事项

- 确保 apps/template 项目存在
- 新应用名称不能与现有应用重复
- 脚本会自动处理不同操作系统的 sed 命令差异
