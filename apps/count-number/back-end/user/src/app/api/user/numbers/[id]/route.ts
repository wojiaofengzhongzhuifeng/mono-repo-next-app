import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import {
  ApiResponse,
  NumberItem,
  UpdateNumberRequest,
} from '@count-number-types'

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
      return NextResponse.json(
        { success: false, error: 'Number not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

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
      return NextResponse.json(
        { success: false, error: 'At least one field is required for update' },
        { status: 400 }
      )
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
      return NextResponse.json(
        { success: false, error: 'Failed to update number' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Number not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Number updated successfully',
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<NumberItem>>> {
  // PATCH 和 PUT 使用相同的逻辑
  return PUT(request, { params })
}

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
      return NextResponse.json(
        { success: false, error: 'Number not found' },
        { status: 404 }
      )
    }

    // 执行删除（物理删除）
    const { error } = await supabase
      .from('numbers')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to delete number' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { id: parseInt(params.id, 10) },
      message: 'Number deleted successfully',
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
