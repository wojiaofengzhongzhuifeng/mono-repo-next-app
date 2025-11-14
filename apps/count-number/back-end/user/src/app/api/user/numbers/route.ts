import { NextRequest, NextResponse } from 'next/server'
import {
  createErrorResponse,
  createSuccessResponse,
  STATUS_CODE,
  getHttpStatusFromCode,
} from '@mono-repo/utils'
import prisma from '@/lib/prisma'
import { authenticate } from '@/lib/auth-middleware'
import { z } from 'zod'

// 定义请求的类型（如果 POST 请求需要的话）
const CreateNumberRequestSchema = z.object({
  value: z.number(),
  label: z.string().min(1, 'Label is required'),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive', 'archived']).default('active'),
  isPublic: z.boolean().default(false),
})

export async function GET(request: NextRequest): Promise<NextResponse<any>> {
  // 1. 认证用户
  const authResult = await authenticate(request)
  if (authResult) {
    return authResult // 如果认证失败，直接返回错误响应
  }

  // 从认证结果中获取 userId
  const userId = (request as any).userId

  if (!userId) {
    return NextResponse.json(
      createErrorResponse(STATUS_CODE.UNAUTHORIZED, '用户ID不可用'),
      { status: 401 }
    )
  }

  try {
    const userNumbers = await prisma.numberItem.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: { id: true, email: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const successResponse = createSuccessResponse(
      userNumbers,
      '成功获取用户数字',
      STATUS_CODE.SUCCESS
    )
    return NextResponse.json(successResponse, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching user numbers:', error)
    const errorResponse = createErrorResponse(
      STATUS_CODE.SERVER_ERROR,
      error.message || '获取用户数字失败'
    )
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// POST /api/user/numbers - 创建新记录
export async function POST(request: NextRequest): Promise<NextResponse<any>> {
  // 1. 认证用户
  const authResult = await authenticate(request)
  if (authResult) {
    return authResult // 如果认证失败，直接返回错误响应
  }

  // 从认证结果中获取 userId
  const userId = (request as any).userId

  if (!userId) {
    return NextResponse.json(
      createErrorResponse(STATUS_CODE.UNAUTHORIZED, '用户ID不可用'),
      { status: 401 }
    )
  }

  try {
    // 2. 解析并验证请求体
    const body = await request.json()
    const validatedBody = CreateNumberRequestSchema.parse(body)
    const { value, label, description, status, isPublic } = validatedBody

    // 3. 使用 Prisma 创建新的 NumberItem
    const newNumber = await prisma.numberItem.create({
      data: {
        value,
        label,
        description,
        status,
        isPublic,
        userId,
      },
      include: {
        user: {
          select: { id: true, email: true },
        },
      },
    })

    const successResponse = createSuccessResponse(
      newNumber,
      '成功创建用户数字',
      STATUS_CODE.SUCCESS
    )
    return NextResponse.json(successResponse, { status: 200 })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.issues)
      const errorResponse = createErrorResponse(
        STATUS_CODE.CLIENT_ERROR,
        '请求数据验证失败',
        error.issues
      )
      return NextResponse.json(errorResponse, { status: 400 })
    }

    console.error('Error creating user number:', error)
    const errorResponse = createErrorResponse(
      STATUS_CODE.SERVER_ERROR,
      error.message || '创建用户数字失败'
    )
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
