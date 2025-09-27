import { Logger } from './utils/Logger';
import { NewsSubject } from './patterns/behavioral/Observer/NewsSubject';
import { EmailSubscriber } from './patterns/behavioral/Observer/EmailSubscriber';
import { ZipStrategy } from './patterns/behavioral/Strategy/ZipStrategy';
import { RarStrategy } from './patterns/behavioral/Strategy/RarStrategy';
import { TransportFactory } from './patterns/creational/FactoryMethod/TransportFactory';
import { Director } from './patterns/creational/Builder/Director';
import { IndiaPlug } from './patterns/structural/Adapter/IndiaPlug';
import { UsbAdapter } from './patterns/structural/Adapter/UsbAdapter';
import { SimpleCoffee } from './patterns/structural/Decorator/Coffee';
import { MilkDecorator } from './patterns/structural/Decorator/MilkDecorator';
import { SugarDecorator } from './patterns/structural/Decorator/SugarDecorator';

async function main() {
  Logger.info('--- Observer Pattern Demo ---');
  const news = new NewsSubject();
  const sub1 = new EmailSubscriber('Alice');
  news.attach(sub1);
  news.notify('Breaking News!');

  Logger.info('--- Strategy Pattern Demo ---');
  new ZipStrategy().compress(['file1', 'file2']);
  new RarStrategy().compress(['file3']);

  Logger.info('--- Factory Method Pattern Demo ---');
  TransportFactory.createTransport('truck').deliver();
  TransportFactory.createTransport('ship').deliver();

  Logger.info('--- Builder Pattern Demo ---');
  const house = Director.constructSimpleHouse();
  Logger.info(`Built house: ${house.walls}, ${house.roof}, rooms=${house.rooms}`);

  Logger.info('--- Adapter Pattern Demo ---');
  const adapter = new UsbAdapter(new IndiaPlug());
  Logger.info(`USB Voltage: ${adapter.getUsbVoltage()}V`);

  Logger.info('--- Decorator Pattern Demo ---');
  let coffee = new SimpleCoffee();
  coffee = new MilkDecorator(coffee);
  coffee = new SugarDecorator(coffee);
  Logger.info(`Coffee: ${coffee.description()} costs $${coffee.cost()}`);
}

main().catch(e => Logger.error(e.message));
