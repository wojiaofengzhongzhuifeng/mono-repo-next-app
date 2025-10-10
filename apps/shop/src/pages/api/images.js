import { GET_BANNER } from '@/source/home/_api/mock'

export default function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    // 处理预检请求
    res.status(200).end()
    return
  }

  if (req.method === 'GET') {
    // 返回轮播图数据
    res.status(200).json(GET_BANNER)
  } else {
    // 不支持的方法
    res.status(405).json({ error: 'Method not allowed' })
  }
}
