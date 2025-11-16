import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import {
  createErrorResponse,
  getHttpStatusFromCode,
  STATUS_CODE,
  createSuccessResponse,
} from '@mono-repo/utils'

// 定义注册请求体的 Schema
const registerSchema = z.object({
  email: z.string().email('无效的邮箱格式'),
  password: z.string().min(6, '密码至少需要6个字符'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = registerSchema.parse(body)

    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      const errorResponse = createErrorResponse(
        STATUS_CODE.CLIENT_ERROR,
        '用户已存在'
      )
      return NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
    }

    // 哈希密码
    const passwordHash = await hashPassword(password)

    // 创建用户
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
      select: { id: true, email: true, createdAt: true }, // 只返回部分信息，不返回密码哈希
    })

    const successResponse = createSuccessResponse(
      user,
      '注册成功',
      STATUS_CODE.SUCCESS
    )
    console.log(
      'Register API - successResponse before returning:',
      successResponse
    )
    return NextResponse.json(successResponse, { status: 200 }) // 直接使用 200 状态码
  } catch (error: any) {
    console.error('注册失败:', error)
    const errorResponse = createErrorResponse(
      STATUS_CODE.BUSINESS_ERROR,
      '注册失败',
      { error: error.message }
    )
    return NextResponse.json(errorResponse, {
      status: getHttpStatusFromCode(errorResponse.code),
    })
  }
}
