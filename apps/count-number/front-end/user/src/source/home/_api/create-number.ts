import { CreateNumberRequest } from '@count-number-types'
import { NumberStatus } from '@/source/home/_api/get-number'
// 1. 定义请求与响应的数据结构
export type BackEndCreateNumberRequest = CreateNumberRequest // 后端请求数据结构
export type CreatNumberRequest = {
  numberValue: number
  title: string
  subtitle: string
  status: NumberStatus
} // 前端组件生成的请求数据结构，可能与后端请求数据结构不同，需要进行转换

// 2. 配置请求代码
const API_CONFIG = {
  url: '/api/user/numbers',
  method: 'POST',
  manual: false,
}
