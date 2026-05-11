import { GoogleGenerativeAI } from '@google/generative-ai';
import type { LLMDriver, Message, PromptOptions } from '../types.ts';

export class GeminiDriver implements LLMDriver {
  readonly name = 'gemini';
  private genAI: GoogleGenerativeAI;
  private modelName: string;

  constructor(apiKey: string, modelName: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.modelName = modelName;
  }

  async generateText(messages: Message[], options?: PromptOptions): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: this.modelName });
    
    // Map our message format to Gemini's
    const systemPrompt = messages.find(m => m.role === 'system')?.content || '';
    const contents = messages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

    if (options?.onToken) {
      const result = await model.generateContentStream({
        systemInstruction: systemPrompt,
        contents: contents,
        generationConfig: {
          temperature: options.temperature,
          maxOutputTokens: options.maxTokens,
        }
      });

      let fullText = '';
      for await (const chunk of result.stream) {
        const text = chunk.text();
        fullText += text;
        options.onToken(text);
      }
      return fullText;
    } else {
      const result = await model.generateContent({
        systemInstruction: systemPrompt,
        contents: contents,
        generationConfig: {
          temperature: options?.temperature,
          maxOutputTokens: options?.maxTokens,
        }
      });
      return result.response.text();
    }
  }
}
