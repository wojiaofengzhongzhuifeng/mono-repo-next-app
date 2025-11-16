const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')
const http = require('http')
const https = require('https')

const app = express()
const PORT = 3001

// 启用CORS和JSON解析
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// 请求日志中间件
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Google Gemini API代理 - 增强版
const geminiProxy = createProxyMiddleware({
  target: 'https://generativelanguage.googleapis.com',
  changeOrigin: true,
  pathRewrite: {
    '^/google-api': '',
  },
  timeout: 120000, // 2分钟超时
  proxyTimeout: 120000,

  // 请求处理
  onProxyReq: (proxyReq, req, res) => {
    console.log(`🔄 代理请求: ${req.method} ${req.url}`)

    // 添加请求头
    proxyReq.setHeader('User-Agent', 'AI-Icon-Generator-Proxy/1.0')
    proxyReq.setHeader('Accept', 'application/json')
    proxyReq.setHeader('Accept-Encoding', 'gzip, deflate, br')

    // 记录请求体大小（用于调试）
    if (req.body && Object.keys(req.body).length > 0) {
      console.log(`📤 请求数据大小: ${JSON.stringify(req.body).length} 字符`)
    }
  },

  // 响应处理
  onProxyRes: (proxyRes, req, res) => {
    console.log(`✅ 代理响应: ${proxyRes.statusCode} ${req.url}`)

    // 添加响应头
    proxyRes.headers['Access-Control-Allow-Origin'] = '*'
    proxyRes.headers['Access-Control-Allow-Methods'] =
      'GET, POST, PUT, DELETE, OPTIONS'
    proxyRes.headers['Access-Control-Allow-Headers'] =
      'Content-Type, Authorization'

    let responseData = ''

    proxyRes.on('data', chunk => {
      responseData += chunk
    })

    proxyRes.on('end', () => {
      try {
        if (responseData) {
          const jsonData = JSON.parse(responseData)
          console.log(`📥 响应数据大小: ${responseData.length} 字符`)

          // 检查是否有错误
          if (jsonData.error) {
            console.error('❌ API返回错误:', jsonData.error)
          }
        }
      } catch (e) {
        console.log('📥 响应数据 (非JSON):', responseData.length, '字符')
      }
    })
  },

  // 错误处理
  onError: (err, req, res) => {
    console.error('❌ 代理错误:', err.message)
    console.error('错误详情:', {
      code: err.code,
      errno: err.errno,
      syscall: err.syscall,
      address: err.address,
      port: err.port,
    })

    // 根据错误类型返回不同的响应
    let errorMessage = '代理服务器错误'
    let statusCode = 500

    if (err.code === 'ECONNREFUSED') {
      errorMessage = '无法连接到目标服务器，请检查网络连接'
      statusCode = 503
    } else if (err.code === 'ETIMEDOUT') {
      errorMessage = '请求超时，请稍后重试'
      statusCode = 504
    } else if (err.code === 'ENOTFOUND') {
      errorMessage = '域名解析失败，请检查网络设置'
      statusCode = 503
    }

    // 如果响应还未发送，发送错误响应
    if (!res.headersSent) {
      res.status(statusCode).json({
        success: false,
        error: errorMessage,
        details: err.message,
        code: err.code,
        timestamp: new Date().toISOString(),
      })
    }
  },
})

// 应用代理中间件
app.use('/google-api', geminiProxy)

// 健康检查端点 - 增强版
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Proxy server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: '1.0.0',
  })
})

// 测试连接端点
app.post('/test-connection', async (req, res) => {
  try {
    const testUrl = 'https://generativelanguage.googleapis.com/v1beta/models'

    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      timeout: 10000,
    })

    if (response.ok) {
      res.json({
        success: true,
        message: '连接到Google API成功',
        status: response.status,
      })
    } else {
      res.status(response.status).json({
        success: false,
        message: '连接到Google API失败',
        status: response.status,
        statusText: response.statusText,
      })
    }
  } catch (error) {
    console.error('测试连接失败:', error)
    res.status(500).json({
      success: false,
      message: '测试连接失败',
      error: error.message,
    })
  }
})

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('❌ 服务器错误:', err)
  res.status(500).json({
    success: false,
    error: '服务器内部错误',
    message: err.message,
    timestamp: new Date().toISOString(),
  })
})

// 404处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: '端点未找到',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  })
})

// 启动服务器
const server = app.listen(PORT, () => {
  console.log(`🚀 增强版代理服务器启动成功!`)
  console.log(`📡 服务地址: http://localhost:${PORT}`)
  console.log(`🔗 Google API代理: http://localhost:${PORT}/google-api`)
  console.log(`❤️  健康检查: http://localhost:${PORT}/health`)
  console.log(`🧪 连接测试: http://localhost:${PORT}/test-connection`)
  console.log(`\n💡 在 .env.local 中设置:`)
  console.log(
    `PROXY_URL=http://localhost:${PORT}/google-api/v1beta/models/imagen-3.0-generate-001:generateImage`
  )
})

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到SIGTERM信号，正在关闭服务器...')
  server.close(() => {
    console.log('服务器已关闭')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('收到SIGINT信号，正在关闭服务器...')
  server.close(() => {
    console.log('服务器已关闭')
    process.exit(0)
  })
})

module.exports = app
