import { ITransport } from './ITransport';
import { Logger } from '../../../utils/Logger';

export class Truck implements ITransport {
  deliver(): void {
    Logger.info('Deliver by land in a box.');
  }
}