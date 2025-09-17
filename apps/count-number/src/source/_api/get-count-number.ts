import { http } from '@mono-repo/utils'

/**
 * 0. 定义请求与响应的数据结构
 */
export type GetCountNumberResponseData  = {
    number: number
    id: string
    testList: number[]
}

/**
 * Mock data for development
 */
const GET_COUNT_NUMBER_MOCK_DATA = {
    data: {
        number: 42,
        id: 'mock-id-123',
        testList: [1, 2, 3, 4, 5]
    }
}

/**
 * 1. 配置请求代码
 */
const API_CONFIG = {
    url: '/api-test/v1/count-success',
    useMock: true,
    mockData: GET_COUNT_NUMBER_MOCK_DATA,
}


/**
 * 2. 请求代码 + 通用逻辑 + 错误处理
 */
export const getCountNumber = async (): Promise<GetCountNumberResponseData> => {
    try {
        if (API_CONFIG.useMock) {
            return API_CONFIG.mockData.data
        }

        return await http.get<GetCountNumberResponseData>(API_CONFIG.url)
    } catch (error) {
        // 获取数据失败： httpcode 非200
        throw new Error('获取数据失败： httpcode 非200')
    }
}
