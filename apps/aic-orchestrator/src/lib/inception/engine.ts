import { PhaseEngine } from '../phases/engine.ts';
import type { LLMDriver, Message } from '../llm/types.ts';
import { SOCRATIC_SYSTEM_PROMPT, CHARTER_GENERATION_PROMPT } from './prompts.ts';

export class InceptionEngine extends PhaseEngine {
  constructor(driver: LLMDriver, initialHistory?: Message[]) {
    super(driver, SOCRATIC_SYSTEM_PROMPT, '[INCEPTION_COMPLETE]', initialHistory);
  }

  async generateCharter(): Promise<string> {
    return await this.generateDeliverable(CHARTER_GENERATION_PROMPT);
  }
}
