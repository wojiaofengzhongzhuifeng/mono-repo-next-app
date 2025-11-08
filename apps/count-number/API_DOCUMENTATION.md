# Count-Number Admin API 接口文档

## 基本信息

- **Base URL**: `http://localhost:3011/api/admin`
- **Content-Type**: `application/json`
- **接口前缀**: `/api/admin/numbers`

---

## 1. 获取所有数字列表

**接口地址**: `GET /numbers`

**接口描述**: 获取所有数字记录，按创建时间倒序排列

### 请求参数

无

### 请求示例

```http
GET /api/admin/numbers
```

### 响应示例

```json
{
  "success": true,
  "data": [
    {
      "id": 11,
      "value": 11111,
      "label": "test",
      "description": "test",
      "status": "active",
      "created_at": "2025-11-08T02:07:23.833406+00:00",
      "updated_at": "2025-11-08T02:07:23.833406+00:00"
    },
    {
      "id": 8,
      "value": 123321321,
      "label": "test",
      "description": "test",
      "status": "active",
      "created_at": "2025-11-07T05:57:47.8593+00:00",
      "updated_at": "2025-11-07T05:57:47.8593+00:00"
    }
  ]
}
```

### 错误响应

```json
{
  "success": false,
  "error": "Failed to fetch numbers"
}
```

---

## 2. 创建新数字

**接口地址**: `POST /numbers`

**接口描述**: 创建新的数字记录

### 请求参数

| 参数名      | 类型   | 必填 | 说明                                                |
| ----------- | ------ | ---- | --------------------------------------------------- |
| value       | number | 是   | 数字值                                              |
| label       | string | 是   | 数字标签                                            |
| description | string | 否   | 描述信息                                            |
| status      | string | 否   | 状态，默认为 "active"，可选值："active"、"inactive" |

### 请求示例

```http
POST /api/admin/numbers
Content-Type: application/json

{
  "value": 999,
  "label": "新数字",
  "description": "这是一个测试数字",
  "status": "active"
}
```

### 响应示例

```json
{
  "success": true,
  "data": {
    "id": 12,
    "value": 999,
    "label": "新数字",
    "description": "这是一个测试数字",
    "status": "active",
    "created_at": "2025-11-08T02:15:00.000000+00:00",
    "updated_at": "2025-11-08T02:15:00.000000+00:00"
  },
  "message": "Number created successfully"
}
```

### 错误响应

```json
{
  "success": false,
  "error": "Value and label are required"
}
```

---

## 3. 获取单个数字

**接口地址**: `GET /numbers/{id}`

**接口描述**: 根据ID获取单个数字记录

### 路径参数

| 参数名 | 类型   | 必填 | 说明               |
| ------ | ------ | ---- | ------------------ |
| id     | number | 是   | 数字记录的唯一标识 |

### 请求示例

```http
GET /api/admin/numbers/1
```

### 响应示例

```json
{
  "success": true,
  "data": {
    "id": 1,
    "value": 100,
    "label": "第一个数字",
    "description": "这是第一个示例数字",
    "status": "active",
    "created_at": "2025-11-07T03:34:22.649436+00:00",
    "updated_at": "2025-11-07T03:34:22.649436+00:00"
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": "Number not found"
}
```

---

## 4. 更新数字

**接口地址**: `PUT /numbers/{id}`

**接口描述**: 更新指定的数字记录

### 路径参数

| 参数名 | 类型   | 必填 | 说明               |
| ------ | ------ | ---- | ------------------ |
| id     | number | 是   | 数字记录的唯一标识 |

### 请求参数

| 参数名      | 类型   | 必填 | 说明                               |
| ----------- | ------ | ---- | ---------------------------------- |
| value       | number | 否   | 数字值                             |
| label       | string | 否   | 数字标签                           |
| description | string | 否   | 描述信息                           |
| status      | string | 否   | 状态，可选值："active"、"inactive" |

### 请求示例

```http
PUT /api/admin/numbers/1
Content-Type: application/json

{
  "value": 1000,
  "label": "更新后的标签",
  "description": "更新后的描述",
  "status": "inactive"
}
```

