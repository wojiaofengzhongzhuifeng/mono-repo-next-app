import { http } from '@mono-repo/utils'

/**
 * 0. 定义请求与响应的数据结构
 */
// 请求数据
export type SubmitCountNumberRequestData  = {
    number: number
}
// 响应数据
export type SubmitCountNumberResponseData  = {
    number: number
    id: string
}

/**
 * Mock data for development
 */
const SUBMIT_COUNT_NUMBER_MOCK_DATA = {
    data: {
        number: 0,
        id: 'submit-mock-id-456'
    }
}

/**
 * 1. 配置请求代码
 */
const API_CONFIG = {
    url: '/api-test/v1/count-success',
    useMock: true,
    mockData: SUBMIT_COUNT_NUMBER_MOCK_DATA,
}


/**
 * 2. 请求代码 + 通用逻辑 + 错误处理
 */
export const submitCountNumber = async (
    requestData: SubmitCountNumberRequestData
): Promise<SubmitCountNumberResponseData> => {
    try {
        if (API_CONFIG.useMock) {
            return API_CONFIG.mockData.data
        }

        return await http.post<SubmitCountNumberResponseData>(API_CONFIG.url, requestData)
    } catch (error) {
        // 提交数据失败： httpcode 非200
        throw new Error('提交数据失败： httpcode 非200')
    }
}
