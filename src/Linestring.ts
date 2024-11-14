import Coordinate from "./Coordinate";
import Geometry from "./Geometry";
import Point from "./Point";
import Envelope from "./Envelope";
import EnvelopeBuilder from "./EnvelopeBuilder";

export default class Linestring implements Geometry{
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


}