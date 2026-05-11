import { PhaseEngine } from './engine.ts';
import type { LLMDriver, Message } from '../llm/types.ts';
import { PLANNING_SYSTEM_PROMPT, WORK_PACKET_GENERATION_PROMPT } from './planning-prompts.ts';

export class PlanningEngine extends PhaseEngine {
  constructor(driver: LLMDriver, initialHistory?: Message[]) {
    super(driver, PLANNING_SYSTEM_PROMPT, '[PLANNING_COMPLETE]', initialHistory);
  }

  async generateWorkPackets(): Promise<string[]> {
    const rawContent = await this.generateDeliverable(WORK_PACKET_GENERATION_PROMPT);
    return rawContent.split('---WP_BOUNDARY---').map(wp => wp.trim()).filter(wp => wp.length > 0);
  }
}
