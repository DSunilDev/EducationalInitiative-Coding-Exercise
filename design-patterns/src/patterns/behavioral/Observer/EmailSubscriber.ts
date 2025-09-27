import { IObserver } from './IObserver';
import { Logger } from '../../../utils/Logger';

export class EmailSubscriber implements IObserver {
  constructor(private name: string) {}
  update(message: string): void {
    Logger.info(`${this.name} received email: ${message}`);
  }
}