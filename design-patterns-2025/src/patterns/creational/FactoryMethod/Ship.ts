import { ITransport } from './ITransport';
import { Logger } from '../../../utils/Logger';

export class Ship implements ITransport {
  deliver(): void {
    Logger.info('Deliver by sea in a container.');
  }
}