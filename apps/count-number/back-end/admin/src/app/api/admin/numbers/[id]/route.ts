import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import {
  ApiResponse,
  STATUS_CODE,
  createSuccessResponse,
  createErrorResponse,
  getHttpStatusFromCode,
} from '@mono-repo/utils'

// GET /api/admin/numbers/[id] - 获取单个记录
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('numbers')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      const errorResponse = createErrorResponse(
        STATUS_CODE.BUSINESS_ERROR,
        '数据不存在',
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

// PUT /api/admin/numbers/[id] - 更新记录
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const updateData = body

    const { data, error } = await supabaseAdmin
      .from('numbers')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      const errorResponse = createErrorResponse(
        STATUS_CODE.BUSINESS_ERROR,
        '更新数据失败',
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

// DELETE /api/admin/numbers/[id] - 删除记录
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabaseAdmin
      .from('numbers')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Supabase error:', error)
      const errorResponse = createErrorResponse(
        STATUS_CODE.BUSINESS_ERROR,
        '删除数据失败',
        { error: error.message }
      )
      return NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
    }

    const successResponse = createSuccessResponse({
      id: parseInt(params.id, 10),
    })
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
