import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import Linestring from "../src/Linestring";
import Envelope from "../src/Envelope";
import EnvelopeBuilder from "../src/EnvelopeBuilder";
import WktWriter from "../src/WktWriter";
import LogGeometryVisitor from "../src/LogGeometryVisitor";
import WktVisitor from "../src/WktVisitor";
import GeometryWithCachedEnvelope from "../src/GeometryWithCachedEnvelope";
import GeometryCollection from "../src/GeometryCollection";

describe("test Point", () => {
    it("test default constructor", () => {
        const p = new Point();
        expect(p.getCoordinate()).to.deep.equal([]);
        expect(p.getType()).to.equal("Point");
        // @ts-ignore
        expect(Number.isNaN(p.x()));
        // @ts-ignore
        expect(Number.isNaN(p.y()));
        expect(p.isEmpty()).to.equal(true);
    });
    it("test constructor with coordinates", () => {
        const p = new Point([3.0,4.0]);
        expect(p.getCoordinate()).to.deep.equal([3.0,4.0]);
        expect(p.getType()).to.equal("Point");
        expect(p.x()).to.equal(3.0);
        expect(p.y()).to.equal(4.0);
        expect(p.isEmpty()).to.equal(false);
        p.translate(1.0,1.0);
        expect(p.getCoordinate()).to.deep.equal([4.0,5.0]);
    });

    it("test isEmpty", () => {
        const p = new Point([3.0,4.0]);
        expect(p.isEmpty()).to.equal(false);
    });

    it("test translate", () => {
        const p = new Point([3.0,4.0]);
        p.translate(1.0,1.0);
        expect(p.getCoordinate()).to.deep.equal([4.0,5.0]);
    });

    it("test clone", () => {
        const p = new Point([3.0,4.0]);
        const g = p.clone();
        p.translate(1.0,1.0);
        expect(g.getCoordinate()).to.deep.equal([3.0,4.0]);
    });
    it("test getEnvelope avec coordonnées", () => {
        const p = new Point([3.0,4.0]);
        const result = p.getEnvelope();
        expect(result.getXmin()).to.equal(3.0);
        expect(result.getYmin()).to.equal(4.0);
        expect(result.getXmax()).to.equal(3.0);
        expect(result.getYmax()).to.equal(4.0);
    });

    it("test getEnvelope avec valeur par défaut", () => {
        const p = new Point();
        const result = p.getEnvelope();
        expect(result.getXmin()).to.equal(undefined);
        expect(result.getYmin()).to.equal(undefined);
        expect(result.getXmax()).to.equal(undefined);
        expect(result.getYmax()).to.equal(undefined);
    });
});


