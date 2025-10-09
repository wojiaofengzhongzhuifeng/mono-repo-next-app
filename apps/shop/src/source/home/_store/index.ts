import { create } from 'zustand'
import { Category } from '@/source/home/_api/get-category'

interface AppStore {
  countNumber: number
  setCountNumber: (newNumber: number) => void

  testList: number[] | null
  setTestList: (newList: number[]) => void

    //新增代码
    // 新增：添加 number2 状态（类型为 number，初始值后续设为 3）
    number2: number
    // （可选）如果需要修改 number2，可添加对应的修改方法
    setNumber2: (newValue: number) => void

    test:string | null
    setTest:(newValue: string)=>void

    // 新增：category 数据状态管理
    categories: Category[] | null
    setCategories: (newCategories: Category[]) => void
    
    // 新增：当前选中的分类ID
    selectedCategoryId: number | null
    setSelectedCategoryId: (categoryId: number | null) => void
}

export const useAppStore = create<AppStore>(set => ({
  countNumber: 100,
  setCountNumber: (newNumber: number) => set({ countNumber: newNumber }),

  //新增代码
  testList: null,
  setTestList: (newList: number[]) => set({ testList: newList }),
    // 新增：number2 初始值设为 3
    number2: 3,
    // （可选）新增修改 number2 的方法（通过 set 函数更新状态）
    setNumber2: (newValue: number) => set({ number2: newValue }),

    test:null,
    setTest:(newValue:string)=>set({test:newValue}),

    // 新增：category 数据初始值和设置方法
    categories: null,
    setCategories: (newCategories: Category[]) => set({ categories: newCategories }),
    
    // 新增：当前选中的分类ID初始值和设置方法
    selectedCategoryId: null,
    setSelectedCategoryId: (categoryId: number | null) => set({ selectedCategoryId: categoryId })
}))
