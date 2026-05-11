import { PhaseEngine } from './engine.ts';
import type { LLMDriver, Message } from '../llm/types.ts';
import { ARCHITECTURE_SYSTEM_PROMPT, ARCHITECTURE_OVERVIEW_GENERATION_PROMPT, ADR_GENERATION_PROMPT } from './architecture-prompts.ts';

export class ArchitectureEngine extends PhaseEngine {
  constructor(driver: LLMDriver, initialHistory?: Message[]) {
    super(driver, ARCHITECTURE_SYSTEM_PROMPT, '[ARCHITECTURE_COMPLETE]', initialHistory);
  }

  async generateOverview(): Promise<string> {
    return await this.generateDeliverable(ARCHITECTURE_OVERVIEW_GENERATION_PROMPT);
  }

  async generateADR(): Promise<string> {
    return await this.generateDeliverable(ADR_GENERATION_PROMPT);
  }
}
