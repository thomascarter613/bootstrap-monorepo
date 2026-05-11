import { PhaseEngine } from '../phases/engine.ts';
import type { LLMDriver, Message } from '../llm/types.ts';
import { DOMAIN_SYSTEM_PROMPT, DOMAIN_MODEL_GENERATION_PROMPT } from './domain-prompts.ts';

export class DomainEngine extends PhaseEngine {
  constructor(driver: LLMDriver, initialHistory?: Message[]) {
    super(driver, DOMAIN_SYSTEM_PROMPT, '[DOMAIN_COMPLETE]', initialHistory);
  }

  async generateDomainModel(): Promise<string> {
    return await this.generateDeliverable(DOMAIN_MODEL_GENERATION_PROMPT);
  }
}
