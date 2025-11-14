import { post } from '@mono-repo/utils'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: { id: string; email: string }
}

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await post<{
        code: number
        message: string
        data: LoginResponse
      }>({ url: '/api/auth/login', data: { email, password } })

      if (res.code === 20000 && res.data) {
        localStorage.setItem('authToken', res.data.token) // 保存 token
        alert('登录成功！')
        router.push('/user-number-auth') // 登录成功后跳转到用户数字认证页面
      } else {
        setError(res.message || '登录失败')
      }
    } catch (err: any) {
      setError(err.message || '登录失败，请稍后再试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>登录</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '300px',
          gap: '10px',
        }}
      >
        <input
          type='email'
          placeholder='邮箱'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='密码'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type='submit' disabled={loading}>
          {loading ? '登录中...' : '登录'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>
          还没有账户？ <a href='/auth/register'>立即注册</a>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
