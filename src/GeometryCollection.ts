import Geometry from "./Geometry";
import AbstractGeometry from "./AbstractGeometry";
import GeometryVisitor from "./GeometryVisitor";


export default class GeometryCollection extends AbstractGeometry{
    private geometries: Array<Geometry>;

    constructor(geometries?: Array<Geometry>) {
        super();
        this.geometries = geometries? geometries: [];
    }
    getNumGeometries(): number {
        return this.geometries.length;
    }

    getGeometryN(n: number): Geometry {
        return this.geometries[n];
    }

    accept(visitor: GeometryVisitor): void {
        this.geometries.forEach(geometry=>{
            //
        });
    }

    clone(): Geometry {
        return undefined;
    }

    getType(): string {
        return

    }

    isEmpty(): boolean {
      return
    }

    translate(dx: number, dy: number): void {
    }


}