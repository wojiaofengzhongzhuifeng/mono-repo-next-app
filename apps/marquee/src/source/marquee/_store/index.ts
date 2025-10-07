import { create } from 'zustand'
import type { MarqueeConfig, MarqueeState } from '../_types'

const defaultConfig: MarqueeConfig = {
  text: '欢迎使用跑马灯效果！',
  effectType: 'marquee',
  direction: 'left-to-right',
  speed: 10,
  frequency: 1,
  isPlaying: false,
}

export const useMarqueeStore = create<MarqueeState>((set, get) => ({
  config: defaultConfig,
  
  setConfig: (newConfig: Partial<MarqueeConfig>) => {
    set((state) => ({
      config: { ...state.config, ...newConfig }
    }))
  },
  
  start: () => {
    set((state) => ({
      config: { ...state.config, isPlaying: true }
    }))
  },
  
  stop: () => {
    set((state) => ({
      config: { ...state.config, isPlaying: false }
    }))
  },
  
  reset: () => {
    set({ config: defaultConfig })
  },
}))
