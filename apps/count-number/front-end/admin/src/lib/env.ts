// 环境变量验证和配置
interface EnvConfig {
  NEXT_PUBLIC_API_URL: string
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  NODE_ENV?: string
}

// 获取环境变量
export const getEnv = (): EnvConfig => {
  const env = {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
  }

  // 验证必需的环境变量
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ]
  const missingVars = requiredVars.filter(
    varName => !env[varName as keyof EnvConfig]
  )

  if (missingVars.length > 0) {
    console.error(`❌ 缺少必需的环境变量: ${missingVars.join(', ')}`)
    console.error('请检查 .env.local 文件或 Vercel 环境变量配置')
  }

  // 验证 URL 格式
  if (env.NEXT_PUBLIC_API_URL && !isValidUrl(env.NEXT_PUBLIC_API_URL)) {
    console.error('❌ NEXT_PUBLIC_API_URL 格式不正确:', env.NEXT_PUBLIC_API_URL)
  }

  if (
    env.NEXT_PUBLIC_SUPABASE_URL &&
    !isValidUrl(env.NEXT_PUBLIC_SUPABASE_URL)
  ) {
    console.error(
      '❌ NEXT_PUBLIC_SUPABASE_URL 格式不正确:',
      env.NEXT_PUBLIC_SUPABASE_URL
    )
  }

  return env
}

// URL 格式验证
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// 开发环境下的环境变量信息
export const printEnvInfo = (): void => {
  const env = getEnv()

  console.log('🌍 环境配置:')
  console.log(`   API URL: ${env.NEXT_PUBLIC_API_URL}`)
  console.log(`   Supabase URL: ${env.NEXT_PUBLIC_SUPABASE_URL}`)
  console.log(`   环境: ${env.NODE_ENV}`)

  if (env.NEXT_PUBLIC_API_URL?.includes('localhost')) {
    console.log('   ⚠️  正在使用本地 API，请确保后端服务正在运行')
  }
}
