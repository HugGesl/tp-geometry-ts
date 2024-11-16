import type Geometry from "./Geometry";
import GeometryVisitor from "./GeometryVisitor";
import WktVisitor from "./WktVisitor";
import Envelope from "./Envelope";
import EnvelopeBuilder from "./EnvelopeBuilder";

export default abstract class AbstractGeometry implements Geometry {

    asText(): string {
        const visitor = new WktVisitor();
        this.accept(visitor);
        return visitor.getResult();
    };

    abstract accept(visitor: GeometryVisitor):void;

    abstract clone(): Geometry;

    getEnvelope(): Envelope{
        const EnvelopeBuilderGeometry = new EnvelopeBuilder();
        this.accept(EnvelopeBuilderGeometry);
        return EnvelopeBuilderGeometry.build();
    }

    abstract getType(): string ;

    abstract isEmpty(): boolean ;

    abstract translate(dx: number, dy: number): void;
}
