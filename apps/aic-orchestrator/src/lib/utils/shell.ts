import { spawn } from 'node:child_process';

export interface CommandResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

export async function runCommand(command: string, args: string[] = [], cwd?: string): Promise<CommandResult> {
  return new Promise((resolve) => {
    const process = spawn(command, args, { 
      cwd, 
      shell: true,
      env: { ...process.env, FORCE_COLOR: '0' } // Ensure plain text output for LLM
    });

    let stdout = '';
    let stderr = '';

    process.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    process.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    process.on('close', (code) => {
      resolve({ stdout, stderr, exitCode: code });
    });
  });
}
