import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { ApiResponse, StatsResponse } from '@/types/number'

export async function GET(): Promise<NextResponse<ApiResponse<StatsResponse>>> {
  try {
    // 获取总数
    const { count: totalCount, error: totalError } = await supabaseAdmin
      .from('numbers')
      .select('*', { count: 'exact', head: true })

    // 获取激活数量
    const { count: activeCount, error: activeError } = await supabaseAdmin
      .from('numbers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    // 获取停用数量
    const { count: inactiveCount, error: inactiveError } = await supabaseAdmin
      .from('numbers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'inactive')

    if (totalError || activeError || inactiveError) {
      console.error('Supabase error:', {
        totalError,
        activeError,
        inactiveError,
      })
      return NextResponse.json(
        { success: false, error: 'Failed to fetch stats' },
        { status: 500 }
      )
    }

    const stats: StatsResponse = {
      totalCount: totalCount || 0,
      activeCount: activeCount || 0,
      inactiveCount: inactiveCount || 0,
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
