import { IVoltage } from './IVoltage';

export class IndiaPlug implements IVoltage {
  getVoltage(): number { return 240; }
}