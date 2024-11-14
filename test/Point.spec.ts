import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import Linestring from "../src/Linestring";
import Envelope from "../src/Envelope";
import EnvelopeBuilder from "../src/EnvelopeBuilder";

describe("test Point", () => {
    it("test default constructor", () => {
        const p = new Point();
        expect(p.getCoordinate()).to.deep.equal([]);
        expect(p.getType()).to.equal("Point");
        expect(Number.isNaN(p.x()));
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
});


describe("test Linestring", () => {
    it("test default constructor", () => {
        const p = new Linestring();
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
});

describe("test Envelope", () => {
    it("test constructeur", () => {
        const e = new Envelope([0.0,1.0], [1.0,3.0]);
        expect(e.toString()).to.deep.equal('BottomLeft: 0,1,TopRight: 1,3')

    });
});

describe("test EnvelopeBuilder", () => {
    it("test constructeur", () => {
        const builder = new EnvelopeBuilder();
        builder.insert([0.0,1.0]);
        builder.insert([2.0,0.0]);
        builder.insert([1.0,3.0]);
        // récupération du résultat
        const result = builder.build();
        console.log(result.toString())

    });
});
