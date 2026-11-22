export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export type LlmParams = {
  model: string
  temperature: number
  maxTokens: number
  topP?: number
  topK?: number
  frequencyPenalty?: number
  presencePenalty?: number
  systemPrompt: string
  stream: boolean
}

export type LoadingType = 'idle' | 'message' | 'stream'
