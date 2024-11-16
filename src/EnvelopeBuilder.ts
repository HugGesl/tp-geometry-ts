import Coordinate from "./Coordinate";
import Envelope from "./Envelope";
import GeometryVisitor from "./GeometryVisitor";
import Linestring from "./Linestring";
import Point from "./Point";
import GeometryCollection from "./GeometryCollection";

export default class EnvelopeBuilder implements GeometryVisitor{
    private xMin?: number;
    private yMin?: number;
    private xMax?: number;
    private yMax?: number;

    constructor() {}

    insert(coordinate:Coordinate){
        this.xMin = this.xMin === undefined ? coordinate[0] : Math.min(this.xMin, coordinate[0]);
        this.yMin = this.yMin === undefined ? coordinate[1] : Math.min(this.yMin, coordinate[1]);
        this.xMax = this.xMax === undefined ? coordinate[0] : Math.max(this.xMax, coordinate[0]);
        this.yMax = this.yMax === undefined ? coordinate[1] : Math.max(this.yMax, coordinate[1]);
    }

    build():Envelope{
        return new Envelope([this.xMin,this.yMin], [this.xMax, this.yMax]);
    }

    visitLinestring(linestring: Linestring): void {
        let point;
        for (let i=0; i<linestring.getNumPoints(); i++){
            point = linestring.getPointN(i).getCoordinate();
            this.insert(point);
        }
    }

    visitPoint(point: Point): void {
        this.insert(point.getCoordinate());
    }

    visitGeometryCollection(geometryCollection: GeometryCollection): void {
        for (let i = 0; i < geometryCollection.getNumGeometries(); i++) {
            geometryCollection.getGeometryN(i).accept(this);

        }
    }
}