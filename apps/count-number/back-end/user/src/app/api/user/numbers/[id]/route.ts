import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { NumberItem, UpdateNumberRequest } from '@count-number-types'
import {
  ApiResponse,
  STATUS_CODE,
  createSuccessResponse,
  createErrorResponse,
  getHttpStatusFromCode,
} from '@mono-repo/utils'

// GET /api/user/numbers/[id] - 获取单个活跃记录
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<NumberItem>>> {
  try {
    const { data, error } = await supabase
      .from('numbers')
      .select('*')
      .eq('id', params.id)
      .eq('status', 'active')
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

// PUT /api/user/numbers/[id] - 更新记录
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<NumberItem>>> {
  try {
    const body: UpdateNumberRequest = await request.json()
    const { value, label, description, status } = body

    // 构建更新对象，只包含提供的字段
    const updateData: Partial<UpdateNumberRequest> = {}
    if (value !== undefined) updateData.value = value
    if (label !== undefined) updateData.label = label
    if (description !== undefined) updateData.description = description
    if (status !== undefined) updateData.status = status

    // 如果没有提供任何更新字段
    if (Object.keys(updateData).length === 0) {
      const errorResponse = createErrorResponse(
        STATUS_CODE.CLIENT_ERROR,
        '请求数据出错：至少需要提供一个更新字段',
        { requiredFields: ['value', 'label', 'description', 'status'] }
      )
      return NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
    }

    const { data, error } = await supabase
      .from('numbers')
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
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

    if (!data) {
      const errorResponse = createErrorResponse(
        STATUS_CODE.BUSINESS_ERROR,
        '数据不存在',
        { id: params.id }
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

// PATCH /api/user/numbers/[id] - 更新记录（与 PUT 相同）
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<NumberItem>>> {
  // PATCH 和 PUT 使用相同的逻辑
  return PUT(request, { params })
}

// DELETE /api/user/numbers/[id] - 删除记录
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<{ id: number }>>> {
  try {
    // 先检查记录是否存在
    const { data: existingData, error: fetchError } = await supabase
      .from('numbers')
      .select('id')
      .eq('id', params.id)
      .single()

    if (fetchError || !existingData) {
      const errorResponse = createErrorResponse(
        STATUS_CODE.BUSINESS_ERROR,
        '数据不存在',
        { id: params.id }
      )
      return NextResponse.json(errorResponse, {
        status: getHttpStatusFromCode(errorResponse.code),
      })
    }

    // 执行删除（物理删除）
    const { error } = await supabase
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