describe("test Linestring", () => {
    it("test default constructor", () => {
        const p = new Linestring();
        // @ts-ignore
        expect(Number.isNaN(p.getNumPoints()));
        expect(p.getType()).to.equal("Linestring");
        expect(p.getPointN(1)).to.equal(undefined);
        expect(p.isEmpty()).to.equal(true);

    });
    it("test constructor with coordinates", () => {
        const m = new Point([3.0,4.0]);
        const n = new Point([5.0,8.0]);
        const p = new Linestring([m,n]);
        expect(p.getNumPoints()).to.equal(2);
        expect(p.getType()).to.equal("Linestring");
        expect(p.getPointN(1)).to.equal(n);
    });

    it("test isEmpty", () => {
        const m = new Point([3.0,4.0]);
        const n = new Point([5.0,8.0]);
        const p = new Linestring([m,n]);
        expect(p.isEmpty()).to.equal(false);
    });

    it("test translate", () => {
        const m = new Point([3.0,4.0]);
        const n = new Point([5.0,8.0]);
        const p = new Linestring([m,n]);
        p.translate(1.0,1.0);
        expect(p.getPointN(0).getCoordinate()).to.deep.equal([4.0,5.0]);
    });

    it("test clone", () => {
        const m = new Point([3.0,4.0]);
        const n = new Point([5.0,8.0]);
        const p = new Linestring([m,n]);
        const g = p.clone();
        p.translate(1.0,1.0);
        expect(g.getPointN(0).getCoordinate()).to.deep.equal([3.0,4.0]);
    });
    it("test getEnvelope avec coordonnées", () => {
        const m = new Point([3.0,4.0]);
        const n = new Point([5.0,8.0]);
        const p = new Linestring([m,n]);
        const result = p.getEnvelope();
        expect(result.getXmin()).to.equal(3.0);
        expect(result.getYmin()).to.equal(4.0);
        expect(result.getXmax()).to.equal(5.0);
        expect(result.getYmax()).to.equal(8.0);
    });

    it("test getEnvelope avec valeur par défaut", () => {
        const p = new Linestring();
        const result = p.getEnvelope();
        expect(result.getXmin()).to.equal(undefined);
        expect(result.getYmin()).to.equal(undefined);
        expect(result.getXmax()).to.equal(undefined);
        expect(result.getYmax()).to.equal(undefined);
    });
});
describe("test Envelope", () => {
    it("test constructeur avec coordonnées définies", () => {
        const bottomLeft = [0.0, 1.0];
        const topRight = [1.0, 3.0];
        const envelope = new Envelope(bottomLeft, topRight);
        expect(envelope.toString()).to.deep.equal('BottomLeft: 0,1,TopRight: 1,3');

    });

    it("test constructeur avec valeurs par défaut", () => {
        const envelope = new Envelope();
        expect(envelope.toString()).to.deep.equal('BottomLeft: ,TopRight: ');
    });

    it("test méthode isEmpty quand les deux coordonnées sont définies", () => {
        const bottomLeft = [0.0, 1.0];
        const topRight = [1.0, 3.0];
        const envelope = new Envelope(bottomLeft, topRight);
        expect(envelope.isEmpty()).to.equal(false);
    });

    it("test méthode isEmpty quand une coordonnée est manquante", () => {
        const topRight = [1.0, 3.0];
        const envelope = new Envelope(undefined, topRight);
        expect(envelope.isEmpty()).to.equal(true);
    });

    it("test getters pour Xmin, Ymin, Xmax, Ymax", () => {
        const bottomLeft = [0.0, 1.0];
        const topRight = [1.0, 3.0];
        const envelope = new Envelope(bottomLeft, topRight);
        expect(envelope.getXmin()).to.equal(0.0);
        expect(envelope.getYmin()).to.equal(1.0);
        expect(envelope.getXmax()).to.equal(1.0);
        expect(envelope.getYmax()).to.equal(3.0);
    });

    it("test getters quand l'enveloppe est vide", () => {
        const envelope = new Envelope();
        expect(envelope.getXmin()).to.equal(undefined);
        expect(envelope.getYmin()).to.equal(undefined);
        expect(envelope.getXmax()).to.equal(undefined);
        expect(envelope.getYmax()).to.equal(undefined);
    });
});
describe("test EnvelopeBuilder", () => {
    it("test constructeur et insertion de coordonnées", () => {
        const builder = new EnvelopeBuilder();
        builder.insert([0.0, 1.0]);
        builder.insert([2.0, 0.0]);
        builder.insert([1.0, 3.0]);
        const result = builder.build();
        expect(result.getXmin()).to.equal(0.0);
        expect(result.getYmin()).to.equal(0.0);
        expect(result.getXmax()).to.equal(2.0);
        expect(result.getYmax()).to.equal(3.0);
    });

    it("test avec des coordonnées négatives", () => {
        const builder = new EnvelopeBuilder();
        builder.insert([-1.0, -1.0]);
        builder.insert([-2.0, 2.0]);
        builder.insert([0.0, -3.0]);
        const result = builder.build();
        expect(result.getXmin()).to.equal(-2.0);
        expect(result.getYmin()).to.equal(-3.0);
        expect(result.getXmax()).to.equal(0.0);
        expect(result.getYmax()).to.equal(2.0);
    });

    it("test méthode build avec absence d'insertion", () => {
        const builder = new EnvelopeBuilder();
        const result = builder.build();
        expect(result.getXmin()).to.equal(undefined);
        expect(result.getYmin()).to.equal(undefined);
        expect(result.getXmax()).to.equal(undefined);
        expect(result.getYmax()).to.equal(undefined);
    });

});

describe("test WktWriter", () => {
    it("test avec un point", () => {
        const p = new Point([3.0,4.0]);
        const writer = new WktWriter();

        const wkt = writer.write(p);
        console.log(wkt);

    });
    it("test avec une linestring", () => {
        const m = new Point([3.0,4.0]);
        const n = new Point([5.0,8.0]);
        const p = new Linestring([m,n]);
        const writer = new WktWriter();

        const wkt = writer.write(p);
        console.log(wkt);

    });
});

describe("test LogGeometry", () => {
    it("test visitorPoint", () => {
        const visitor = new LogGeometryVisitor();
        const geometry = new Point([3.0,4.0]);
        geometry.accept(visitor);
    });

    it("test visitorLinestring", () => {
        const visitor = new LogGeometryVisitor();
        const m = new Point([3.0,4.0]);
        const n = new Point([5.0,8.0]);
        const geometry = new Linestring([m,n]);
        geometry.accept(visitor);
    });
});

