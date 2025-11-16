import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleGenerativeAI } from '@google/generative-ai'

// API配置 - 支持多个服务商
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

// Replicate API配置
const REPLICATE_API_URL = 'https://api.replicate.com/v1/predictions'

// Google Gemini API配置 - 支持代理和直连
const GEMINI_API_URL =
  process.env.GEMINI_API_URL ||
  'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImage'
const PROXY_URL =
  process.env.PROXY_URL ||
  'http://localhost:3001/google-api/v1beta/models/imagen-3.0-generate-001:generateImage'

// 网络配置
const REQUEST_TIMEOUT = 60000 // 60秒超时
const MAX_RETRIES = 3 // 最大重试次数

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const { prompt, style, size, color } = req.body

    if (!prompt || prompt.trim().length === 0) {
      return res
        .status(400)
        .json({ success: false, error: 'Prompt is required' })
    }

    // 优先使用Google Gemini API
    if (GEMINI_API_KEY) {
      return await handleGeminiAPI(req, res, { prompt, style, size, color })
    }

    // 备用：使用Replicate API
    if (REPLICATE_API_TOKEN) {
      return await handleReplicateAPI(req, res, { prompt, style, size, color })
    }

    return res.status(500).json({
      success: false,
      error:
        'No API key configured. Please set REPLICATE_API_TOKEN or GEMINI_API_KEY',
    })
  } catch (error) {
    console.error('Error generating icon:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    })
  }
}

// 处理Replicate API
async function handleReplicateAPI(
  req: NextApiRequest,
  res: NextApiResponse,
  { prompt, style, size, color }: any
) {
  try {
    // 构建Replicate请求
    const replicateRequest = {
      version:
        'ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4', // Stable Diffusion
      input: {
        prompt: buildPrompt(prompt, style, color),
        width: size === 'small' ? 512 : size === 'medium' ? 768 : 1024,
        height: size === 'small' ? 512 : size === 'medium' ? 768 : 1024,
        num_outputs: 1,
        num_inference_steps: 20,
        guidance_scale: 7.5,
      },
    }

    // 启动预测
    const response = await fetch(REPLICATE_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(replicateRequest),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Replicate API error:', errorData)
      throw new Error(
        `Replicate API error: ${response.status} ${response.statusText}`
      )
    }

    const prediction = await response.json()
    console.log('Replicate prediction started:', prediction)

    // 轮询获取结果
    let result = prediction
    let attempts = 0
    const maxAttempts = 30

    while (
      result.status !== 'succeeded' &&
      result.status !== 'failed' &&
      attempts < maxAttempts
    ) {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const pollResponse = await fetch(`${REPLICATE_API_URL}/${result.id}`, {
        headers: {
          Authorization: `Token ${REPLICATE_API_TOKEN}`,
        },
      })

      if (pollResponse.ok) {
        result = await pollResponse.json()
        console.log(`Poll attempt ${attempts + 1}:`, result.status)
      }

      attempts++
    }

    if (
      result.status !== 'succeeded' ||
      !result.output ||
      result.output.length === 0
    ) {
      throw new Error('Failed to generate image')
    }

    // 构建返回结果
    const iconResult = {
      id: `icon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      prompt,
      imageUrl: result.output[0],
      style,
      size,
      createdAt: new Date(),
      downloadUrl: result.output[0],
    }

    res.status(200).json({ success: true, data: iconResult })
  } catch (error) {
    console.error('Replicate API error:', error)
    throw error
  }
}

// 处理Google Gemini API - 增强网络错误处理
async function handleGeminiAPI(
  req: NextApiRequest,
  res: NextApiResponse,
  { prompt, style, size, color }: any
) {
  let lastError: Error | null = null

  // 尝试不同的连接方式：代理服务器 -> 直连 -> 备用API
  const endpoints = [
    { url: PROXY_URL, name: '代理服务器' },
    { url: GEMINI_API_URL, name: '直连API' },
  ]

  for (const endpoint of endpoints) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`尝试 ${endpoint.name} 第${attempt}次...`)

        const result = await callGeminiAPI(endpoint.url, prompt, style, color)

        const iconResult = {
          id: `icon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          prompt,
          imageUrl: result.imageUrl,
          style,
          size,
          createdAt: new Date(),
          downloadUrl: result.imageUrl,
        }

        console.log(`✅ ${endpoint.name} 成功生成图标`)
        return res.status(200).json({ success: true, data: iconResult })
      } catch (error) {
        lastError = error as Error
        console.error(
          `❌ ${endpoint.name} 第${attempt}次失败:`,
          (error as Error).message
        )

        // 如果是网络错误，等待后重试
        if (isNetworkError(error as Error)) {
          await new Promise(resolve => setTimeout(resolve, 2000 * attempt))
        }
      }
    }
  }

  // 所有尝试都失败，尝试使用生成式文本API生成描述
  try {
    console.log('🔄 尝试使用文本生成作为备用方案...')
    const description = await generateTextDescription(prompt, style, color)

    const iconResult = {
      id: `icon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      prompt,
      imageUrl: null,
      style,
      size,
      createdAt: new Date(),
      downloadUrl: null,
      description,
      fallback: true,
    }

    return res.status(200).json({
      success: true,
      data: iconResult,
      warning: '图像生成失败，已生成设计描述作为备用方案',
    })
  } catch (textError) {
    console.error('文本生成也失败:', textError)
    throw lastError || new Error('所有生成方式都失败')
  }
}

// 调用Gemini API的核心函数
async function callGeminiAPI(
  apiUrl: string,
  prompt: string,
  style: string,
  color?: string
): Promise<{ imageUrl: string }> {
  const geminiRequest = {
    prompt: buildPrompt(prompt, style, color),
    number_of_images: 1,
    aspect_ratio: '1:1',
    safety_filter_level: 'block_some',
    person_generation: 'allow_adult',
    enhance_prompt: true,
    language: 'zh-cn',
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

  try {
    const url = apiUrl.includes('localhost')
      ? `${apiUrl}?key=${GEMINI_API_KEY}`
      : `${apiUrl}?key=${GEMINI_API_KEY}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AI-Icon-Generator/1.0',
      },
      body: JSON.stringify(geminiRequest),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(
        `API请求失败: ${response.status} ${response.statusText} - ${errorData}`
      )
    }

    const result = await response.json()
    console.log('Gemini API 响应成功')

    if (!result.generatedImages || result.generatedImages.length === 0) {
      throw new Error('API返回了空的结果')
    }

    const generatedImage = result.generatedImages[0]
    const imageUrl = generatedImage.imageBase64
      ? `data:image/png;base64,${generatedImage.imageBase64}`
      : generatedImage.imageUri

    if (!imageUrl) {
      throw new Error('无法获取图像URL')
    }

    return { imageUrl }
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('请求超时')
      }
      throw error
    }

    throw new Error('未知错误')
  }
}

