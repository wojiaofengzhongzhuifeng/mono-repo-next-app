#!/usr/bin/env node

// 简单的 Supabase 密钥检查脚本
const fs = require('fs')
const path = require('path')

console.log('=== Supabase 密钥配置检查 ===\n')

// 读取 .env.local 文件
const envPath = path.join(__dirname, 'back-end/admin/.env.local')
let envContent = ''

try {
  envContent = fs.readFileSync(envPath, 'utf8')
  console.log('✅ 成功读取 .env.local 文件')
} catch (error) {
  console.log('❌ 无法读取 .env.local 文件:', error.message)
  process.exit(1)
}

// 解析环境变量
const envVars = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match && !line.startsWith('#')) {
    envVars[match[1]] = match[2]
  }
})

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY

console.log('\n=== 当前配置 ===')
console.log('Supabase URL:', supabaseUrl)
console.log('Anon Key 存在:', !!supabaseAnonKey)
console.log('Service Role Key 存在:', !!supabaseServiceRoleKey)

if (supabaseAnonKey) {
  console.log('\n=== Anon Key 分析 ===')
  console.log('前缀:', supabaseAnonKey.substring(0, 30) + '...')
  console.log('长度:', supabaseAnonKey.length)

  // 检查密钥特征
  const hasServiceInKey = supabaseAnonKey.toLowerCase().includes('service')
  const hasAdminInKey = supabaseAnonKey.toLowerCase().includes('admin')
  const isLongKey = supabaseAnonKey.length > 200

  console.log('包含 "service":', hasServiceInKey)
  console.log('包含 "admin":', hasAdminInKey)
  console.log('长密钥 (>200字符):', isLongKey)

  const isLikelyServiceKey = hasServiceInKey || hasAdminInKey || isLongKey
  console.log('疑似 Service Role Key:', isLikelyServiceKey)
}

if (supabaseServiceRoleKey) {
  console.log('\n=== Service Role Key 分析 ===')
  console.log('前缀:', supabaseServiceRoleKey.substring(0, 30) + '...')
  console.log('长度:', supabaseServiceRoleKey.length)

  const hasServiceInKey = supabaseServiceRoleKey
    .toLowerCase()
    .includes('service')
  const hasAdminInKey = supabaseServiceRoleKey.toLowerCase().includes('admin')
  const isLongKey = supabaseServiceRoleKey.length > 200

  console.log('包含 "service":', hasServiceInKey)
  console.log('包含 "admin":', hasAdminInKey)
  console.log('长密钥 (>200字符):', isLongKey)

  const isLikelyServiceKey = hasServiceInKey || hasAdminInKey || isLongKey
  console.log('疑似 Service Role Key:', isLikelyServiceKey)

  console.log('与 Anon Key 相同:', supabaseServiceRoleKey === supabaseAnonKey)
}

console.log('\n=== 问题诊断 ===')
if (!supabaseServiceRoleKey) {
  console.log('❌ 缺少 SUPABASE_SERVICE_ROLE_KEY')
} else if (supabaseServiceRoleKey === supabaseAnonKey) {
  console.log(
    '❌ Service Role Key 与 Anon Key 相同，需要设置正确的 Service Role Key'
  )
} else {
  const serviceKeyHasService = supabaseServiceRoleKey
    .toLowerCase()
    .includes('service')
  const serviceKeyHasAdmin = supabaseServiceRoleKey
    .toLowerCase()
    .includes('admin')
  const serviceKeyIsLong = supabaseServiceRoleKey.length > 200

  if (!serviceKeyHasService && !serviceKeyHasAdmin && !serviceKeyIsLong) {
    console.log('❌ Service Role Key 看起来像是 Anon Key，可能设置错误')
  } else {
    console.log('✅ Service Role Key 配置看起来正确')
  }
}

console.log('\n=== 解决方案 ===')
console.log('1. 访问 Supabase Dashboard: https://app.supabase.com')
console.log('2. 选择项目: hntkigjaidhhdqoyclgy')
console.log('3. 进入: Settings → API')
console.log('4. 在 "Project API keys" 部分找到 "service_role" 密钥')
console.log('5. 复制该密钥（通常以 "eyJ..." 开头，且比较长）')
console.log('6. 更新 .env.local 文件中的 SUPABASE_SERVICE_ROLE_KEY')
console.log('7. 重启开发服务器')
