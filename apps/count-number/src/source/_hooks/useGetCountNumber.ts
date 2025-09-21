import { getCountNumber } from '@/source/_api/get-count-number'
import {useEffect } from 'react';
import { useRequest } from "ahooks"

// 凡是以 get or submit 开头，表示请求数据
export function useGetCountNumber() {
    const { data, error, loading } = useRequest(getCountNumber)

    useEffect(() => {
        console.log('useGetCountNumber111', data)
        if (data) {
            console.log('useGetCountNumber2222', data)
        }
    }, [data])

    useEffect(() => {
        console.log('useGetCountNumber error',  JSON.stringify(error))
        if (error) {
            alert('jfkdla')

        }
    }, [error])

    return { error, loading, data }
}