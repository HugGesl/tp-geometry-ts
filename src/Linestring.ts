import Coordinate from "./Coordinate";
import AbstractGeometry from "./AbstractGeometry";
import Point from "./Point";
import Envelope from "./Envelope";
import EnvelopeBuilder from "./EnvelopeBuilder";
import GeometryVisitor from "./GeometryVisitor";

export default class Linestring extends AbstractGeometry{
    private points?: Array<Point>;


  constructor(points?: Array<Point>) {
    super();
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

  translate(dx:number, dy:number): void{
    this.points.forEach(point => {
        point.translate(dx, dy);
        });
  }

  clone():Linestring{
    const clonedPoints = [];
    this.points.forEach((point)=> {
      clonedPoints.push(point.clone());
    });
    return new Linestring(clonedPoints);
  }

  getEnvelope():Envelope{
    const EnvelopeBuilderLine = new EnvelopeBuilder();
    this.points.forEach((point)=> {
      EnvelopeBuilderLine.insert(point.getCoordinate());
    });
  return EnvelopeBuilderLine.build();
  }

  accept(visitor: GeometryVisitor) {
    visitor.visitLinestring(this);
  }


}