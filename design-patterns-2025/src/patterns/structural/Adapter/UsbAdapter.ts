import { IVoltage } from './IVoltage';
import { Logger } from '../../../utils/Logger';

export class UsbAdapter {
  constructor(private plug: IVoltage) {}
  getUsbVoltage(): number {
    const volts = this.plug.getVoltage();
    const usbVolts = 5;
    Logger.info(`Adapting ${volts}V to ${usbVolts}V`);
    return usbVolts;
  }
}