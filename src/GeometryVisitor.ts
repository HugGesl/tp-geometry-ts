import Point from "./Point";
import Linestring from "./Linestring";
import GeometryCollection from "./GeometryCollection";

export default interface GeometryVisitor{
    visitPoint(point: Point): void;
    visitLinestring(linestring: Linestring): void;
    visitGeometryCollection(geometryCollection: GeometryCollection): void;
}