// 使用生成式文本API创建描述
async function generateTextDescription(
  prompt: string,
  style: string,
  color?: string
): Promise<string> {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error('未配置Gemini API密钥')
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const fullPrompt = `
作为专业的设计师，请为以下需求创建一个详细的图标设计描述：

需求：${prompt}
风格：${style}
${color ? `颜色：${color}` : ''}

请提供：
1. 具体的视觉描述
2. 设计元素和构图建议
3. 颜色搭配方案
4. 适合的应用场景

请用中文回答，语言要具体且专业。
`

    const result = await Promise.race([
      model.generateContent(fullPrompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('文本生成超时')), 30000)
      ),
    ])

    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('文本生成失败:', error)
    throw error
  }
}

// 判断是否为网络错误
function isNetworkError(error: Error): boolean {
  const networkErrorMessages = [
    'fetch failed',
    'network error',
    'ECONNREFUSED',
    'ETIMEDOUT',
    'ENOTFOUND',
    '请求超时',
    'API请求失败',
  ]

  return networkErrorMessages.some(msg =>
    error.message.toLowerCase().includes(msg.toLowerCase())
  )
}

// 构建提示词
function buildPrompt(
  basePrompt: string,
  style: string,
  color?: string
): string {
  const stylePrompts = {
    minimalist: 'minimalist icon, clean lines, simple design, flat design',
    colorful: 'colorful icon, vibrant colors, modern design',
    flat: 'flat design icon, 2D, no shadows, vector style',
    '3d': '3d icon, depth, realistic, modern 3d design',
    sketch: 'sketch icon, hand drawn, line art, black and white',
    retro: 'retro icon, vintage style, classic design',
  }

  let fullPrompt = `${basePrompt}, ${stylePrompts[style as keyof typeof stylePrompts]}, icon design, professional, high quality, centered, white background, no text, no letters`

  if (color) {
    fullPrompt += `, ${color} color scheme`
  }

  return fullPrompt
}
