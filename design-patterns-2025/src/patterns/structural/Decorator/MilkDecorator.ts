import { Coffee } from './Coffee';

export class MilkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  cost(): number { return this.coffee.cost() + 2; }
  description(): string { return this.coffee.description() + ', Milk'; }
}