### 响应示例

```json
{
  "success": true,
  "data": {
    "id": 1,
    "value": 1000,
    "label": "更新后的标签",
    "description": "更新后的描述",
    "status": "inactive",
    "created_at": "2025-11-07T03:34:22.649436+00:00",
    "updated_at": "2025-11-08T02:20:00.000000+00:00"
  },
  "message": "Number updated successfully"
}
```

### 错误响应

```json
{
  "success": false,
  "error": "Failed to update number"
}
```

---

## 5. 删除数字

**接口地址**: `DELETE /numbers/{id}`

**接口描述**: 删除指定的数字记录

### 路径参数

| 参数名 | 类型   | 必填 | 说明               |
| ------ | ------ | ---- | ------------------ |
| id     | number | 是   | 数字记录的唯一标识 |

### 请求示例

```http
DELETE /api/admin/numbers/1
```

### 响应示例

```json
{
  "success": true,
  "data": null,
  "message": "Number deleted successfully"
}
```

### 错误响应

```json
{
  "success": false,
  "error": "Failed to delete number"
}
```

---

## 6. 获取统计数据

**接口地址**: `GET /stats`

**接口描述**: 获取数字记录的统计信息

### 请求参数

无

### 请求示例

```http
GET /api/admin/stats
```

### 响应示例

```json
{
  "success": true,
  "data": {
    "totalCount": 4,
    "activeCount": 4,
    "inactiveCount": 0
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": "Failed to fetch numbers"
}
```

---

## 数据结构说明

### NumberItem 对象

| 字段名      | 类型   | 说明                         |
| ----------- | ------ | ---------------------------- |
| id          | number | 记录唯一标识                 |
| value       | number | 数字值                       |
| label       | string | 数字标签                     |
| description | string | 描述信息                     |
| status      | string | 状态："active" 或 "inactive" |
| created_at  | string | 创建时间（ISO 8601 格式）    |
| updated_at  | string | 更新时间（ISO 8601 格式）    |

### StatsResponse 对象

| 字段名        | 类型   | 说明         |
| ------------- | ------ | ------------ |
| totalCount    | number | 总记录数     |
| activeCount   | number | 活跃记录数   |
| inactiveCount | number | 非活跃记录数 |

---

## 通用响应格式

### 成功响应

```json
{
  "success": true,
  "data": {}, // 实际数据
  "message": "操作成功信息" // 仅在部分操作中存在
}
```

### 错误响应

```json
{
  "success": false,
  "error": "错误信息"
}
```

### HTTP 状态码

- `200`: 成功
- `400`: 请求参数错误
- `404`: 资源未找到
- `500`: 服务器内部错误

---

## cURL 命令示例

```bash
# 1. 获取所有数字
curl -X GET "http://localhost:3011/api/admin/numbers" \
  -H "Content-Type: application/json"

# 2. 创建新数字
curl -X POST "http://localhost:3011/api/admin/numbers" \
  -H "Content-Type: application/json" \
  -d '{
    "value": 999,
    "label": "新数字",
    "description": "测试数字",
    "status": "active"
  }'

# 3. 获取单个数字
curl -X GET "http://localhost:3011/api/admin/numbers/1" \
  -H "Content-Type: application/json"

# 4. 更新数字
curl -X PUT "http://localhost:3011/api/admin/numbers/1" \
  -H "Content-Type: application/json" \
  -d '{
    "value": 1000,
    "label": "更新后的标签",
    "status": "inactive"
  }'

# 5. 删除数字
curl -X DELETE "http://localhost:3011/api/admin/numbers/1" \
  -H "Content-Type: application/json"

# 6. 获取统计数据
curl -X GET "http://localhost:3011/api/admin/stats" \
  -H "Content-Type: application/json"
```

---

## 注意事项

1. 所有接口都使用 JSON 格式进行数据交换
2. 日期时间字段使用 ISO 8601 格式
3. status 字段仅支持 "active" 和 "inactive" 两个值
4. 创建和更新操作中，value 和 label 是必填字段
5. 删除操作不可恢复，请谨慎使用
