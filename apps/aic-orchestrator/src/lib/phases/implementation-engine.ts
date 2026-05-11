import { PhaseEngine } from './engine.ts';
import type { LLMDriver, Message } from '../llm/types.ts';
import { IMPLEMENTATION_SYSTEM_PROMPT, CODE_GENERATION_PROMPT } from './implementation-prompts.ts';

export interface GeneratedFile {
  path: string;
  content: string;
}

export class ImplementationEngine extends PhaseEngine {
  constructor(driver: LLMDriver, initialHistory?: Message[]) {
    super(driver, IMPLEMENTATION_SYSTEM_PROMPT, '[IMPLEMENTATION_COMPLETE]', initialHistory);
  }

  async generateInitialCode(): Promise<GeneratedFile[]> {
    const rawContent = await this.generateDeliverable(CODE_GENERATION_PROMPT);
    return this.parseGeneratedFiles(rawContent);
  }

  public parseGeneratedFiles(content: string): GeneratedFile[] {
    const files: GeneratedFile[] = [];
    const lines = content.split('\n');
    let currentPath = '';
    let currentContent: string[] = [];
    let inCodeBlock = false;

    for (const line of lines) {
      if (line.startsWith('FILE_PATH:')) {
        currentPath = line.replace('FILE_PATH:', '').trim();
        continue;
      }

      if (line.startsWith('\`\`\`')) {
        if (inCodeBlock) {
          // End of code block
          files.push({
            path: currentPath,
            content: currentContent.join('\n')
          });
          currentContent = [];
          inCodeBlock = false;
        } else {
          // Start of code block
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        currentContent.push(line);
      }
    }

    return files;
  }
}
