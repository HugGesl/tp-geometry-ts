import GeometryVisitor from "./GeometryVisitor";
import Linestring from "./Linestring";
import Point from "./Point";
import GeometryCollection from "./GeometryCollection";

export default class WktVisitor implements GeometryVisitor{
    private buffer?: string;

    constructor() {

    }

    getResult(): string {
        return this.buffer;
    }
    visitLinestring(linestring: Linestring): void {
        if (linestring.isEmpty()){
            this.buffer = "LINESTRING IS EMPTY";
        }
        else {
            let listCoord = [];
            for (let i = 0; i < linestring.getNumPoints(); i++) {
                listCoord.push(linestring.getPointN(i).x());
                listCoord.push(linestring.getPointN(i).y());
            }
            this.buffer = linestring.getType().toUpperCase() + '(' + listCoord.join(" ") + ')';
        }
    }
    visitPoint(point: Point): void {
        if (point.isEmpty()) {
            this.buffer = "POINT IS EMPTY";
        } else {
            this.buffer = point.getType().toUpperCase() + '(' + point.getCoordinate().join(" ") + ')';
        }
    }

    visitGeometryCollection(geometryCollection: GeometryCollection) {
        if (geometryCollection.isEmpty()) {
            this.buffer = "GEOMETRYCOLLECTION EMPTY";
        } else {
            let listCoordGeometry = [];
            for (let i = 0; i < geometryCollection.getNumGeometries(); i++) {
                geometryCollection.getGeometryN(i).accept(this);
                listCoordGeometry.push(this.buffer);
            }
            this.buffer = geometryCollection.getType().toUpperCase() + '(' + listCoordGeometry.join(" ") + ')';
        }
    }
}