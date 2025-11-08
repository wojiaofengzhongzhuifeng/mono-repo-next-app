import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { ApiResponse, StatsResponse } from '@/types/number'

export async function GET(): Promise<NextResponse<ApiResponse<StatsResponse>>> {
  try {
    // 方法1: 获取所有数据，然后在代码中统计
    const { data: allData, error: fetchError } = await supabaseAdmin
      .from('numbers')
      .select('*')

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch numbers' },
        { status: 500 }
      )
    }

    // 添加调试日志
    console.log('方法1 - 获取到的数据:', JSON.stringify(allData, null, 2))
    console.log('方法1 - 数据条数:', allData?.length)

    // 方法2: 使用 Supabase 聚合查询来验证
    const { count: totalCountFromDB, error: countError } = await supabaseAdmin
      .from('numbers')
      .select('*', { count: 'exact', head: true })

    console.log('方法2 - 直接count查询结果:', totalCountFromDB)
    console.log('方法2 - count查询错误:', countError)

    // 方法3: 按状态分组统计
    const { data: activeData, error: activeError } = await supabaseAdmin
      .from('numbers')
      .select('id')
      .eq('status', 'active')

    const { data: inactiveData, error: inactiveError } = await supabaseAdmin
      .from('numbers')
      .select('id')
      .eq('status', 'inactive')

    console.log('方法3 - active数据:', activeData?.length, '错误:', activeError)
    console.log(
      '方法3 - inactive数据:',
      inactiveData?.length,
      '错误:',
      inactiveError
    )

    // 在代码中统计各种状态的数量
    const totalCount = allData?.length || 0
    const activeCount =
      allData?.filter(item => item.status === 'active').length || 0
    const inactiveCount =
      allData?.filter(item => item.status === 'inactive').length || 0

    const stats: StatsResponse = {
      totalCount,
      activeCount,
      inactiveCount,
    }

    // 添加对比信息
    console.log('最终统计结果:', {
      method1: { totalCount, activeCount, inactiveCount },
      method2: { totalCount: totalCountFromDB },
      method3: {
        activeCount: activeData?.length,
        inactiveCount: inactiveData?.length,
      },
    })

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
