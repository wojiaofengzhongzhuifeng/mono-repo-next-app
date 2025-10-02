# Zustand 按域分离架构演示

## 什么是按域分离？

按域分离是指根据业务功能将状态管理拆分成多个独立的 Store，而不是将所有状态集中在一个大型 Store 中。

## 演示的 Store 架构

### 1. 用户偏好 Store (`userPreferencesStore.ts`)
**业务域：** 用户个性化设置
- **管理范围：** 主题、语言、字体大小、通知设置
- **特点：** 全局配置，需要持久化
- **文件：** `src/source/store/userPreferencesStore.ts`

### 2. 任务管理 Store (`taskManagerStore.ts`)  
**业务域：** 任务和待办事项
- **管理范围：** 任务增删改查、过滤排序、状态管理
- **特点：** 数据操作频繁，有复杂业务逻辑
- **文件：** `src/source/store/taskManagerStore.ts`

### 3. 计数器 Store (`countNumberStore.ts`)
**业务域：** 数字计数功能
- **管理范围：** 计数器状态、API 请求、错误处理
- **特点：** 简单状态管理，集成异步操作

## Store 间的关系

### ✅ 可以共用的情况

1. **组件层组合** - 一个组件可以使用多个 Store
```typescript
function MyComponent() {
  const { theme } = useUserPreferencesStore()
  const { tasks } = useTaskManagerStore()
  // 可以同时使用多个 Store
}
```

2. **数据协调** - 通过组件逻辑实现数据流
```typescript
function handleAddTask() {
  // 根据用户偏好影响任务创建
  const { language } = useUserPreferencesStore()
  const { addTask } = useTaskManagerStore()
  
  addTask({
    title: language === 'zh-CN' ? '新任务' : 'New Task'
  })
}
```

3. **状态同步** - 实现跨域的业务逻辑
```typescript
// 根据任务数量自动调整主题
if (taskCount > 10) {
  useUserPreferencesStore.getState().setTheme('dark')
}
```

### ❌ 不推荐的做法

1. **Store 间直接依赖** - 避免循环依赖
```typescript
// ❌ 错误：Store 直接引用其他 Store
export const useStoreA = create((set, get) => ({
  someAction: () => {
    const storeBState = useStoreB.getState() // 不要这样做
  }
}))
```

2. **过度拆分** - 避免创建过多微小 Store
```typescript
// ❌ 错误：过度拆分
useButtonColorStore
useButtonSizeStore  
useButtonTextStore
// 应该合并为 useButtonStore 或 useUIStore
```

## 按域分离的优势

### 1. **单一职责原则**
- 每个 Store 专注一个业务域
- 代码逻辑清晰，易于理解
- 减少认知负担

### 2. **易于维护**
- 修改一个业务域不会影响其他域
- Bug 定位更容易
- 代码重构更安全

### 3. **按需加载**
- 组件只订阅需要的 Store
- 减少不必要的重渲染
- 性能更优

### 4. **独立测试**
- 每个 Store 可以单独编写测试
- 测试覆盖率更高
- 单元测试更容易

### 5. **团队协作**
- 不同开发者负责不同业务域
- 减少代码冲突
- 并行开发效率高

## 实际应用建议

### 何时创建新 Store？
- ✅ 业务逻辑相对独立
- ✅ 状态需要在多个组件间共享
- ✅ 有持久化需求
- ✅ 包含复杂的异步操作

### 何时合并到现有 Store？
- ✅ 业务功能紧密相关
- ✅ 状态变更经常同时发生
- ✅ 共享相同的生命周期

### Store 设计原则
1. **高内聚** - 相关功能放在一起
2. **低耦合** - Store 间尽量独立
3. **职责明确** - 每个 Store 有明确的边界
4. **可扩展** - 容易添加新功能

## 组件文件结构

```
src/source/_components/
├── user-preferences/          # 用户偏好组件
│   └── index.tsx              # 使用 useUserPreferencesStore
├── task-manager/              # 任务管理组件
│   └── index.tsx              # 使用 useTaskManagerStore
├── number-action/             # 计数器组件
│   └── index.tsx              # 使用 useCountNumberStore
└── store-demo/                # 架构演示组件
    └── index.tsx              # 展示 Store 间交互
```

## 演示说明

运行 `StoreDemo` 组件可以看到：
1. 两个独立的业务域组件
2. Store 间的数据交互
3. 状态的持久化和同步
4. 跨域业务逻辑的实现

这种架构特别适合中大型应用，能够保持代码的可维护性和扩展性。