import Coordinate from "./Coordinate";
import Geometry from "./Geometry";
import Envelope from "./Envelope";
import EnvelopeBuilder from "./EnvelopeBuilder";
import coordinate from "./Coordinate";


export default class Point implements Geometry{
  private coordinate?: Coordinate;

  constructor(coordinate?: Coordinate) {
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
  getEnvelope(): Envelope {
    const EnvelopeBuilderPoint = new EnvelopeBuilder();
    EnvelopeBuilderPoint.insert(this.coordinate);
    return EnvelopeBuilderPoint.build();
  }


}
