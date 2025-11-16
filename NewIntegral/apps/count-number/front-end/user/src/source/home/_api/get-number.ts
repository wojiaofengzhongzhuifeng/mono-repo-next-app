import { NumberItem } from '@count-number-types'
import { get, STATUS_CODE } from '@mono-repo/utils'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useAppStore } from '@/source/home/_store'
import { ApiConfig, prefixUrl } from '@/source/home/_api/common'

// 1. 定义请求与响应的数据结构
export type NumberStatus = 'active' | 'inactive' // 定义
export type BackEndGetCountNumberResponse = NumberItem // get后端返回的数据结构
export type GetCountNumberResponse = {
  // get前端所需的数据结构
  id: number // 15,
  numberValue: number // 99129,
  title: string // "新数字",
  subtitle: string // "这是一个测试数字",
  status: NumberStatus
  created_at: string // "2025-11-09T02:23:38.312794+00:00",
  updated_at: string // "2025-11-09T02:23:38.312794+00:00"
}

// 2. 配置请求代码
const apiConfig: ApiConfig = {
  url: `${prefixUrl}/numbers`,
  method: 'GET',
  manual: false,
  showError: true,
}

// 3. 请求代码 + 通用逻辑 + 错误处理
export const getNumbersRequest = async (): Promise<
  BackEndGetCountNumberResponse[]
> => {
  try {
    const res = await get<BackEndGetCountNumberResponse[]>({
      url: apiConfig.url,
    })
    if (res.code === STATUS_CODE.SUCCESS) {
      return res.data || []
    } else {
      throw new Error(res.message || '获取数据失败')
    }
  } catch (error) {
    console.error('获取数据失败:', error)
    throw new Error('获取数据失败')
  }
}

/*
在这里处理
1. 数据请求
2. 错误处理
3. 数据结构转化
4. 基本数据请求后的逻辑都放在这里

*/

function transformBackEndToFrontEndData(
  backEndDataList: BackEndGetCountNumberResponse[]
): GetCountNumberResponse[] {
  return backEndDataList.map((item: BackEndGetCountNumberResponse) => {
    return {
      ...item,
      numberValue: item.value,
      title: item.label,
      subtitle: item.description || '',
    }
  })
}

export function useGetNumbers(params?: {
  manual?: boolean
  showError?: boolean
}) {
  const manual = params?.manual ?? apiConfig.manual
  const showError = params?.showError ?? apiConfig.showError
  const { data, error, loading, run } = useRequest(getNumbersRequest, {
    manual,
  })
  const { setNumbers, setGetNumbersLoading } = useAppStore()

  useEffect(() => {
    if (error && showError) {
      alert('获取数据失败')
    }
  }, [error, showError])

  useEffect(() => {
    if (!error && data) {
      // todo 完成函数，将后端数据转化为前端数据
      let frontEndDataList = transformBackEndToFrontEndData(data)
      setNumbers(frontEndDataList)
    }
  }, [error, data])

  useEffect(() => {
    setGetNumbersLoading(loading)
  }, [loading])
  return { data, error, loading, run }
}
