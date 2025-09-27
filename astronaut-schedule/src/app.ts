import * as readline from 'readline';
import { ScheduleManager } from './services/ScheduleManager';
import { ConsoleObserver } from './observer/ConsoleObserver';
import { TaskFactory } from './factory/TaskFactory';
import { Logger } from './utils/Logger';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
const manager = ScheduleManager.getInstance();
manager.subscribe(new ConsoleObserver());

Logger.info('Astronaut Daily Schedule Organizer');
Logger.info('Type commands. Type help for instructions.');

rl.on('line', async (line) => {
  try {
    const trimmed = line.trim();
    if (!trimmed) return;
    if (trimmed.toLowerCase() === 'exit') {
      Logger.info('Exiting...'); rl.close(); return;
    }
    if (trimmed.toLowerCase() === 'help') {
      console.log(`Commands:\n add "Description" HH:MM HH:MM Priority\n remove "Description"\n edit "OldDesc" "NewDesc" HH:MM HH:MM Priority\n complete "Description"\n view\n view-priority Priority\n exit`);
      return;
    }
    const parts = parseArguments(trimmed);
    const cmd = parts.shift()?.toLowerCase();
    if (!cmd) return;

    switch(cmd) {
      case 'add': {
        if (parts.length < 4) { Logger.error('Invalid add command.'); break; }
        const [desc, start, end, priority] = parts;
        const task = TaskFactory.create(desc, start, end, normalizePriority(priority));
        const res = manager.addTask(task);
        Logger.info(res.message);
        break;
      }
      case 'remove': {
        if (parts.length < 1) { Logger.error('Invalid remove command.'); break; }
        const [desc] = parts;
        const res = manager.removeTask(desc);
        Logger.info(res.message);
        break;
      }
      case 'edit': {
        if (parts.length < 5) { Logger.error('Invalid edit command.'); break; }
        const [oldDesc, newDesc, start, end, priority] = parts;
        const newTask = TaskFactory.create(newDesc, start, end, normalizePriority(priority));
        const res = manager.editTask(oldDesc, newTask);
        Logger.info(res.message);
        break;
      }
      case 'complete': {
        if (parts.length < 1) { Logger.error('Invalid complete command.'); break; }
        const [desc] = parts;
        const res = manager.markCompleted(desc);
        Logger.info(res.message);
        break;
      }
      case 'view': {
        const arr = manager.viewTasks();
        if (arr.length === 0) { Logger.info('No tasks scheduled for the day.'); break; }
        for (const t of arr) {
          console.log(`${t.startTime} - ${t.endTime}: ${t.description} [${t.priority}]${t.completed ? ' (Completed)' : ''}`);
        }
        break;
      }
      case 'view-priority': {
        if (parts.length < 1) { Logger.error('Invalid view-priority command.'); break; }
        const [p] = parts;
        const arr = manager.viewByPriority(p);
        if (arr.length === 0) { Logger.info('No tasks with given priority.'); break; }
        for (const t of arr) console.log(`${t.startTime} - ${t.endTime}: ${t.description} [${t.priority}]`);
        break;
      }
      default:
        Logger.error('Unknown command. Type help for instructions.');
    }
  } catch (err: any) {
    Logger.error(err.message || String(err));
  }
});

// Helper: parse arguments that may contain quoted strings
function parseArguments(input: string): string[] {
  const args: string[] = [];
  const regex = /"([^"]+)"|\S+/g;
  let match;
  while ((match = regex.exec(input)) !== null) {
    if (match[1]) args.push(match[1]);
    else args.push(match[0]);
  }
  return args;
}

function normalizePriority(p: string) {
  const up = p.toLowerCase();
  if (up.startsWith('h')) return 'High';
  if (up.startsWith('m')) return 'Medium';
  return 'Low';
}

// Graceful shutdown on SIGINT
process.on('SIGINT', () => { Logger.info('Caught interrupt signal. Exiting.'); rl.close(); process.exit(0); });
