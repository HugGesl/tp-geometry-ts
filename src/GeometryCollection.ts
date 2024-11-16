import AbstractGeometry from "./AbstractGeometry";
import Geometry from "./Geometry";
import GeometryVisitor from "./GeometryVisitor";


export default class GeometryCollection extends AbstractGeometry{
    private geometries: Array<Geometry>;

    constructor(geometries?: Array<Geometry>) {
        super();
        this.geometries = geometries? geometries: [];
    }
    getNumGeometries(): number {
        return this.geometries? this.geometries.length: 0;
    }

    getGeometryN(n: number): Geometry {
        return this.geometries[n];
    }

    accept(visitor: GeometryVisitor): void {
        visitor.visitGeometryCollection(this);
    }

    clone(): GeometryCollection {
        const clonedGeometries = [];
        this.geometries.forEach((geometry)=> {
            clonedGeometries.push(geometry.clone());
        });
        return new GeometryCollection(clonedGeometries);
    }

    getType(): string {
        return "GeometryCollection";

    }

    isEmpty(): boolean {
      return this.geometries.length === 0;
    }

    translate(dx: number, dy: number): void {
        this.geometries.forEach(geometry => {
            geometry.translate(dx, dy);
        });
    }


}