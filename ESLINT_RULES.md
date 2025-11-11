# ESLint 规则说明

## 禁止在组件中滥用 useEffect

### 规则说明

项目根目录的 `.eslintrc.json` 中配置了 `react-hooks/exhaustive-deps` 规则为 `warn`。该规则会提醒你 `useEffect` 的依赖数组中是否存在遗漏的依赖项。

### 为什么需要谨慎使用 useEffect？

`useEffect` 是一个强大的 Hook，但也容易被误用，导致以下问题：

1.  **难以管理依赖项**：容易遗漏依赖，导致闭包问题或逻辑错误；或者过度依赖，导致不必要的重复执行。
2.  **逻辑分散，难以维护**：组件的业务逻辑分散在多个 `useEffect` 中，难以理解组件的完整行为和数据流。
3.  **时序问题和竞态条件**：不正确的使用可能导致副作用的执行顺序问题，特别是在异步操作中。
4.  **性能问题**：不当的依赖项会导致 `useEffect` 频繁触发，影响组件性能。

### 推荐的替代方案

在很多情况下，`useEffect` 并不是处理副作用的最佳或唯一方式。推荐使用以下替代方案：

#### ✅ 1. 数据驱动渲染 (Data-driven Rendering)

很多时候，你不需要 `useEffect` 来根据数据变化更新 UI。React 的核心就是数据驱动，当 `state` 或 `props` 变化时，组件会自动重新渲染。

```typescript
// ❌ 不推荐：使用 useEffect 来更新 UI
function DisplayCount({ count }) {
  const [displayValue, setDisplayValue] = useState(0)
  useEffect(() => {
    setDisplayValue(count)
  }, [count]) // 依赖 count 变化时更新
  return <div>{displayValue}</div>
}

// ✅ 推荐：直接使用数据
function DisplayCount({ count }) {
  return <div>{count}</div> // 直接使用 props.count
}
```

#### ✅ 2. 事件回调 (Event Callbacks)

对于用户交互产生的副作用，应该直接在事件处理函数中执行，而不是在 `useEffect` 中监听某个状态变化。

```typescript
// ❌ 不推荐：使用 useEffect 监听提交成功
const { data: createResult } = useCreateNumber()
useEffect(() => {
  if (createResult) {
    alert('创建成功')
    resetForm()
  }
}, [createResult])

// ✅ 推荐：使用 useRequest 的 onSuccess 回调
const { run: createNumber, loading } = useCreateNumber({
  onSuccess: data => {
    alert('创建成功')
    resetForm()
  },
  onError: error => {
    alert(`创建失败: ${error.message}`)
  },
})

const handleSubmit = async e => {
  e.preventDefault()
  await createNumber(formData)
}
```

#### ✅ 3. 封装到自定义 Hooks (Custom Hooks)

当副作用逻辑变得复杂或需要在多个组件中复用时，将其封装到自定义 Hook 中是最佳实践。自定义 Hook 可以管理其内部的状态和副作用，并以更简洁的 API 暴露给组件。

```typescript
// ❌ 不推荐：组件中直接处理数据同步
function CreateNumberForm() {
  const { setNumbers } = useAppStore()
  const { data, error } = useCreateNumber({ manual: true })

  useEffect(() => {
    if (data && !error) {
      const currentNumbers = useAppStore.getState().numbers
      setNumbers([data, ...currentNumbers])
      // ... 其他副作用
    }
  }, [data, error, setNumbers])

  return <form>...</form>
}

// ✅ 推荐：将数据同步逻辑封装到 useCreateNumber 中
// apps/count-number/front-end/user/src/source/home/_api/create-number.ts
export function useCreateNumber(params?: {
  manual?: boolean
  showError?: boolean
  syncToStore?: boolean; // 新增选项，控制是否同步到 store
  onSuccess?: (data: CreateNumberResponse) => void
}) {
  // ... ( Hook 内部逻辑 )
  const { data, error, loading, run } = useRequest(wrappedRequest, {
    manual: params?.manual ?? true,
    onSuccess: (data) => {
      if (params?.syncToStore) {
        // 仅在 Hook 内部处理 store 交互
        const { setNumbers } = useAppStore.getState() // 获取最新的 store 状态
        setNumbers([data, ...useAppStore.getState().numbers])
      }
      params?.onSuccess?.(data) // 调用外部传入的 onSuccess 回调
    },
    onError: (err) => {
      if (params?.showError) {
        alert(`操作失败: ${err.message}`)
      }
      params?.onError?.(err) // 调用外部传入的 onError 回调
    }
  })
  return { data, error, loading, run }
}

// 组件中使用
function CreateNumberForm() {
  // 组件只声明意图，不直接处理副作用
  const { run: createNumber, loading, error } = useCreateNumber({
    manual: true,
    syncToStore: true, // ✅ 声明式地告诉 Hook 自动同步到 store
    onSuccess: () => {
      resetForm()
    },
  })
  return <form>...</form>
}
```

## Git 提交检查

### 自动检查

项目已配置 `lint-staged`，在 git commit 时会自动运行 ESLint 检查。

如果代码中 `useEffect` 的依赖项不正确，提交会失败并显示警告：

```
warning  React Hook useEffect has a missing dependency: 'someDependency'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
```

### 手动检查

运行以下命令检查代码：

```bash
# 检查所有文件
pnpm lint

# 检查特定目录
pnpm lint apps/count-number/front-end/user/src/
```

## 特殊情况

如果**确实需要**在组件中直接使用 `useEffect`（极少数情况），并且你已经充分理解其副作用和依赖项，请在代码审查中**详细说明理由**，并确保依赖数组是完整的。

## 配置文件位置

- **ESLint 配置**：`.eslintrc.json`（项目根目录）
- **ESLint 忽略**：`.eslintignore`（项目根目录）
- **Lint-staged 配置**：`package.json` 中的 `lint-staged` 字段
