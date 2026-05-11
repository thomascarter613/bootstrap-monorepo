import type { DriverConfig, LLMDriver } from './types.ts';
import { OllamaDriver } from './drivers/ollama.ts';
import { GeminiDriver } from './drivers/gemini.ts';

export class DriverFactory {
  static create(config: DriverConfig): LLMDriver {
    switch (config.provider) {
      case 'ollama':
        return new OllamaDriver({
          baseUrl: config.baseUrl,
          model: config.model,
        });
      case 'gemini': {
        const apiKey = config.apiKey || process.env.GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error('Gemini API key is required. Provide it via config or GEMINI_API_KEY environment variable.');
        }
        return new GeminiDriver(apiKey, config.model);
      }
      case 'openai':
        throw new Error(`Provider "${config.provider}" is not yet implemented.`);
      default:
        throw new Error(`Unknown provider: ${(config as any).provider}`);
    }
  }
}
