import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { comparePassword, generateAuthToken } from '@/lib/auth'
import {
  createErrorResponse,
  getHttpStatusFromCode,
  STATUS_CODE,
  createSuccessResponse,
} from '@mono-repo/utils'

// 定义登录请求体的 Schema
const loginSchema = z.object({
  email: z.string().email('无效的邮箱格式'),
  password: z.string().min(6, '密码至少需要6个字符'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = loginSchema.parse(body)

    // 查找用户
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      const errorResponse = createErrorResponse(
        STATUS_CODE.CLIENT_ERROR,
        '邮箱或密码不正确'
      )
      return NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
    }

    // 比较密码
    const passwordValid = await comparePassword(password, user.passwordHash)
    if (!passwordValid) {
      const errorResponse = createErrorResponse(
        STATUS_CODE.CLIENT_ERROR,
        '邮箱或密码不正确'
      )
      return NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
    }

    // 生成 JWT Token
    const token = generateAuthToken(user.id, user.email)

    const successResponse = createSuccessResponse(
      { token, user: { id: user.id, email: user.email } },
      '登录成功',
      STATUS_CODE.SUCCESS
    )
    console.log(
      'Login API - successResponse before returning:',
      successResponse
    )
    return NextResponse.json(successResponse, { status: 200 }) // 直接使用 200 状态码
  } catch (error: any) {
    console.error('登录失败:', error)
    const errorResponse = createErrorResponse(
      STATUS_CODE.BUSINESS_ERROR,
      '登录失败',
      { error: error.message }
    )
    return NextResponse.json(errorResponse, {
      status: getHttpStatusFromCode(errorResponse.code),
    })
  }
}
