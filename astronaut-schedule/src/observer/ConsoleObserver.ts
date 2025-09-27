import { IObserver } from './IObserver';
import { Logger } from '../utils/Logger';

export class ConsoleObserver implements IObserver {
  notify(message: string): void {
    Logger.warn('[Observer] ' + message);
  }
}
