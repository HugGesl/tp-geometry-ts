import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import Linestring from "../src/Linestring";

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
        console.log(n);
        p.translate(1.0,1.0);
        expect(p.getPointN(0).getCoordinate()).to.deep.equal([4.0,5.0]);
    });

    it("test clone", () => {
        const m = new Point([3.0,4.0]);
        const n = new Point([5.0,8.0]);
        const p = new Linestring([m,n]);
        const g = p.clone();
        console.log(g.getPointN(0));
        p.translate(1.0,1.0);
        console.log(g.getPointN(0));

        expect(g.getPointN(0).getCoordinate()).to.deep.equal([3.0,4.0]);
    });
});