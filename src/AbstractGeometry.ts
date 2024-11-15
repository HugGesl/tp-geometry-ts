import GeometryVisitor from "./GeometryVisitor";
import WktVisitor from "./WktVisitor";
import Point from "./Point";
import Geometry from "./Geometry";
import Envelope from "./Envelope";

export default abstract class AbstractGeometry implements Geometry {

    asText(): string {
        const visitor = new WktVisitor();
        this.accept(visitor);
        return visitor.getResult();
    };

    abstract accept(visitor: GeometryVisitor): void;

    abstract clone(): Geometry;

    abstract getEnvelope(): Envelope;

    abstract getType(): string ;

    abstract isEmpty(): boolean ;

    abstract translate(dx: number, dy: number): void;
}
