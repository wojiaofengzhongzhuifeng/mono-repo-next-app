#!/usr/bin/env node

console.log('🚀 启动 AI Icon Generator 代理服务器...\n')

const { spawn } = require('child_process')
const path = require('path')

// 启动代理服务器
const proxyServer = spawn('node', [path.join(__dirname, 'proxy-server.js')], {
  stdio: 'inherit',
  shell: true,
})

proxyServer.on('error', error => {
  console.error('❌ 启动代理服务器失败:', error)
  process.exit(1)
})

proxyServer.on('close', code => {
  console.log(`\n代理服务器已停止 (退出码: ${code})`)
})

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n正在关闭代理服务器...')
  proxyServer.kill('SIGINT')
})

process.on('SIGTERM', () => {
  console.log('\n正在关闭代理服务器...')
  proxyServer.kill('SIGTERM')
})
