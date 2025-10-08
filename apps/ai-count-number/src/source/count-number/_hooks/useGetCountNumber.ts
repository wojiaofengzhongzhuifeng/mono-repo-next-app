import { getCountNumberRequest } from '@/source/count-number/_api/get-count-number'
import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useCountNumberStore } from '@/source/count-number/_store'

// 凡是以 get or submit 开头，表示请求数据
export function useGetCountNumber() {
  const { data, error, loading, run } = useRequest(getCountNumberRequest, {
    manual: true,
  })

  useEffect(() => {
    if (error) {
      alert('test')
    }
  }, [error])

  return { error, loading, data, run }
}

// 使用 hooks
export function useGetCountNumberHooks() {
  const { run, data, error } = useGetCountNumber()
  const { setCountNumber } = useCountNumberStore()

  useEffect(() => {
    run()
  }, [])

  useEffect(() => {
    if (!error && data) {
      setCountNumber(data.number)
    }
  }, [error, data])

  console.log('data', data)
}
