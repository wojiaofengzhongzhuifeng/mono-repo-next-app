#!/usr/bin/env node

// 检查 Supabase 密钥类型的脚本
const { createClient } = require('@supabase/supabase-js')

// 从环境变量读取配置
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hntkigjaidhhdqoyclgy.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('=== Supabase 密钥检查 ===\n')

console.log('Supabase URL:', supabaseUrl)
console.log('Anon Key 存在:', !!supabaseAnonKey)
console.log('Service Role Key 存在:', !!supabaseServiceRoleKey)

if (supabaseAnonKey) {
  console.log('\n=== Anon Key 分析 ===')
  console.log('前缀:', supabaseAnonKey.substring(0, 20) + '...')

  // 检查是否是 service role key
  const isServiceKey =
    supabaseAnonKey.includes('service') ||
    (supabaseAnonKey.length > 200 && supabaseAnonKey.includes('admin'))

  console.log('密钥类型:', isServiceKey ? 'Service Role Key' : 'Anon Key')
}

if (supabaseServiceRoleKey) {
  console.log('\n=== Service Role Key 分析 ===')
  console.log('前缀:', supabaseServiceRoleKey.substring(0, 20) + '...')

  const isServiceKey =
    supabaseServiceRoleKey.includes('service') ||
    (supabaseServiceRoleKey.length > 200 &&
      supabaseServiceRoleKey.includes('admin'))

  console.log('密钥类型:', isServiceKey ? 'Service Role Key' : 'Anon Key')
  console.log('与 Anon Key 相同:', supabaseServiceRoleKey === supabaseAnonKey)
}

console.log('\n=== 建议操作 ===')
if (!supabaseServiceRoleKey || supabaseServiceRoleKey === supabaseAnonKey) {
  console.log('❌ 需要设置正确的 Service Role Key')
  console.log('\n请按以下步骤操作：')
  console.log('1. 访问 https://app.supabase.com')
  console.log('2. 选择项目 hntkigjaidhhdqoyclgy')
  console.log('3. 进入 Settings → API')
  console.log('4. 复制 service_role 密钥')
  console.log('5. 更新 .env.local 文件中的 SUPABASE_SERVICE_ROLE_KEY')
} else {
  console.log('✅ Service Role Key 已正确设置')
}
