import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { handleCORS, addCORSHeaders } from '@/lib/cors'

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
      const response = NextResponse.json(
        { success: false, error: 'Failed to fetch numbers' },
        { status: 500 }
      )
      return addCORSHeaders(response)
    }

    const response = NextResponse.json({
      success: true,
      data: data || [],
    })
    return addCORSHeaders(response)
  } catch (error) {
    console.error('API error:', error)
    const response = NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
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
      const response = NextResponse.json(
        { success: false, error: 'Value and label are required' },
        { status: 400 }
      )
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
      const response = NextResponse.json(
        { success: false, error: 'Failed to create number' },
        { status: 500 }
      )
      return addCORSHeaders(response)
    }

    const response = NextResponse.json(
      {
        success: true,
        data,
        message: 'Number created successfully',
      },
      { status: 201 }
    )
    return addCORSHeaders(response)
  } catch (error) {
    console.error('API error:', error)
    const response = NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
    return addCORSHeaders(response)
  }
}
