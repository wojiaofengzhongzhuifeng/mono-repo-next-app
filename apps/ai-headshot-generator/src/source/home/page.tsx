import React, { useState, useCallback } from 'react'

// 类型定义
interface IconGeneration {
  id: string
  prompt: string
  imageUrl: string
  style: string
  size: string
  createdAt: Date
}

interface GenerationRequest {
  prompt: string
  style: 'minimalist' | 'colorful' | 'flat' | '3d' | 'sketch' | 'retro'
  size: 'small' | 'medium' | 'large'
  color?: string
}

// 主应用组件
function Page() {
  // 状态管理
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState<GenerationRequest['style']>('minimalist')
  const [size, setSize] = useState<GenerationRequest['size']>('medium')
  const [color, setColor] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [history, setHistory] = useState<IconGeneration[]>([])
  const [error, setError] = useState<string | null>(null)

  // 样式选项
  const styleOptions = [
    {
      value: 'minimalist',
      label: '极简风格',
      description: '简洁线条，现代设计',
    },
    { value: 'colorful', label: '彩色风格', description: '鲜艳色彩，活泼设计' },
    { value: 'flat', label: '扁平风格', description: '2D扁平，无阴影效果' },
    { value: '3d', label: '3D风格', description: '立体效果，视觉冲击' },
    { value: 'sketch', label: '手绘风格', description: '手绘线条，艺术感' },
    { value: 'retro', label: '复古风格', description: '经典复古，怀旧感' },
  ]

  // 尺寸选项
  const sizeOptions = [
    { value: 'small', label: '小尺寸', size: '512x512' },
    { value: 'medium', label: '中尺寸', size: '768x768' },
    { value: 'large', label: '大尺寸', size: '1024x1024' },
  ]

  // 构建完整的提示词
  const buildFullPrompt = useCallback(() => {
    const stylePrompts = {
      minimalist: 'minimalist icon, clean lines, simple design, flat design',
      colorful: 'colorful icon, vibrant colors, modern design',
      flat: 'flat design icon, 2D, no shadows, vector style',
      '3d': '3d icon, depth, realistic, modern 3d design',
      sketch: 'sketch icon, hand drawn, line art, black and white',
      retro: 'retro icon, vintage style, classic design',
    }

    const sizeMap = {
      small: 512,
      medium: 768,
      large: 1024,
    }

    let fullPrompt = `${prompt}, ${stylePrompts[style]}, icon design, ${sizeMap[size]}x${sizeMap[size]}`

    if (color) {
      fullPrompt += `, ${color} color scheme`
    }

    fullPrompt +=
      ', professional, high quality, centered, white background, no text, no letters'

    return fullPrompt
  }, [prompt, style, size, color])

  // 生成图标
  const generateIcon = async () => {
    if (!prompt.trim()) {
      setError('请输入图标描述')
      return
    }

    setIsGenerating(true)
    setError(null)
    setCurrentImage(null)

    try {
      // 调用Google Gemini API生成图像
      const response = await fetch('/api/generate-icon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: buildFullPrompt(),
          style,
          size,
          color,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || '生成失败')
      }

      if (result.success && result.data) {
        setCurrentImage(result.data.imageUrl)

        // 添加到历史记录
        const newIcon: IconGeneration = {
          id: result.data.id,
          prompt,
          imageUrl: result.data.imageUrl,
          style,
          size,
          createdAt: new Date(),
        }

        setHistory(prev => [newIcon, ...prev.slice(0, 11)]) // 保留最近12个
      } else {
        throw new Error(result.error || '生成失败')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试')
    } finally {
      setIsGenerating(false)
    }
  }

  // 下载图片
  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      setError('下载失败，请重试')
    }
  }

  // 清除历史记录
  const clearHistory = () => {
    setHistory([])
    setCurrentImage(null)
  }

  // 从历史记录中选择
  const selectFromHistory = (icon: IconGeneration) => {
    setCurrentImage(icon.imageUrl)
    setPrompt(icon.prompt)
    setStyle(icon.style as GenerationRequest['style'])
    setSize(icon.size as GenerationRequest['size'])
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* 标题 */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>
            AI Icon Generator
          </h1>
          <p className='text-gray-600'>
            基于Google Gemini API的智能图标生成工具
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* 左侧控制面板 */}
          <div className='lg:col-span-1 space-y-6'>
            {/* 输入区域 */}
            <div className='bg-white rounded-lg shadow-md p-6'>
              <h2 className='text-xl font-semibold mb-4'>图标描述</h2>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder='请描述您想要的图标，例如：一个可爱的猫咪头像、一个科技感的齿轮图标...'
                className='w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                disabled={isGenerating}
              />

              {/* 风格选择 */}
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  选择风格
                </label>
                <div className='space-y-2'>
                  {styleOptions.map(option => (
                    <label
                      key={option.value}
                      className='flex items-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50'
                    >
                      <input
                        type='radio'
                        value={option.value}
                        checked={style === option.value}
                        onChange={e =>
                          setStyle(e.target.value as GenerationRequest['style'])
                        }
                        disabled={isGenerating}
                        className='mr-3'
                      />
                      <div>
                        <span className='font-medium'>{option.label}</span>
                        <p className='text-xs text-gray-500'>
                          {option.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 尺寸选择 */}
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  选择尺寸
                </label>
                <div className='grid grid-cols-3 gap-2'>
                  {sizeOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() =>
                        setSize(option.value as GenerationRequest['size'])
                      }
                      disabled={isGenerating}
                      className={`p-2 border rounded-lg text-sm ${
                        size === option.value
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                      <div className='text-xs'>{option.size}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 颜色输入 */}
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  颜色方案（可选）
                </label>
                <input
                  type='text'
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  placeholder='例如：蓝色、渐变紫色、暖色调'
                  className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  disabled={isGenerating}
                />
              </div>

              {/* 生成按钮 */}
              <button
                onClick={generateIcon}
                disabled={isGenerating || !prompt.trim()}
                className='w-full mt-6 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
              >
                {isGenerating ? (
                  <span className='flex items-center justify-center'>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    生成中...
                  </span>
                ) : (
                  '生成图标'
                )}
              </button>

              {/* 错误提示 */}
              {error && (
                <div className='mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* 右侧显示区域 */}
          <div className='lg:col-span-2 space-y-6'>
            {/* 当前生成的图标 */}
            <div className='bg-white rounded-lg shadow-md p-6'>
              <h2 className='text-xl font-semibold mb-4'>生成结果</h2>
              {currentImage ? (
                <div className='space-y-4'>
                  <div className='flex justify-center'>
                    <img
                      src={currentImage}
                      alt='Generated icon'
                      className='max-w-full h-auto rounded-lg shadow-lg'
                      style={{ maxHeight: '400px' }}
                    />
                  </div>
                  <div className='flex justify-center space-x-4'>
                    <button
                      onClick={() =>
                        downloadImage(currentImage, `icon-${Date.now()}.png`)
                      }
                      className='bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors'
                    >
                      下载图标
                    </button>
                    <button
                      onClick={() => setCurrentImage(null)}
                      className='bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors'
                    >
                      清除
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300'>
                  <div className='text-center'>
                    <svg
                      className='mx-auto h-12 w-12 text-gray-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
                    <p className='mt-2 text-gray-500'>输入描述并点击生成按钮</p>
                  </div>
                </div>
              )}
            </div>

            {/* 历史记录 */}
            {history.length > 0 && (
              <div className='bg-white rounded-lg shadow-md p-6'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-xl font-semibold'>历史记录</h2>
                  <button
                    onClick={clearHistory}
                    className='text-sm text-red-600 hover:text-red-800'
                  >
                    清除历史
                  </button>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {history.map(icon => (
                    <div
                      key={icon.id}
                      className='cursor-pointer group relative'
                      onClick={() => selectFromHistory(icon)}
                    >
                      <img
                        src={icon.imageUrl}
                        alt={icon.prompt}
                        className='w-full h-24 object-cover rounded-lg border-2 border-gray-200 group-hover:border-blue-500 transition-colors'
                      />
                      <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-opacity flex items-center justify-center'>
                        <span className='text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity text-center px-1'>
                          {icon.prompt.substring(0, 20)}...
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 使用说明 */}
        <div className='mt-8 bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-xl font-semibold mb-4'>使用说明</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div className='p-4 bg-blue-50 rounded-lg'>
              <h3 className='font-medium text-blue-800 mb-2'>📝 描述技巧</h3>
              <p className='text-sm text-blue-600'>
                使用具体、详细的描述，如"一个蓝色的圆形科技感图标"比"蓝色图标"效果更好
              </p>
            </div>
            <div className='p-4 bg-green-50 rounded-lg'>
              <h3 className='font-medium text-green-800 mb-2'>🎨 风格选择</h3>
              <p className='text-sm text-green-600'>
                根据使用场景选择合适风格，UI设计推荐极简或扁平风格
              </p>
            </div>
            <div className='p-4 bg-purple-50 rounded-lg'>
              <h3 className='font-medium text-purple-800 mb-2'>⚡ 优化建议</h3>
              <p className='text-sm text-purple-600'>
                避免使用文字描述，专注于形状、颜色和风格的描述
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
