import axios, { AxiosRequestConfig } from 'axios'
import type { ApiResponse } from './response'

const opt: AxiosRequestConfig = {
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
}
export type requestOpt = {
  /**
   * 接口请求地址
   */
  url: string
  /**
   * url地址中的参数对象
   */
  params?: { [key: string]: any }
  /**
   * 请求体中的数据对象
   */
  data?: { [key: string]: any }
  /**
   * 是否需要使用凭证
   */
  withCredentials?: boolean
  /**
   * 请求header信息
   */
  headers?: any
}

const instance = axios.create(opt)

export const get = async <T>(opt: requestOpt) => {
  try {
    const ret = await instance.get<ApiResponse<T>>(opt.url, opt)
    return ret.data
  } catch (e) {
    throw '请求数据报错，请稍后'
  }
}

export const post = async <T>(
  opt: Pick<requestOpt, 'url' | 'data' | 'headers'>
) => {
  try {
    const headers: AxiosRequestConfig['headers'] = Object.assign(
      {},
      { 'Content-Type': 'application/json' },
      opt.headers
    )

    const ret = await instance.post<ApiResponse<T>>(opt.url, opt.data, {
      headers,
    })
    return ret.data
  } catch (e) {
    throw '请求数据报错，请稍后'
  }
}

export const del = async <T>(
  opt: Pick<requestOpt, 'url' | 'params' | 'headers'>
) => {
  try {
    const headers: AxiosRequestConfig['headers'] = Object.assign(
      {},
      { 'Content-Type': 'application/json' },
      opt.headers
    )

    const ret = await instance.delete<ApiResponse<T>>(opt.url, {
      params: opt.params,
      headers,
    })
    return ret.data
  } catch (e) {
    throw '请求数据报错，请稍后'
  }
}

export default instance
