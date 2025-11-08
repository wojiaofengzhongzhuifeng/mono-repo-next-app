import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { ApiResponse, NumberItem, CreateNumberRequest } from '@/types/number'

export async function GET(): Promise<NextResponse<ApiResponse<NumberItem[]>>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('numbers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch numbers' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data || [],
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<NumberItem>>> {
  try {
    const body: CreateNumberRequest = await request.json()
    const { value, label, description, status } = body

    if (!value || !label) {
      return NextResponse.json(
        { success: false, error: 'Value and label are required' },
        { status: 400 }
      )
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
      console.error(
        'Error details - Code:',
        error.code,
        'Message:',
        error.message
      )

      // 提供更具体的错误信息
      let errorMessage = 'Failed to create number'
      if (error.code === '42501') {
        errorMessage =
          'Permission denied: You may be using anon key instead of service role key, or RLS policy is blocking the operation'
      }

      return NextResponse.json(
        { success: false, error: errorMessage, details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Number created successfully',
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
