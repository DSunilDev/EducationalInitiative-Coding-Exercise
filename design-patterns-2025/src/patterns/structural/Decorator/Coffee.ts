export interface Coffee { cost(): number; description(): string; }

export class SimpleCoffee implements Coffee {
  cost(): number { return 5; }
  description(): string { return 'Simple Coffee'; }
}