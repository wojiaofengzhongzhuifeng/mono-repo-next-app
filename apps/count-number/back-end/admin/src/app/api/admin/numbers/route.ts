import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { handleCORS, addCORSHeaders } from '@/lib/cors'
import {
  ApiResponse,
  STATUS_CODE,
  createSuccessResponse,
  createErrorResponse,
  getHttpStatusFromCode,
} from '@mono-repo/utils'

// GET /api/admin/numbers - 获取所有记录
export async function GET(request: NextRequest) {
  // 处理 CORS 预检请求
  const corsResponse = handleCORS(request)
  if (corsResponse) return corsResponse

  try {
    const { data, error } = await supabaseAdmin
      .from('numbers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      const errorResponse = createErrorResponse(
        STATUS_CODE.BUSINESS_ERROR,
        '获取数据失败',
        { error: error.message }
      )
      const response = NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
      return addCORSHeaders(response)
    }

    const successResponse = createSuccessResponse(data || [])
    const response = NextResponse.json(successResponse, {
      status: getHttpStatusFromCode(successResponse.code),
    })
    return addCORSHeaders(response)
  } catch (error: any) {
    console.error('API error:', error)
    const errorResponse = createErrorResponse(
      STATUS_CODE.BUSINESS_ERROR,
      '系统内部错误',
      { error: error.message }
    )
    const response = NextResponse.json(errorResponse, {
      status: getHttpStatusFromCode(errorResponse.code),
    })
    return addCORSHeaders(response)
  }
}

// POST /api/admin/numbers - 创建新记录
export async function POST(request: NextRequest) {
  // 处理 CORS 预检请求
  const corsResponse = handleCORS(request)
  if (corsResponse) return corsResponse

  try {
    const body = await request.json()
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
      const response = NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
      return addCORSHeaders(response)
    }

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
      const response = NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
      return addCORSHeaders(response)
    }

    const successResponse = createSuccessResponse(data)
    const response = NextResponse.json(successResponse, {
      status: getHttpStatusFromCode(successResponse.code),
    })
    return addCORSHeaders(response)
  } catch (error: any) {
    console.error('API error:', error)
    const errorResponse = createErrorResponse(
      STATUS_CODE.BUSINESS_ERROR,
      '系统内部错误',
      { error: error.message }
    )
    const response = NextResponse.json(errorResponse, {
      status: getHttpStatusFromCode(errorResponse.code),
    })
    return addCORSHeaders(response)
  }
}
