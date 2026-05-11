import { intro, outro, text, isCancel, cancel, spinner, note, select, confirm } from '@clack/prompts';
import { Command } from 'commander';
import pc from 'picocolors';
import { DriverFactory } from './lib/llm/factory.ts';
import { InceptionEngine } from './lib/inception/engine.ts';
import { SRSEngine } from './lib/phases/srs-engine.ts';
import { DomainEngine } from './lib/phases/domain-engine.ts';
import { ArchitectureEngine } from './lib/phases/architecture-engine.ts';
import { PlanningEngine } from './lib/phases/planning-engine.ts';
import { ImplementationEngine } from './lib/phases/implementation-engine.ts';
import { StateManager } from './lib/state/manager.ts';
import type { ProjectState } from './lib/state/types.ts';
import type { PhaseEngine } from './lib/phases/engine.ts';
import { writeFile, mkdir, readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const WORKSPACE_ROOT = '/data/WORKSPACES/aic/bootstrap-monorepo';
const stateManager = new StateManager(WORKSPACE_ROOT);
const program = new Command();

async function runPhase(
  engine: PhaseEngine, 
  projectName: string, 
  state: ProjectState, 
  initialInput: string,
  phaseName: string,
  verbose: boolean = false
): Promise<boolean> {
  let currentInput = initialInput;
  let isComplete = false;

  while (!isComplete) {
    const s = spinner();
    s.start(`AI is thinking (${phaseName})...`);
    
    try {
      let fullResponse = '';
      const result = await engine.next(currentInput, {
        onToken: (token) => {
          if (fullResponse === '') {
            s.stop(`AI (${phaseName}):`);
          }
          // Note: we don't stream the thought block in runPhase 
          // because we need to parse it after the full response is received
          fullResponse += token;
        }
      });

      if (fullResponse === '') {
        s.stop(`AI (${phaseName}):`);
      }

      if (verbose && result.thought) {
        note(pc.dim(result.thought), 'AI Reasoning Trace');
      }

      console.log(pc.dim(result.response));
      process.stdout.write('\n');
      
      isComplete = result.isComplete;
      
      // Save state after each turn
      state.history = engine.getHistory();
      await stateManager.saveProject(state);

      if (isComplete) {
        note(`The ${phaseName} phase is now complete.`, `${phaseName} Finished`);
        return true;
      }

      const nextAnswer = await text({
        message: 'Your response:',
        placeholder: 'Type your answer...',
      });

      if (isCancel(nextAnswer)) {
        cancel('Operation paused. You can resume later.');
        process.exit(0);
      }

      currentInput = nextAnswer;
    } catch (error: any) {
      s.stop(pc.red('Error:'), 1);
      console.error(pc.red(`\n${error.message}\n`));
      process.exit(1);
    }
  }
  return true;
}

program
  .name('aic')
  .description('AI-Guided SDLC Orchestrator')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize or continue a project through the SDLC')
  .option('-p, --provider <provider>', 'LLM provider', 'ollama')
  .option('-m, --model <model>', 'Model name', 'llama3')
  .option('-s, --spec <path>', 'Path to a raw specification file')
  .option('-v, --verbose', 'Show AI reasoning traces', false)
  .action(async (options) => {
    intro(pc.bgCyan(pc.black(' AI-Guided SDLC Orchestrator ')));

    const projectName = await text({
      message: 'Project name:',
      placeholder: 'my-awesome-project',
      validate(value) {
        if (value.length === 0) return `Value is required!`;
      },
    });

    if (isCancel(projectName)) {
      cancel('Operation cancelled.');
      process.exit(0);
    }

    let projectState = await stateManager.loadProject(projectName);
    const driver = DriverFactory.create({ provider: options.provider, model: options.model });

    // --- PHASE 1: INCEPTION ---
    if (!projectState || projectState.currentPhase === 'inception') {
      let currentInput = `I want to start a new project called "${projectName}".`;
      
      if (projectState) {
        const resume = await select({
          message: `Resume Inception for "${projectName}"?`,
          options: [
            { value: 'yes', label: 'Yes, resume conversation' },
            { value: 'no', label: 'No, start over' },
          ],
        });
        if (isCancel(resume)) process.exit(0);
        if (resume === 'no') {
          projectState = StateManager.createInitialState(projectName);
        } else {
          const lastMsg = projectState.history.filter(m => m.role === 'assistant').pop();
          if (lastMsg) {
            note(lastMsg.content, 'Resuming Inception');
            const nextAnswer = await text({ message: 'Your answer:', placeholder: 'Continue...' });
            if (isCancel(nextAnswer)) process.exit(0);
            currentInput = nextAnswer;
          }
        }
      } else {
        projectState = StateManager.createInitialState(projectName);
        if (options.spec) {
          try {
            const specContent = await readFile(resolve(options.spec), 'utf-8');
            currentInput += `\n\nInitial Spec:\n${specContent}`;
            note(`Ingested spec from: ${options.spec}`, 'Context Loaded');
          } catch (e: any) {
            console.error(pc.red(`Error reading spec: ${e.message}`));
            process.exit(1);
          }
        }
      }

      const engine = new InceptionEngine(driver, projectState.history);
      await runPhase(engine, projectName, projectState, currentInput, 'Inception', options.verbose);

      const s = spinner();
      s.start('Generating Product Charter...');
      const charter = await engine.generateCharter();
      const charterPath = join(WORKSPACE_ROOT, 'docs', '01-product', `PRODUCT-CHARTER-${projectName.toUpperCase()}.md`);
      await mkdir(join(WORKSPACE_ROOT, 'docs', '01-product'), { recursive: true });
      await writeFile(charterPath, charter);
      s.stop('Charter Generated!');
      note(charter, 'Product Charter');

      projectState.currentPhase = 'requirements';
      const phase = projectState.phases.find(p => p.phase === 'inception');
      if (phase) { phase.status = 'completed'; phase.completedAt = new Date().toISOString(); }
      projectState.phases.push({ phase: 'requirements', status: 'pending', startedAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      await stateManager.saveProject(projectState);
    }

    // --- PHASE 2: REQUIREMENTS SPECIFICATION ---
    if (projectState.currentPhase === 'requirements') {
      const startSRS = await confirm({ message: 'Inception complete. Start Requirements Specification?' });
      if (isCancel(startSRS) || !startSRS) {
        outro(pc.yellow('Paused before Requirements.'));
        process.exit(0);
      }

      const phase = projectState.phases.find(p => p.phase === 'requirements');
      if (phase) phase.status = 'in-progress';
      
      const engine = new SRSEngine(driver, projectState.history);
      await runPhase(engine, projectName, projectState, 'Let us start defining the functional and non-functional requirements for this project.', 'Requirements', options.verbose);

      const s = spinner();
      s.start('Generating SRS...');
      const srs = await engine.generateSRS();
      const srsPath = join(WORKSPACE_ROOT, 'docs', '05-specs', `SRS-${projectName.toUpperCase()}.md`);
      await mkdir(join(WORKSPACE_ROOT, 'docs', '05-specs'), { recursive: true });
      await writeFile(srsPath, srs);
      s.stop('SRS Generated!');
      note(srs, 'Software Requirements Specification');

      projectState.currentPhase = 'domain-modeling';
      if (phase) { phase.status = 'completed'; phase.completedAt = new Date().toISOString(); }
      projectState.phases.push({ phase: 'domain-modeling', status: 'pending', startedAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      await stateManager.saveProject(projectState);
    }

    // --- PHASE 3: DOMAIN MODELING ---
    if (projectState.currentPhase === 'domain-modeling') {
      const startDomain = await confirm({ message: 'Requirements complete. Start Domain Modeling?' });
      if (isCancel(startDomain) || !startDomain) {
        outro(pc.yellow('Paused before Domain Modeling.'));
        process.exit(0);
      }

      const phase = projectState.phases.find(p => p.phase === 'domain-modeling');
      if (phase) phase.status = 'in-progress';
      
      const engine = new DomainEngine(driver, projectState.history);
      await runPhase(engine, projectName, projectState, 'Let us start defining the core entities and relationships for this project.', 'Domain Modeling', options.verbose);

      const s = spinner();
      s.start('Generating Domain Model...');
      const domainModel = await engine.generateDomainModel();
      const domainPath = join(WORKSPACE_ROOT, 'docs', '02-domain', `DOMAIN-MODEL-${projectName.toUpperCase()}.md`);
      await mkdir(join(WORKSPACE_ROOT, 'docs', '02-domain'), { recursive: true });
      await writeFile(domainPath, domainModel);
      s.stop('Domain Model Generated!');
      note(domainModel, 'Domain Model');

      projectState.currentPhase = 'architecture';
      if (phase) { phase.status = 'completed'; phase.completedAt = new Date().toISOString(); }
      projectState.phases.push({ phase: 'architecture', status: 'pending', startedAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      await stateManager.saveProject(projectState);
    }

    // --- PHASE 4: ARCHITECTURE DESIGN ---
    if (projectState.currentPhase === 'architecture') {
      const startArch = await confirm({ message: 'Domain Modeling complete. Start Architecture Design?' });
      if (isCancel(startArch) || !startArch) {
        outro(pc.yellow('Paused before Architecture.'));
        process.exit(0);
      }

      const phase = projectState.phases.find(p => p.phase === 'architecture');
      if (phase) phase.status = 'in-progress';
      
      const engine = new ArchitectureEngine(driver, projectState.history);
      await runPhase(engine, projectName, projectState, 'Let us start defining the technical architecture and tech stack for this project.', 'Architecture', options.verbose);

      const s = spinner();
      s.start('Generating Architecture Overview & ADR...');
      const overview = await engine.generateOverview();
      const adr = await engine.generateADR();
      
      const archPath = join(WORKSPACE_ROOT, 'docs', '03-architecture', `ARCHITECTURE-${projectName.toUpperCase()}.md`);
      await mkdir(join(WORKSPACE_ROOT, 'docs', '03-architecture'), { recursive: true });
      await writeFile(archPath, overview);
      
      const adrDir = join(WORKSPACE_ROOT, 'docs', '04-decisions');
      await mkdir(adrDir, { recursive: true });
      const files = await readdir(adrDir);
      const adrCount = files.filter(f => f.startsWith('ADR-')).length;
      const nextAdrNum = String(adrCount).padStart(4, '0');
      const adrPath = join(adrDir, `ADR-${nextAdrNum}-tech-stack-${projectName.toLowerCase()}.md`);
      await writeFile(adrPath, adr);

      s.stop('Architecture Deliverables Generated!');
      note(overview, 'Architecture Overview');
      note(adr, `Generated ADR: ${adrPath}`);

      projectState.currentPhase = 'planning';
      if (phase) { phase.status = 'completed'; phase.completedAt = new Date().toISOString(); }
      projectState.phases.push({ phase: 'planning', status: 'pending', startedAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      await stateManager.saveProject(projectState);
    }

    // --- PHASE 5: WORK PLANNING ---
    if (projectState.currentPhase === 'planning') {
      const startPlanning = await confirm({ message: 'Architecture complete. Start Work Planning?' });
      if (isCancel(startPlanning) || !startPlanning) {
        outro(pc.yellow('Paused before Planning.'));
        process.exit(0);
      }

      const phase = projectState.phases.find(p => p.phase === 'planning');
      if (phase) phase.status = 'in-progress';
      
      const engine = new PlanningEngine(driver, projectState.history);
      await runPhase(engine, projectName, projectState, 'Let us start breaking down the architecture into actionable Work Packets.', 'Planning', options.verbose);

      const s = spinner();
      s.start('Generating Work Packets...');
      const workPackets = await engine.generateWorkPackets();
      
      const wpDir = join(WORKSPACE_ROOT, 'docs', '09-delivery', 'work-packets');
      await mkdir(wpDir, { recursive: true });
      
      const existingFiles = await readdir(wpDir);
      let nextWpNum = existingFiles.filter(f => f.startsWith('WP-')).length + 1;

      for (const wpContent of workPackets) {
        const wpID = String(nextWpNum).padStart(4, '0');
        const wpPath = join(wpDir, `WP-${wpID}-${projectName.toLowerCase()}.md`);
        await writeFile(wpPath, wpContent);
        nextWpNum++;
      }

      s.stop(`Generated ${workPackets.length} Work Packets!`);
      
      projectState.currentPhase = 'implementation';
      if (phase) { phase.status = 'completed'; phase.completedAt = new Date().toISOString(); }
      projectState.phases.push({ phase: 'implementation', status: 'pending', startedAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      await stateManager.saveProject(projectState);
    }

    // --- PHASE 6: IMPLEMENTATION ---
    if (projectState.currentPhase === 'implementation') {
      const startImpl = await confirm({ message: 'Planning complete. Start Initial Code Generation?' });
      if (isCancel(startImpl) || !startImpl) {
        outro(pc.yellow('Paused before Implementation.'));
        process.exit(0);
      }

      const phase = projectState.phases.find(p => p.phase === 'implementation');
      if (phase) phase.status = 'in-progress';
      
      const engine = new ImplementationEngine(driver, projectState.history);
      await runPhase(engine, projectName, projectState, 'Let us start generating the code for the first work packet.', 'Implementation', options.verbose);

      const s = spinner();
      s.start('Generating Source Code & Configuration...');
      const files = await engine.generateInitialCode();
      
      const projectBaseDir = join(WORKSPACE_ROOT, 'apps', projectName.toLowerCase());
      await mkdir(projectBaseDir, { recursive: true });

      for (const file of files) {
        const filePath = join(projectBaseDir, file.path);
        const fileDir = join(filePath, '..');
        await mkdir(fileDir, { recursive: true });
        
        await writeFile(filePath, file.content);
        note(`Created file: ${file.path}`, 'Implementation');
      }

      s.stop(`Generated ${files.length} files in ${projectBaseDir}!`);
      
      projectState.currentPhase = 'verification';
      if (phase) { phase.status = 'completed'; phase.completedAt = new Date().toISOString(); }
      projectState.phases.push({ phase: 'verification', status: 'pending', startedAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      await stateManager.saveProject(projectState);
    }

    outro(pc.green(`SDLC process for "${projectName}" is complete up to Implementation!`));
  });

program
  .command('status')
  .description('List all projects and their current SDLC status')
  .action(async () => {
    const projects = await stateManager.listProjects();
    if (projects.length === 0) {
      console.log(pc.yellow('\nNo projects found.\n'));
      return;
    }
    console.log(pc.cyan('\nAI-Managed Projects:'));
    console.log(pc.dim('--------------------------------------------------'));
    for (const p of projects) {
      const phase = p.phases.find(ph => ph.phase === p.currentPhase);
      const statusStr = phase ? `[${phase.status.toUpperCase()}]` : '';
      console.log(`${pc.bold(p.name.padEnd(20))} | Phase: ${pc.yellow(p.currentPhase.padEnd(12))} | ${statusStr}`);
    }
    console.log(pc.dim('--------------------------------------------------\n'));
  });

program
  .command('test-ai')
  .description('Test AI connectivity (internal)')
  .argument('<prompt>', 'Prompt to send to the AI')
  .option('-p, --provider <provider>', 'LLM provider', 'ollama')
  .option('-m, --model <model>', 'Model name', 'llama3')
  .option('-v, --verbose', 'Show AI reasoning traces', false)
  .action(async (promptText, options) => {
    const s = spinner();
    s.start(`Contacting ${options.provider} (${options.model})...`);
    try {
      const driver = DriverFactory.create({ provider: options.provider, model: options.model });
      
      let fullResponse = '';
      const response = await driver.generateText([{ role: 'user', content: promptText }], {
        onToken: (token) => {
          if (fullResponse === '') {
            s.stop(`Response from ${options.provider}:`);
            process.stdout.write('\n');
          }
          fullResponse += token;
        }
      });

      if (fullResponse === '') {
        s.stop(`Response from ${options.provider}:`);
      }

      const thoughtMatch = response.match(/<thought>([\s\S]*?)<\/thought>/i);
      const thought = thoughtMatch ? thoughtMatch[1].trim() : undefined;
      const cleanedResponse = response.replace(/<thought>([\s\S]*?)<\/thought>/i, '').trim();

      if (options.verbose && thought) {
        note(pc.dim(thought), 'AI Reasoning Trace');
      }

      console.log(pc.dim(cleanedResponse));
      process.stdout.write('\n');
    } catch (error: any) {
      s.stop(pc.red('Error:'), 1);
      console.error(pc.red(`\n${error.message}\n`));
      process.exit(1);
    }
  });

program.parse();
