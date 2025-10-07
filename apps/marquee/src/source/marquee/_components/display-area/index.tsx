import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useMarqueeStore } from '../../_store'
import { cn } from '@/lib/utils'

export const DisplayArea: React.FC = () => {
  const { t } = useTranslation('common')
  const { config } = useMarqueeStore()
  const [sequentialChars, setSequentialChars] = useState<string[]>([])

  // 处理逐字点亮效果
  useEffect(() => {
    if (config.effectType === 'sequential-light' && config.text) {
      const chars = config.text.split('')
      setSequentialChars(chars)
    }
  }, [config.text, config.effectType])

  // 获取跑马灯动画类名
  const getMarqueeClassName = () => {
    if (!config.isPlaying) return ''
    
    switch (config.direction) {
      case 'left-to-right':
        return 'marquee-left-to-right'
      case 'right-to-left':
        return 'marquee-right-to-left'
      case 'top-to-bottom':
        return 'marquee-top-to-bottom'
      case 'bottom-to-top':
        return 'marquee-bottom-to-top'
      default:
        return 'marquee-left-to-right'
    }
  }

  // 获取动画样式
  const getAnimationStyle = () => {
    if (!config.isPlaying) return {}
    
    if (config.effectType === 'marquee') {
      return {
        animationDuration: `${config.speed}s`,
      }
    }
    
    if (config.effectType === 'blink') {
      return {
        animationDuration: `${config.frequency}s`,
      }
    }
    
    return {}
  }

  // 渲染跑马灯效果
  const renderMarqueeEffect = () => {
    return (
      <div className="marquee-container h-20 flex items-center justify-center bg-gray-100 rounded-lg">
        <div
          className={cn(
            'marquee-content text-2xl font-bold text-blue-600',
            getMarqueeClassName()
          )}
          style={getAnimationStyle()}
        >
          {config.text || '请输入文字'}
        </div>
      </div>
    )
  }

  // 渲染闪烁效果
  const renderBlinkEffect = () => {
    return (
      <div className="h-20 flex items-center justify-center bg-gray-100 rounded-lg">
        <div
          className={cn(
            'text-2xl font-bold text-blue-600',
            config.isPlaying && 'blink-effect'
          )}
          style={getAnimationStyle()}
        >
          {config.text || '请输入文字'}
        </div>
      </div>
    )
  }

  // 渲染逐字点亮效果
  const renderSequentialLightEffect = () => {
    return (
      <div className="h-20 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="sequential-light text-2xl font-bold text-blue-600">
          {sequentialChars.map((char, index) => (
            <span
              key={index}
              className="char"
              style={{
                animationDelay: config.isPlaying ? `${index * 0.3}s` : '0s',
                animationPlayState: config.isPlaying ? 'running' : 'paused',
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    )
  }

  // 根据效果类型渲染对应的内容
  const renderEffect = () => {
    switch (config.effectType) {
      case 'marquee':
        return renderMarqueeEffect()
      case 'blink':
        return renderBlinkEffect()
      case 'sequential-light':
        return renderSequentialLightEffect()
      default:
        return renderMarqueeEffect()
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{t('displayArea')}</h2>
      
      <div className="space-y-4">
        {/* 效果展示区域 */}
        <div className="min-h-[120px]">
          {renderEffect()}
        </div>
        
        {/* 效果说明 */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">当前效果说明</h3>
          <p className="text-blue-700 text-sm">
            {config.effectType === 'marquee' && (
              `跑马灯效果：文字从${config.direction === 'left-to-right' ? '左到右' : 
                config.direction === 'right-to-left' ? '右到左' : 
                config.direction === 'top-to-bottom' ? '上到下' : '下到上'}移动，速度为${config.speed}秒`
            )}
            {config.effectType === 'blink' && (
              `闪烁效果：文字每${config.frequency}秒闪烁一次`
            )}
            {config.effectType === 'sequential-light' && (
              '逐字点亮效果：文字按顺序逐个亮起，每个字符间隔0.3秒'
            )}
          </p>
        </div>
        
        {/* 状态指示器 */}
        <div className="flex items-center space-x-2">
          <div className={cn(
            'w-3 h-3 rounded-full',
            config.isPlaying ? 'bg-green-500' : 'bg-gray-400'
          )} />
          <span className="text-sm text-gray-600">
            {config.isPlaying ? '正在播放' : '已停止'}
          </span>
        </div>
      </div>
    </div>
  )
}
