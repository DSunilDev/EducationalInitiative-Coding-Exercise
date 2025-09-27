export type Priority = 'Low' | 'Medium' | 'High';

export class Task {
  constructor(
    public id: string,
    public description: string,
    public startTime: string, // HH:MM
    public endTime: string,   // HH:MM
    public priority: Priority,
    public completed: boolean = false
  ) {}
}
