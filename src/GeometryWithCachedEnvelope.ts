import Geometry from "./Geometry";
import Envelope from "./Envelope";
import GeometryVisitor from "./GeometryVisitor";

export default class GeometryWithCachedEnvelope implements Geometry{
    private original?: Geometry;
    private  cache?: Envelope;

    constructor(original: Geometry) {
        this.original = original;
    }
    asText(): string {
        return this.original.asText();
    }

    clone(): Geometry {
        return this.original.clone();
    }

    getEnvelope(): Envelope {
        if (this.cache==undefined){
            return this.original.getEnvelope();
        }else {
            return this.cache
        }
    }

    getType(): string {
        return this.original.getType();
    }

    isEmpty(): boolean {
        return this.original.isEmpty();
    }

    translate(dx: number, dy: number): void {
        this.cache == undefined;
        this.original.translate(dx, dy);

    }

    accept(visitor: GeometryVisitor): void {
        this.original.accept(visitor);
    }

}