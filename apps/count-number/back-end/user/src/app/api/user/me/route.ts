import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuthToken } from '@/lib/auth'
import {
  createErrorResponse,
  getHttpStatusFromCode,
  STATUS_CODE,
  createSuccessResponse,
} from '@mono-repo/utils'

export async function GET(req: NextRequest) {
  try {
    // 从请求头获取 Authorization token
    const authorizationHeader = req.headers.get('authorization')
    if (!authorizationHeader) {
      const errorResponse = createErrorResponse(
        STATUS_CODE.UNAUTHORIZED,
        '未授权：缺少Token'
      )
      return NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
    }

    const token = authorizationHeader.split(' ')[1] // 期望格式: Bearer <token>
    if (!token) {
      const errorResponse = createErrorResponse(
        STATUS_CODE.UNAUTHORIZED,
        '未授权：Token格式错误'
      )
      return NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
    }

    // 验证 Token
    const decodedToken = verifyAuthToken(token)
    if (!decodedToken) {
      const errorResponse = createErrorResponse(
        STATUS_CODE.UNAUTHORIZED,
        '未授权：无效或过期的Token'
      )
      return NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
    }

    // 根据 userId 获取用户信息
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
      select: { id: true, email: true, createdAt: true },
    })

    if (!user) {
      const errorResponse = createErrorResponse(
        STATUS_CODE.NOT_FOUND,
        '用户不存在'
      )
      return NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
    }

    const successResponse = createSuccessResponse(user, '获取用户信息成功')
    return NextResponse.json(successResponse, {
      status: getHttpStatusFromCode(successResponse.code),
    })
  } catch (error: any) {
    console.error('获取用户信息失败:', error)
    const errorResponse = createErrorResponse(
      STATUS_CODE.BUSINESS_ERROR,
      '获取用户信息失败',
      { error: error.message }
    )
    return NextResponse.json(errorResponse, {
      status: getHttpStatusFromCode(errorResponse.code),
    })
  }
}
