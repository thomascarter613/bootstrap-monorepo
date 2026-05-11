import type { LLMDriver, Message, PromptOptions } from '../llm/types.ts';

export interface PhaseResult {
  response: string;
  thought?: string;
  isComplete: boolean;
}

export class PhaseEngine {
  protected history: Message[] = [];
  protected driver: LLMDriver;
  protected systemPrompt: string;
  protected completionSignal: string;

  constructor(driver: LLMDriver, systemPrompt: string, completionSignal: string, initialHistory?: Message[]) {
    this.driver = driver;
    this.systemPrompt = systemPrompt;
    this.completionSignal = completionSignal;

    if (initialHistory && initialHistory.length > 0) {
      this.history = [...initialHistory];
    } else {
      this.history.push({ role: 'system', content: this.systemPrompt });
    }
  }

  async next(userInput: string, options?: PromptOptions): Promise<PhaseResult> {
    this.history.push({ role: 'user', content: userInput });

    const fullResponse = await this.driver.generateText(this.history, options);
    this.history.push({ role: 'assistant', content: fullResponse });

    const thoughtMatch = fullResponse.match(/<thought>([\s\S]*?)<\/thought>/i);
    const thought = thoughtMatch ? thoughtMatch[1].trim() : undefined;
    let cleanedResponse = fullResponse.replace(/<thought>([\s\S]*?)<\/thought>/i, '').trim();

    const isComplete = cleanedResponse.includes(this.completionSignal);
    cleanedResponse = cleanedResponse.replace(this.completionSignal, '').trim();

    return {
      response: cleanedResponse,
      thought,
      isComplete,
    };
  }

  async generateDeliverable(prompt: string): Promise<string> {
    const messages: Message[] = [
      ...this.history,
      { role: 'user', content: prompt }
    ];

    return await this.driver.generateText(messages);
  }

  getHistory(): Message[] {
    return this.history;
  }
}
