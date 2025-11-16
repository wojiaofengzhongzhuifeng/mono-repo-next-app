# Gemini API 网络问题解决方案

本项目已集成 Google Gemini API，并提供了多种网络连接方案来解决网络访问问题。

## 🌟 功能特性

- ✅ **智能重试机制**: 自动重试失败的请求
- ✅ **多连接方式**: 代理服务器 + 直连 + 备用方案
- ✅ **错误处理**: 详细的错误信息和恢复建议
- ✅ **超时控制**: 防止长时间等待
- ✅ **备用方案**: 图像生成失败时提供文本描述

## 🚀 快速开始

### 1. 配置 API 密钥

编辑 `.env.local` 文件，添加您的 Gemini API 密钥：

```bash
# 获取地址：https://aistudio.google.com/
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 2. 启动代理服务器（推荐）

```bash
# 方式1: 使用启动脚本
node start-proxy.js

# 方式2: 直接启动
node proxy-server.js
```

### 3. 启动主应用

```bash
npm run dev
```

## 🔧 网络连接方案

### 方案一：代理服务器（推荐）

适用于网络环境受限的情况：

```bash
# 1. 启动代理服务器
node start-proxy.js

# 2. 确认 .env.local 配置
PROXY_URL=http://localhost:3001/google-api/v1beta/models/imagen-3.0-generate-001:generateImage
```

### 方案二：直连

适用于网络良好的情况：

```bash
# 在 .env.local 中设置
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImage
```

### 方案三：自动选择

系统会自动按以下顺序尝试：

1. 代理服务器
2. 直连API
3. 文本描述备用方案

## 🛠️ 故障排除

### 检查代理服务器状态

```bash
curl http://localhost:3001/health
```

### 测试网络连接

```bash
curl -X POST http://localhost:3001/test-connection
```

### 常见错误解决

1. **ECONNREFUSED**: 检查代理服务器是否启动
2. **ETIMEDOUT**: 增加超时时间或检查网络
3. **ENOTFOUND**: 检查DNS设置或使用代理

## 📝 API 使用示例

```javascript
// 前端调用示例
const response = await fetch('/api/generate-icon', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'a cute cat',
    style: 'minimalist',
    size: 'medium',
    color: 'blue',
  }),
})

const result = await response.json()
console.log(result)
```

## 🔍 监控和日志

代理服务器提供详细的日志：

- 🔄 请求转发日志
- ✅ 成功响应日志
- ❌ 错误详细信息
- 📊 性能指标

访问 `http://localhost:3001/health` 查看服务状态。

## 🆘 获取帮助

1. 检查控制台日志输出
2. 访问代理服务器健康检查端点
3. 确认 API 密钥配置正确
4. 尝试不同的网络连接方案

---

**注意**: 请确保您有有效的 Gemini API 密钥，并遵守相关的使用条款。
