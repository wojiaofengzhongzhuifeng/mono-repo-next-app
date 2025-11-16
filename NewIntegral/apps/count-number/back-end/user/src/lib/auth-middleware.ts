import { NextRequest, NextResponse } from 'next/server'
import { verifyAuthToken } from './auth'
import { createErrorResponse, STATUS_CODE } from '@mono-repo/utils'

interface AuthenticatedRequest extends NextRequest {
  userId?: string
  userEmail?: string
}

export async function authenticate(req: AuthenticatedRequest) {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.split(' ')[1]

  if (!token) {
    return NextResponse.json(
      createErrorResponse(STATUS_CODE.UNAUTHORIZED, '未提供认证令牌'),
      { status: 401 }
    )
  }

  try {
    const decoded = verifyAuthToken(token)
    if (!decoded) {
      return NextResponse.json(
        createErrorResponse(STATUS_CODE.FORBIDDEN, '无效或过期的认证令牌'),
        { status: 403 }
      )
    }
    req.userId = decoded.userId
    req.userEmail = decoded.email
    return null // 表示认证成功，继续处理请求
  } catch (error: any) {
    console.error('Error during authentication:', error)
    return NextResponse.json(
      createErrorResponse(STATUS_CODE.UNAUTHORIZED, '认证失败'),
      { status: 401 }
    )
  }
}
