import React from 'react'
import { useTranslation } from 'next-i18next'
import { useMarqueeStore } from '../../_store'
import type { EffectType, Direction } from '../../_types'

export const InputArea: React.FC = () => {
  const { t } = useTranslation('common')
  const { config, setConfig, start, stop, reset } = useMarqueeStore()

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ text: e.target.value })
  }

  const handleEffectTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConfig({ effectType: e.target.value as EffectType })
  }

  const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConfig({ direction: e.target.value as Direction })
  }

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ speed: Number(e.target.value) })
  }

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ frequency: Number(e.target.value) })
  }

  const handleStart = () => {
    start()
  }

  const handleStop = () => {
    stop()
  }

  const handleReset = () => {
    reset()
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>{t('inputArea')}</h2>

      <div className='space-y-4'>
        {/* 文本输入 */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            {t('textInput')}
          </label>
          <input
            type='text'
            value={config.text}
            onChange={handleTextChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='请输入要展示的文字'
          />
        </div>

        {/* 效果类型选择 */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            {t('effectType')}
          </label>
          <select
            value={config.effectType}
            onChange={handleEffectTypeChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='marquee'>{t('marqueeEffect')}</option>
            <option value='blink'>{t('blinkEffect')}</option>
            <option value='sequential-light'>
              {t('sequentialLightEffect')}
            </option>
          </select>
        </div>

        {/* 方向选择（仅跑马灯效果显示） */}
        {config.effectType === 'marquee' && (
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              {t('direction')}
            </label>
            <select
              value={config.direction}
              onChange={handleDirectionChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='left-to-right'>{t('leftToRight')}</option>
              <option value='right-to-left'>{t('rightToLeft')}</option>
              <option value='top-to-bottom'>{t('topToBottom')}</option>
              <option value='bottom-to-top'>{t('bottomToTop')}</option>
            </select>
          </div>
        )}

        {/* 速度控制（跑马灯效果） */}
        {config.effectType === 'marquee' && (
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              {t('speed')}: {config.speed}s
            </label>
            <input
              type='range'
              min='1'
              max='20'
              value={config.speed}
              onChange={handleSpeedChange}
              className='w-full'
            />
          </div>
        )}

        {/* 频率控制（闪烁效果） */}
        {config.effectType === 'blink' && (
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              {t('frequency')}: {config.frequency}秒
            </label>
            <input
              type='range'
              min='0.5'
              max='5'
              step='0.5'
              value={config.frequency}
              onChange={handleFrequencyChange}
              className='w-full'
            />
          </div>
        )}

        {/* 控制按钮 */}
        <div className='flex space-x-4 pt-4'>
          {!config.isPlaying ? (
            <button
              onClick={handleStart}
              className='flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors'
            >
              {t('start')}
            </button>
          ) : (
            <button
              onClick={handleStop}
              className='flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors'
            >
              {t('stop')}
            </button>
          )}
          <button
            onClick={handleReset}
            className='flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors'
          >
            {t('reset')}
          </button>
        </div>
      </div>
    </div>
  )
}
