import type { LLMDriver, Message, PromptOptions } from '../types.ts';

export interface OllamaOptions {
  baseUrl?: string;
  model: string;
}

export class OllamaDriver implements LLMDriver {
  readonly name = 'ollama';
  private baseUrl: string;
  private model: string;

  constructor(options: OllamaOptions) {
    this.baseUrl = options.baseUrl || 'http://localhost:11434';
    this.model = options.model;
  }

  async generateText(messages: Message[], options?: PromptOptions): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          stream: !!options?.onToken,
          options: {
            temperature: options?.temperature ?? 0.7,
            num_predict: options?.maxTokens,
          },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Ollama API error (${response.status}): ${errorBody}`);
      }

      if (options?.onToken && response.body) {
        let fullText = '';
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(l => l.trim());
          
          for (const line of lines) {
            try {
              const json = JSON.parse(line);
              if (json.message?.content) {
                fullText += json.message.content;
                options.onToken(json.message.content);
              }
            } catch (e) {
              // Ignore partial JSON chunks
            }
          }
        }
        return fullText;
      } else {
        const data = await response.json() as { message: { content: string } };
        return data.message.content;
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(`Failed to connect to Ollama at ${this.baseUrl}. Is it running?`);
      }
      throw error;
    }
  }
}
