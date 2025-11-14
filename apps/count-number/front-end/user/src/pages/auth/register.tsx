import { post } from '@mono-repo/utils'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

interface RegisterRequest {
  email: string
  password: string
}

interface RegisterResponse {
  id: string
  email: string
}

const RegisterPage: NextPage = () => {
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
        data: RegisterResponse
      }>({ url: '/api/auth/register', data: { email, password } })

      if (res.code === 20000) {
        alert('注册成功！请登录。')
        router.push('/auth/login') // 注册成功后跳转到登录页面
      } else {
        setError(res.message || '注册失败')
      }
    } catch (err: any) {
      setError(err.message || '注册失败，请稍后再试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>注册</h1>
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
          {loading ? '注册中...' : '注册'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default RegisterPage
