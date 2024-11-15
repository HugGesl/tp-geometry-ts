import GeometryVisitor from "./GeometryVisitor";
import Linestring from "./Linestring";
import Point from "./Point";

export default class WktVisitor implements GeometryVisitor{
    private buffer?: string;

    constructor() {

    }

    getResult(): string {
        return this.buffer;
    }
    visitLinestring(linestring: Linestring): void {
        let listCoord = [];
        for (let i=0; i<linestring.getNumPoints(); i++){
            listCoord.push(linestring.getPointN(i).x());
            listCoord.push(linestring.getPointN(i).y());
        }
        this.buffer = linestring.getType().toUpperCase()+'('+listCoord.join(" ")+')';

    }

    visitPoint(point: Point): void {
        this.buffer = point.getType().toUpperCase()+'('+point.getCoordinate().join(" ")+')';
    }

}