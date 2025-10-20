export interface IconGenerationRequest {
  prompt: string
  style?: 'minimalist' | 'colorful' | 'flat' | '3d' | 'sketch' | 'retro'
  size?: 'small' | 'medium' | 'large'
  color?: string
  negativePrompt?: string
}

export interface IconGenerationResult {
  id: string
  prompt: string
  imageUrl: string
  style: string
  size: string
  createdAt: Date
  downloadUrl?: string
}

export interface IconGenerationState {
  isGenerating: boolean
  currentResult: IconGenerationResult | null
  history: IconGenerationResult[]
  error: string | null
}

export interface APIResponse {
  success: boolean
  data?: IconGenerationResult
  error?: string
}

export interface ReplicatePrediction {
  id: string
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled'
  output?: string[]
  error?: string
  logs?: string
}
