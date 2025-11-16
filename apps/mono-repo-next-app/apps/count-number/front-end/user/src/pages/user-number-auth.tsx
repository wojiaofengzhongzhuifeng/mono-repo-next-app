import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router' // 确保这里是 next/router
import { useRequest } from 'ahooks'
import { get, post } from '@mono-repo/utils'
import { NextPage } from 'next'

interface NumberItem {
  id: string
  value: number
  label: string
  description?: string
  status: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
  user?: { id: string; email: string }
}

interface CreateNumberRequest {
  value: number
  label: string
  description?: string
  status?: 'active' | 'inactive' | 'archived'
  isPublic?: boolean
}

const UserNumberAuthPage: NextPage = () => {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [publicNumbers, setPublicNumbers] = useState<NumberItem[]>([])
  const [userNumbers, setUserNumbers] = useState<NumberItem[]>([])
  const [newNumberData, setNewNumberData] = useState<CreateNumberRequest>({
    value: 0,
    label: '',
    isPublic: false,
  })

  useEffect(() => {
    // 从 localStorage 获取 token
    const storedToken = localStorage.getItem('authToken')
    setToken(storedToken)
  }, [])

  // --- API Hooks ---

  // 获取公共数字
  const { run: fetchPublicNumbers, loading: loadingPublic } = useRequest(
    async () => {
      const res = await get<{ data: NumberItem[] }>({
        url: '/api/public/numbers',
      })
      if (res.code === 20000 && res.data) {
        setPublicNumbers(res.data)
      } else {
        alert('获取公共数字失败: ' + res.message)
      }
    },
    { manual: true }
  )

  // 获取用户数字 (需要认证)
  const { run: fetchUserNumbers, loading: loadingUser } = useRequest(
    async () => {
      if (!token) {
        alert('请先登录以获取用户数字')
        return
      }
      const res = await get<{ data: NumberItem[] }>({
        url: '/api/user/numbers',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.code === 20000 && res.data) {
        setUserNumbers(res.data)
      } else {
        alert('获取用户数字失败: ' + res.message)
      }
    },
    { manual: true }
  )

  // 创建数字 (需要认证)
  const { run: createNumber, loading: creatingNumber } = useRequest(
    async (data: CreateNumberRequest) => {
      if (!token) {
        alert('请先登录以创建数字')
        return
      }
      const res = await post<{ data: NumberItem }>({
        url: '/api/user/numbers',
        data,
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.code === 20000 && res.data) {
        alert('数字创建成功!')
        // 刷新用户数字列表
        fetchUserNumbers()
        setNewNumberData({ value: 0, label: '', isPublic: false })
      } else {
        alert('创建数字失败: ' + res.message)
      }
    },
    { manual: true }
  )

  // --- Handlers ---

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createNumber(newNumberData)
  }

  // --- Render ---

  return (
    <div style={{ padding: '20px' }}>
      <h1>用户数字认证测试页</h1>

      <button onClick={fetchPublicNumbers} disabled={loadingPublic}>
        {loadingPublic ? '加载中...' : '获取公共数字'}
      </button>
      <h2>公共数字 ({publicNumbers.length})</h2>
      <ul>
        {publicNumbers.map(item => (
          <li key={item.id}>
            Value: {item.value}, Label: {item.label}, Public:{' '}
            {item.isPublic ? 'Yes' : 'No'}
            {item.user && `, By: ${item.user.email}`}
          </li>
        ))}
      </ul>

      <hr />

      <button onClick={fetchUserNumbers} disabled={loadingUser || !token}>
        {loadingUser ? '加载中...' : '获取我的数字 (需要登录)'}
      </button>
      <h2>我的数字 ({userNumbers.length})</h2>
      <ul>
        {userNumbers.map(item => (
          <li key={item.id}>
            Value: {item.value}, Label: {item.label}, Public:{' '}
            {item.isPublic ? 'Yes' : 'No'}
            {item.user && `, By: ${item.user.email}`}
          </li>
        ))}
      </ul>

      <hr />

      <h2>创建新数字</h2>
      <form
        onSubmit={handleCreateSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '300px',
          gap: '10px',
        }}
      >
        <input
          type='number'
          placeholder='Value'
          value={newNumberData.value}
          onChange={e =>
            setNewNumberData({
              ...newNumberData,
              value: parseInt(e.target.value) || 0,
            })
          }
          required
        />
        <input
          type='text'
          placeholder='Label'
          value={newNumberData.label}
          onChange={e =>
            setNewNumberData({ ...newNumberData, label: e.target.value })
          }
          required
        />
        <label>
          <input
            type='checkbox'
            checked={newNumberData.isPublic}
            onChange={e =>
              setNewNumberData({ ...newNumberData, isPublic: e.target.checked })
            }
          />
          是否公开
        </label>
        <button type='submit' disabled={creatingNumber || !token}>
          {creatingNumber ? '创建中...' : '创建数字 (需要登录)'}
        </button>
      </form>
    </div>
  )
}

export default UserNumberAuthPage
