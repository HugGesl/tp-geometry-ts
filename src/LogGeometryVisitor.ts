import GeometryVisitor from "./GeometryVisitor";
import Linestring from "./Linestring";
import Point from "./Point";

export default class LogGeometryVisitor implements GeometryVisitor{
    visitLinestring(linestring: Linestring): void {
        if (linestring.isEmpty()){
            console.log("Je suis une polyligne vide.");
        }else {
            console.log(`Je suis une polyligne définie par ${linestring.getNumPoints()} points.`);
        }

    }

    visitPoint(point: Point): void {
        if (point.isEmpty()){
            console.log("Je suis un point vide.");
        }else {
            console.log(`Je suis un point avec x=${point.x()} et y=${point.y()}`);
        }
    }

}