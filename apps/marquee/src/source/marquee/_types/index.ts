export type EffectType = 'marquee' | 'blink' | 'sequential-light'

export type Direction = 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top'

export interface MarqueeConfig {
  text: string
  effectType: EffectType
  direction?: Direction
  speed?: number
  frequency?: number
  isPlaying: boolean
}

export interface MarqueeState {
  config: MarqueeConfig
  setConfig: (config: Partial<MarqueeConfig>) => void
  start: () => void
  stop: () => void
  reset: () => void
}
