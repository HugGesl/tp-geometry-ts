import Coordinate from "./Coordinate";
import GeometryVisitor from "./GeometryVisitor";
import AbstractGeometry from "./AbstractGeometry";


export default class Point extends AbstractGeometry{
  private coordinate?: Coordinate;

  constructor(coordinate?: Coordinate) {
    super();
    this.coordinate = coordinate? coordinate: [] ;
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
    return this.coordinate ? this.coordinate[1] : Number.NaN  ;
  }

  isEmpty(): boolean{
    return (this.coordinate.length === 0);
  }

  translate(dx:number, dy:number):void {
    this.coordinate=[this.x()+dx, this.y()+dy];
  }

  clone():Point{
    return new Point(this.coordinate);
  }


  accept(visitor: GeometryVisitor) {
    visitor.visitPoint(this);
  }


}
