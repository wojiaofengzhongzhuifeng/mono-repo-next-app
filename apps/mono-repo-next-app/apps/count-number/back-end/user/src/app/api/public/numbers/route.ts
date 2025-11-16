import { NextRequest, NextResponse } from 'next/server'
import {
  createErrorResponse,
  createSuccessResponse,
  STATUS_CODE,
} from '@mono-repo/utils'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const publicNumbers = await prisma.numberItem.findMany({
      where: {
        isPublic: true,
      },
      include: {
        user: {
          select: { id: true, email: true },
        },
      },
    })

    const successResponse = createSuccessResponse(
      publicNumbers,
      '成功获取公共数字',
      STATUS_CODE.SUCCESS
    )
    return NextResponse.json(successResponse, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching public numbers:', error)
    const errorResponse = createErrorResponse(
      STATUS_CODE.SERVER_ERROR,
      error.message || '获取公共数字失败'
    )
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
