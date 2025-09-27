import { ICompressionStrategy } from './ICompressionStrategy';
import { Logger } from '../../../utils/Logger';

export class RarStrategy implements ICompressionStrategy {
  compress(files: string[]): void {
    Logger.info(`Compressing ${files.length} files using RAR`);
  }
}