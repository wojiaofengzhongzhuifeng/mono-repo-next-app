import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { NumberItem, CreateNumberRequest } from '@count-number-types'
import {
  ApiResponse,
  STATUS_CODE,
  createSuccessResponse,
  createErrorResponse,
  getHttpStatusFromCode,
} from '@mono-repo/utils'

// GET /api/user/numbers - 获取所有活跃记录
export async function GET(): Promise<NextResponse<ApiResponse<NumberItem[]>>> {
  try {
    const { data, error } = await supabase
      .from('numbers')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      const errorResponse = createErrorResponse(
        STATUS_CODE.BUSINESS_ERROR,
        '获取数据失败',
        { error: error.message }
      )
      return NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
    }

    const successResponse = createSuccessResponse(data || [])
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

// POST /api/user/numbers - 创建新记录
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<NumberItem>>> {
  try {
    const body: CreateNumberRequest = await request.json()
    const { value, label, description, status } = body

    if (!value || !label) {
      const missingFields: string[] = []
      if (!value) missingFields.push('value')
      if (!label) missingFields.push('label')
      const errorResponse = createErrorResponse(
        STATUS_CODE.CLIENT_ERROR,
        '请求数据出错：缺少必填字段 value 或 label',
        { missingFields }
      )
      return NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
    }

    // 使用 supabaseAdmin 绕过 RLS，因为这是服务端 API
    const { data, error } = await supabaseAdmin
      .from('numbers')
      .insert([
        {
          value,
          label,
          description,
          status: status || 'active',
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      const errorResponse = createErrorResponse(
        STATUS_CODE.BUSINESS_ERROR,
        '创建数据失败',
        { error: error.message }
      )
      return NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
    }

    const successResponse = createSuccessResponse(data)
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
