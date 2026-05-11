import { PhaseEngine } from './engine.ts';
import type { LLMDriver, Message } from '../llm/types.ts';
import { SRS_SYSTEM_PROMPT, SRS_GENERATION_PROMPT } from './srs-prompts.ts';

export class SRSEngine extends PhaseEngine {
  constructor(driver: LLMDriver, initialHistory?: Message[]) {
    super(driver, SRS_SYSTEM_PROMPT, '[SRS_COMPLETE]', initialHistory);
  }

  async generateSRS(): Promise<string> {
    return await this.generateDeliverable(SRS_GENERATION_PROMPT);
  }
}
