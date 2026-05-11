export type MessageRole = 'system' | 'user' | 'assistant';

export interface Message {
  role: MessageRole;
  content: string;
}

export interface PromptOptions {
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  onToken?: (token: string) => void;
}

export interface LLMDriver {
  readonly name: string;
  generateText(messages: Message[], options?: PromptOptions): Promise<string>;
}

export interface DriverConfig {
  provider: 'ollama' | 'gemini' | 'openai';
  model: string;
  baseUrl?: string;
  apiKey?: string;
}
