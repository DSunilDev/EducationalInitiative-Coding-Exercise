import { ISubject } from './ISubject';
import { IObserver } from './IObserver';

export class NewsSubject implements ISubject {
  private observers: IObserver[] = [];

  attach(observer: IObserver): void {
    this.observers.push(observer);
  }

  detach(observer: IObserver): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(message: string): void {
    for (const o of this.observers) {
      o.update(message);
    }
  }
}