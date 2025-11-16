import { NextRequest, NextResponse } from 'next/server'

// CORS 配置
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400', // 24 hours
}

// 处理 OPTIONS 请求（预检请求）
export function handleCORS(request: NextRequest): NextResponse | null {
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: CORS_HEADERS })
  }
  return null
}

// 添加 CORS 头到响应
export function addCORSHeaders(response: NextResponse): NextResponse {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}
