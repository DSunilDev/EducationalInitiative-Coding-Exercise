import { ITransport } from './ITransport';
import { Truck } from './Truck';
import { Ship } from './Ship';

export class TransportFactory {
  static createTransport(type: string): ITransport {
    switch(type.toLowerCase()) {
      case 'truck': return new Truck();
      case 'ship': return new Ship();
      default: throw new Error('Invalid transport type');
    }
  }
}