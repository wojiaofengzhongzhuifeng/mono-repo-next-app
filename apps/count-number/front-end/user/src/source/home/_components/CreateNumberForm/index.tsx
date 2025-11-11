import React, { useState } from 'react'
import { useCreateNumber } from '@/source/home/_api/create-number'
import type { CreatNumberRequest } from '@/source/home/_api/create-number'

function CreateNumberForm() {
  const [formData, setFormData] = useState<CreatNumberRequest>({
    numberValue: 0,
    title: '',
    subtitle: '',
    status: 'active',
  })

  const {
    run: createNumber,
    loading,
    data,
    error,
  } = useCreateNumber({
    manual: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // ✅ 直接传入前端数据格式，useCreateNumber 会自动转换
      const result = await createNumber(formData)
      console.log('创建成功:', result)
      // 重置表单
      setFormData({
        numberValue: 0,
        title: '',
        subtitle: '',
        status: 'active',
      })
    } catch (err) {
      console.error('创建失败:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          数字值:
          <input
            type='number'
            value={formData.numberValue}
            onChange={e =>
              setFormData({ ...formData, numberValue: Number(e.target.value) })
            }
          />
        </label>
      </div>

      <div>
        <label>
          标题:
          <input
            type='text'
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
        </label>
      </div>

      <div>
        <label>
          副标题:
          <input
            type='text'
            value={formData.subtitle}
            onChange={e =>
              setFormData({ ...formData, subtitle: e.target.value })
            }
          />
        </label>
      </div>

      <div>
        <label>
          状态:
          <select
            value={formData.status}
            onChange={e =>
              setFormData({
                ...formData,
                status: e.target.value as 'active' | 'inactive',
              })
            }
          >
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
        </label>
      </div>

      <button type='submit' disabled={loading}>
        {loading ? '创建中...' : '创建'}
      </button>

      {error && <div style={{ color: 'red' }}>创建失败</div>}
      {data && <div style={{ color: 'green' }}>创建成功！ID: {data.id}</div>}
    </form>
  )
}

export default CreateNumberForm
