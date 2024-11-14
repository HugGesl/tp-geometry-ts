import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import Linestring from "../src/Linestring";
import Envelope from "../src/Envelope";
import EnvelopeBuilder from "../src/EnvelopeBuilder";
import WktWriter from "../src/WktWriter";

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