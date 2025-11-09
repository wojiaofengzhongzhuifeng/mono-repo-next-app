/**
 * 统一的 API 响应结构
 */

/**
 * API 响应接口
 */
export interface ApiResponse<T> {
  code: number
  message: string
  data: T | null
  timestamp: string // ISO 8601 格式
}

/**
 * 业务状态码常量
 */
export const STATUS_CODE = {
  SUCCESS: 20000, // 请求成功
  CLIENT_ERROR: 40001, // 请求数据出错
  BUSINESS_ERROR: 50002, // 业务逻辑错误
} as const

/**
 * 状态码映射表
 */
export const STATUS_CODE_MAP: Record<number, string> = {
  [STATUS_CODE.SUCCESS]: '请求成功',
  [STATUS_CODE.CLIENT_ERROR]: '请求数据出错',
  [STATUS_CODE.BUSINESS_ERROR]: '业务逻辑错误',
}

/**
 * 根据业务状态码获取 HTTP 状态码
 */
export function getHttpStatusFromCode(code: number): number {
  if (code === STATUS_CODE.SUCCESS) {
    return 200
  }
  if (code === STATUS_CODE.CLIENT_ERROR) {
    return 400
  }
  if (code === STATUS_CODE.BUSINESS_ERROR) {
    return 500
  }
  // 默认返回 500
  return 500
}

/**
 * 获取当前时间的 ISO 8601 格式字符串
 */
function getCurrentTimestamp(): string {
  return new Date().toISOString()
}

/**
 * 创建成功响应
 */
export function createSuccessResponse<T>(
  data: T,
  code: number = STATUS_CODE.SUCCESS
): ApiResponse<T> {
  return {
    code,
    message: STATUS_CODE_MAP[code] || '请求成功',
    data,
    timestamp: getCurrentTimestamp(),
  }
}

/**
 * 创建错误响应
 * @param code 业务状态码
 * @param customMessage 自定义错误消息（可选）
 * @param errorData 错误详情数据（可选，可以返回具体的错误信息对象）
 */
export function createErrorResponse<T = any>(
  code: number,
  customMessage?: string,
  errorData?: T
): ApiResponse<T | null> {
  return {
    code,
    message: customMessage || STATUS_CODE_MAP[code] || '未知错误',
    data: errorData !== undefined ? errorData : null,
    timestamp: getCurrentTimestamp(),
  }
}
