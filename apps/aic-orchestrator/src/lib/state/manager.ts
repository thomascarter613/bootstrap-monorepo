import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { ProjectState, SDLCPhase } from './types.ts';

export class StateManager {
  private baseDir: string;

  constructor(workspaceRoot: string) {
    this.baseDir = join(workspaceRoot, 'workspace', 'state', 'projects');
  }

  private getPath(projectName: string): string {
    return join(this.baseDir, `${projectName.toLowerCase()}.json`);
  }

  async ensureDir(): Promise<void> {
    await mkdir(this.baseDir, { recursive: true });
  }

  async saveProject(state: ProjectState): Promise<void> {
    await this.ensureDir();
    state.updatedAt = new Date().toISOString();
    await writeFile(this.getPath(state.name), JSON.stringify(state, null, 2));
  }

  async loadProject(projectName: string): Promise<ProjectState | null> {
    try {
      const content = await readFile(this.getPath(projectName), 'utf-8');
      return JSON.parse(content) as ProjectState;
    } catch (error) {
      return null;
    }
  }

  async listProjects(): Promise<ProjectState[]> {
    try {
      await this.ensureDir();
      const files = await readdir(this.baseDir);
      const projects: ProjectState[] = [];
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const content = await readFile(join(this.baseDir, file), 'utf-8');
          projects.push(JSON.parse(content));
        }
      }
      return projects;
    } catch (error) {
      return [];
    }
  }

  static createInitialState(name: string): ProjectState {
    const now = new Date().toISOString();
    return {
      name,
      currentPhase: 'inception',
      history: [],
      metadata: {},
      createdAt: now,
      updatedAt: now,
      phases: [
        { phase: 'inception', status: 'in-progress', startedAt: now, updatedAt: now }
      ]
    };
  }
}
