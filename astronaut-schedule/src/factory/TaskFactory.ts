import { Task, Priority } from '../models/Task';

function simpleId(): string {
  return 'id-' + Math.random().toString(36).slice(2,9);
}

export class TaskFactory {
  static create(description: string, startTime: string, endTime: string, priority: Priority): Task {
    return new Task(simpleId(), description, startTime, endTime, priority);
  }
}