describe("test WktVisitor", () => {
    it("test getResult", () => {
        const visitor = new WktVisitor();
        const geometry = new Point([3.0,4.0]);
        geometry.accept(visitor);
        // "POINT(3.0 4.0)"
        const wkt = visitor.getResult();
        console.log(wkt);
    });
});

describe("test WktVisitor", () => {
    it("test avec point", () => {
        const p = new Point([3.0,4.0]);
        const result = p.asText();
        console.log(result);
        expect(result).to.equal("POINT(3 4)");
    });
});

describe("test getEnvelope", () => {
    it("test avec point", () => {
        const p = new Point([3.0,4.0]);
        const result = p.getEnvelope();
        expect(result.getXmin()).to.equal(3);
        expect(result.getYmin()).to.equal(4);
        expect(result.getXmax()).to.equal(3);
        expect(result.getYmax()).to.equal(4);

    });

    it("test avec linestring", () => {
        const m = new Point([3.0,4.0]);
        const n = new Point([5.0,8.0]);
        const p = new Linestring([m,n]);
        const result = p.getEnvelope();
        expect(result.getXmin()).to.equal(3);
        expect(result.getYmin()).to.equal(4);
        expect(result.getXmax()).to.equal(5);
        expect(result.getYmax()).to.equal(8);

    });
});

describe("test GeometryWithCachedEnvelope", () => {
    it("test getEnvelope", () => {
        let p = new Point([3.0,4.0]);
        let g = new GeometryWithCachedEnvelope(p);
        console.log(g);
        const a = p.getEnvelope() ; // calcul et stockage dans cachedEnvelope
        const b = g.getEnvelope() ; // renvoi de cachedEnvelope
        console.log(a);
        console.log(b);

    });
});

describe('test GeometryCollection', () => {

    it('should initialize with an empty collection if no geometries are passed', () => {
        const emptyCollection = new GeometryCollection();
        expect(emptyCollection.getNumGeometries()).to.equal(0);
    });

    it('should initialize with the correct number of geometries', () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([5.0,8.0]);
        const linestring = new Linestring([p1,p2]);
        const geometryCollection = new GeometryCollection([p1, p2, linestring]);
        expect(geometryCollection.getNumGeometries()).to.equal(3);
    });

    it('should return the correct geometry when getGeometryN is called', () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([5.0,8.0]);
        const linestring = new Linestring([p1,p2]);
        const geometryCollection = new GeometryCollection([p1, p2, linestring]);
        expect(geometryCollection.getGeometryN(0)).to.equal(p1);
        expect(geometryCollection.getGeometryN(1)).to.equal(p2);
        expect(geometryCollection.getGeometryN(2)).to.equal(linestring);
    });

    it('should clone the geometry collection', () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([5.0,8.0]);
        const linestring = new Linestring([p1,p2]);
        const geometryCollection = new GeometryCollection([p1, p2, linestring]);
        const clonedCollection = geometryCollection.clone();
        expect(clonedCollection).to.not.equal(geometryCollection);
        expect(clonedCollection.getNumGeometries()).to.equal(geometryCollection.getNumGeometries());
    });

    it('should return the correct type', () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([5.0,8.0]);
        const linestring = new Linestring([p1,p2]);
        const geometryCollection = new GeometryCollection([p1, p2, linestring]);
        expect(geometryCollection.getType()).to.equal('GeometryCollection');
    });

    it('should return true for isEmpty if collection is empty', () => {
        const emptyCollection = new GeometryCollection();
        expect(emptyCollection.isEmpty()).to.be.true;
    });

    it('should return false for isEmpty if collection is not empty', () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([5.0,8.0]);
        const linestring = new Linestring([p1,p2]);
        const geometryCollection = new GeometryCollection([p1, p2, linestring]);
        expect(geometryCollection.isEmpty()).to.be.false;
    });

    it('should translate all geometries by dx, dy', () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([5.0,8.0]);
        const linestring = new Linestring([p1.clone(),p2.clone()]);
        const geometryCollection = new GeometryCollection([p1, p2, linestring]);
        geometryCollection.translate(1, 1);
        expect(p1.getCoordinate()).to.deep.equal([4,5]);
        expect(p2.getCoordinate()).to.deep.equal([6,9]);
        expect(linestring.getPointN(0).getCoordinate()).to.deep.equal([4,5]);
        expect(linestring.getPointN(1).getCoordinate()).to.deep.equal([6,9]);
    });
});