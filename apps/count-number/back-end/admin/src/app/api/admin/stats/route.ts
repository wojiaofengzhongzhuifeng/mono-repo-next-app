import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import {
  ApiResponse,
  STATUS_CODE,
  createSuccessResponse,
  createErrorResponse,
  getHttpStatusFromCode,
} from '@mono-repo/utils'

// GET /api/admin/stats - 获取统计信息
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from('numbers').select('*')

    if (error) {
      console.error('Supabase error:', error)
      const errorResponse = createErrorResponse(
        STATUS_CODE.BUSINESS_ERROR,
        '获取统计数据失败',
        { error: error.message }
      )
      return NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
    }

    const totalCount = data?.length || 0
    const activeCount =
      data?.filter(item => item.status === 'active').length || 0
    const inactiveCount =
      data?.filter(item => item.status === 'inactive').length || 0

    const stats = {
      totalCount,
      activeCount,
      inactiveCount,
    }

    const successResponse = createSuccessResponse(stats)
    return NextResponse.json(successResponse, {
      status: getHttpStatusFromCode(successResponse.code),
    })
  } catch (error: any) {
    console.error('API error:', error)
    const errorResponse = createErrorResponse(
      STATUS_CODE.BUSINESS_ERROR,
      '系统内部错误',
      { error: error.message }
    )
    return NextResponse.json(errorResponse, {
      status: getHttpStatusFromCode(errorResponse.code),
    })
  }
}
