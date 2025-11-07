import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey

// 公开客户端 - 用于基本操作
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 服务端客户端 - 用于管理端操作（完全权限）
// 如果没有 Service Role Key，则使用 Anon Key（功能受限）
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
