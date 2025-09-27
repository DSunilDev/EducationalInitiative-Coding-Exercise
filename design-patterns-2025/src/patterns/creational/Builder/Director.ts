import { HouseBuilder } from './HouseBuilder';

export class Director {
  static constructSimpleHouse(): ReturnType<HouseBuilder['build']> {
    return new HouseBuilder().setWalls('Brick').setRoof('Tile').setRooms(2).build();
  }
}