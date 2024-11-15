import Point from "./Point";
import Linestring from "./Linestring";

export default interface GeometryVisitor{
    visitPoint(point: Point): void;
    visitLinestring(linestring: Linestring): void;
}