import { House } from './House';

export class HouseBuilder {
  private walls: string = '';
  private roof: string = '';
  private rooms: number = 0;

  setWalls(walls: string): this { this.walls = walls; return this; }
  setRoof(roof: string): this { this.roof = roof; return this; }
  setRooms(rooms: number): this { this.rooms = rooms; return this; }

  build(): House { return new House(this.walls, this.roof, this.rooms); }
}