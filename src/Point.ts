import Coordinate from "./Coordinate";
import Geometry from "./Geometry";

export default class Point {
  private coordinate?: Coordinate;

  constructor(coordinate?: Coordinate) {
    this.coordinate = coordinate ;
  }

  getCoordinate(): Coordinate {
    return this.coordinate;
  }

  getType(): string{
    return "Point";
  }

  x(): number {
    return this.coordinate ? this.coordinate[0] : Number.NaN ;
  }

  y(): number {
    return this.coordinate ? this.coordinate[1] : Number.NaN ;
  }

}
