import { Task } from '../models/Task';
import { IObserver } from '../observer/IObserver';
import { Logger } from '../utils/Logger';

// Singleton ScheduleManager
export class ScheduleManager {
  private static instance: ScheduleManager | null = null;
  private tasks: Task[] = [];
  private observers: IObserver[] = [];

  private constructor() {}

  static getInstance(): ScheduleManager {
    if (!ScheduleManager.instance) {
      ScheduleManager.instance = new ScheduleManager();
    }
    return ScheduleManager.instance;
  }

  subscribe(o: IObserver) { this.observers.push(o); }
  unsubscribe(o: IObserver) { this.observers = this.observers.filter(x => x !== o); }
  private notifyAll(msg: string) { this.observers.forEach(o => o.notify(msg)); }

  addTask(task: Task): { success: boolean; message: string } {
    // validation
    if (!this.validateTimeFormat(task.startTime) || !this.validateTimeFormat(task.endTime)) {
      return { success: false, message: 'Invalid time format. Use HH:MM (24-hour).' };
    }
    const s = this.parseToMinutes(task.startTime);
    const e = this.parseToMinutes(task.endTime);
    if (e <= s) return { success: false, message: 'End time must be after start time.' };

    // overlap check
    const conflict = this.tasks.find(t => {
      const ts = this.parseToMinutes(t.startTime);
      const te = this.parseToMinutes(t.endTime);
      return (s < te && e > ts); // overlap condition
    });
    if (conflict) {
      const msg = `Task conflicts with existing task "${conflict.description}"`;
      this.notifyAll(msg);
      return { success: false, message: msg };
    }

    this.tasks.push(task);
    this.tasks.sort((a,b) => this.parseToMinutes(a.startTime) - this.parseToMinutes(b.startTime));
    Logger.info(`Task added: ${task.description}`);
    this.notifyAll(`Task added: ${task.description}`);
    return { success: true, message: 'Task added successfully.' };
  }

  removeTask(description: string): { success: boolean; message: string } {
    const idx = this.tasks.findIndex(t => t.description === description);
    if (idx === -1) return { success: false, message: 'Task not found.' };
    const removed = this.tasks.splice(idx,1)[0];
    Logger.info(`Task removed: ${removed.description}`);
    this.notifyAll(`Task removed: ${removed.description}`);
    return { success: true, message: 'Task removed successfully.' };
  }

  editTask(oldDesc: string, newTask: Task): { success: boolean; message: string } {
    const idx = this.tasks.findIndex(t => t.description === oldDesc);
    if (idx === -1) return { success: false, message: 'Task not found.' };
    // Temporarily remove existing to check conflicts excluding itself
    const backup = this.tasks.splice(idx,1)[0];
    const res = this.addTask(newTask);
    if (!res.success) {
      // rollback
      this.tasks.splice(idx,0,backup);
      return res;
    }
    Logger.info(`Task edited: ${oldDesc} -> ${newTask.description}`);
    return { success: true, message: 'Task edited successfully.' };
  }

  markCompleted(description: string): { success: boolean; message: string } {
    const t = this.tasks.find(x => x.description === description);
    if (!t) return { success: false, message: 'Task not found.' };
    t.completed = true;
    Logger.info(`Task completed: ${t.description}`);
    this.notifyAll(`Task completed: ${t.description}`);
    return { success: true, message: 'Task marked as completed.' };
  }

  viewTasks(): Task[] {
    return this.tasks.slice();
  }

  viewByPriority(priority: string): Task[] {
    return this.tasks.filter(t => t.priority.toLowerCase() === priority.toLowerCase());
  }

  // Utilities
  private validateTimeFormat(t: string): boolean {
    const m = t.match(/^([01]\d|2[0-3]):([0-5]\d)$/);
    return !!m;
  }
  private parseToMinutes(t: string): number {
    const [hh,mm] = t.split(':').map(x=>parseInt(x,10));
    return hh*60 + mm;
  }
}
