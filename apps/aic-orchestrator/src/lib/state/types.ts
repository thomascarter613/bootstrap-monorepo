import type { Message } from '../llm/types.ts';

export type SDLCPhase = 'inception' | 'requirements' | 'domain-modeling' | 'architecture' | 'planning' | 'implementation' | 'verification' | 'design';

export interface PhaseStatus {
  phase: SDLCPhase;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface ProjectState {
  name: string;
  currentPhase: SDLCPhase;
  phases: PhaseStatus[];
  history: Message[];
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
