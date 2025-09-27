import { Coffee } from './Coffee';

export class SugarDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  cost(): number { return this.coffee.cost() + 1; }
  description(): string { return this.coffee.description() + ', Sugar'; }
}