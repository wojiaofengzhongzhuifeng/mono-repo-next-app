import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { ApiResponse, NumberItem, UpdateNumberRequest } from '@/types/number'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<NumberItem>>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('numbers')
      .select('*')
      .eq('id', params.id)
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
    const body = await request.json()
    const updateData: UpdateNumberRequest = body

    console.log('Updating number with id:', params.id, 'data:', updateData)

    const { data, error } = await supabaseAdmin
      .from('numbers')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      console.error(
        'Error details - Code:',
        error.code,
        'Message:',
        error.message
      )

      // 提供更具体的错误信息
      let errorMessage = 'Failed to update number'
      if (error.code === '42501') {
        errorMessage =
          'Permission denied: You may be using anon key instead of service role key, or RLS policy is blocking the operation'
      } else if (error.code === 'PGRST116') {
        errorMessage = 'Number not found or update failed due to permissions'
      }

      return NextResponse.json(
        { success: false, error: errorMessage, details: error.message },
        { status: 500 }
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const { error } = await supabaseAdmin
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
      data: null,
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
