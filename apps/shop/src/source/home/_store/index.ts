import { create } from 'zustand'
import { Category } from '@/source/home/_api/get-category'
import { Banner } from '@/source/home/_api/get-banner'

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

  test: string | null
  setTest: (newValue: string) => void

  // 新增：category 数据状态管理
  categories: Category[] | null
  setCategories: (newCategories: Category[]) => void

  // 新增：当前选中的分类ID
  selectedCategoryId: number | null
  setSelectedCategoryId: (categoryId: number | null) => void

  // 新增：banner 数据状态管理
  banners: Banner[] | null
  setBanners: (newBanners: Banner[]) => void

  // 新增：购物车商品数据（支持多个商品）
  cartItems: any[]
  addToCart: (item: any) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  updateCartItemQuantity: (itemId: string, quantity: number) => void
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

  test: null,
  setTest: (newValue: string) => set({ test: newValue }),

  // 新增：category 数据初始值和设置方法
  categories: null,
  setCategories: (newCategories: Category[]) =>
    set({ categories: newCategories }),

  // 新增：当前选中的分类ID初始值和设置方法
  selectedCategoryId: null,
  setSelectedCategoryId: (categoryId: number | null) =>
    set({ selectedCategoryId: categoryId }),

  // 新增：banner 数据初始值和设置方法
  banners: null,
  setBanners: (newBanners: Banner[]) => set({ banners: newBanners }),

  // 新增：购物车商品数据初始值和方法
  cartItems: [],
  addToCart: (item) => set((state) => {
    const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      // 如果商品已存在，更新数量
      return {
        cartItems: state.cartItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + (item.quantity || 1) }
            : cartItem
        )
      }
    } else {
      // 如果商品不存在，添加到购物车
      return { cartItems: [...state.cartItems, { ...item, quantity: item.quantity || 1 }] }
    }
  }),
  removeFromCart: (itemId) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.id !== itemId)
  })),
  clearCart: () => set({ cartItems: [] }),
  updateCartItemQuantity: (itemId, quantity) => set((state) => ({
    cartItems: state.cartItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )
  })),
}))
