import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/admin/stats - 获取统计信息
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from('numbers').select('*')

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch numbers' },
        { status: 500 }
      )
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

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
