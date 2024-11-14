import Coordinate from "./Coordinate";
import Geometry from "./Geometry";
import Point from "./Point";

export default class Linestring {
    private points?: Array<Point>;


  constructor(points?: Array<Point>) {
    this.points = points? points: [] ;
  }

  getNumPoints(): number{
    return this.points? this.points.length : Number.NaN;
  }

  getPointN(n: number): Point{
    return this.points[n];
  }

  getType(): string{
    return "Linestring";
  }

  isEmpty(): boolean{
    return this.points.length === 0;
  }
}