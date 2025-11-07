'use client'

import React, { useState, useEffect } from 'react'
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  message,
  Popconfirm,
  Typography,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { numberService } from '@/services/numberService'
import {
  NumberItem,
  CreateNumberRequest,
  UpdateNumberRequest,
} from '@/types/number'

const { Title } = Typography
const { TextArea } = Input

export default function NumbersPage() {
  const [numbers, setNumbers] = useState<NumberItem[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingNumber, setEditingNumber] = useState<NumberItem | null>(null)
  const [form] = Form.useForm()

  const fetchNumbers = async () => {
    setLoading(true)
    try {
      const data = await numberService.getNumbers()
      setNumbers(data)
    } catch (error) {
      message.error('获取数字列表失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNumbers()
  }, [])

  const handleCreate = () => {
    setEditingNumber(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: NumberItem) => {
    setEditingNumber(record)
    form.setFieldsValue(record)
    setModalVisible(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await numberService.deleteNumber(id)
      message.success('删除成功')
      fetchNumbers()
    } catch (error) {
      message.error('删除失败')
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      if (editingNumber) {
        await numberService.updateNumber(
          editingNumber.id,
          values as UpdateNumberRequest
        )
        message.success('更新成功')
      } else {
        await numberService.createNumber(values as CreateNumberRequest)
        message.success('创建成功')
      }
      setModalVisible(false)
      fetchNumbers()
    } catch (error) {
      message.error('操作失败')
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '数值',
      dataIndex: 'value',
      key: 'value',
      sorter: (a: NumberItem, b: NumberItem) => a.value - b.value,
    },
    {
      title: '标签',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span style={{ color: status === 'active' ? '#52c41a' : '#ff4d4f' }}>
          {status === 'active' ? '激活' : '停用'}
        </span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: NumberItem) => (
        <Space size='middle'>
          <Button
            type='link'
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title='确定要删除这个数字吗？'
            onConfirm={() => handleDelete(record.id)}
            okText='确定'
            cancelText='取消'
          >
            <Button type='link' danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <Title level={2}>数字管理</Title>
        <Button type='primary' icon={<PlusOutlined />} onClick={handleCreate}>
          添加数字
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={numbers}
        rowKey='id'
        loading={loading}
        pagination={{
          total: numbers.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <Modal
        title={editingNumber ? '编辑数字' : '添加数字'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
          initialValues={{ status: 'active' }}
        >
          <Form.Item
            name='value'
            label='数值'
            rules={[{ required: true, message: '请输入数值' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder='请输入数值' />
          </Form.Item>

          <Form.Item
            name='label'
            label='标签'
            rules={[{ required: true, message: '请输入标签' }]}
          >
            <Input placeholder='请输入标签' />
          </Form.Item>

          <Form.Item name='description' label='描述'>
            <TextArea rows={3} placeholder='请输入描述（可选）' />
          </Form.Item>

          <Form.Item name='status' label='状态' valuePropName='checked'>
            <Switch checkedChildren='激活' unCheckedChildren='停用' />
          </Form.Item>

          <Form.Item className='mb-0'>
            <Space>
              <Button type='primary' htmlType='submit'>
                {editingNumber ? '更新' : '创建'}
              </Button>
              <Button onClick={() => setModalVisible(false)}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
