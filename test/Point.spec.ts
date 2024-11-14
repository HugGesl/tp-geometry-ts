import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import Linestring from "../src/Linestring";

describe("test Point", () => {
    it("test default constructor", () => {
        const p = new Point();
        expect(p.getCoordinate()).to.equal(undefined);
        expect(p.getType()).to.equal("Point");
        expect(Number.isNaN(p.x()));
        expect(Number.isNaN(p.y()));
    });
    it("test constructor with coordinates", () => {
        const p = new Point([3.0,4.0]);
        expect(p.getCoordinate()).to.deep.equal([3.0,4.0]);
        expect(p.getType()).to.equal("Point");
        expect(p.x()).to.equal(3.0);
        expect(p.y()).to.equal(4.0);
    });
});


describe("test Linestring", () => {
    it("test default constructor", () => {
        const p = new Linestring();
        expect(Number.isNaN(p.getNumPoints()));
        expect(p.getType()).to.equal("Linestring");

    });
    it("test constructor with coordinates", () => {
        const m = new Point([3.0,4.0]);
        const n = new Point([5.0,8.0]);
        const p = new Linestring([m,n]);
        expect(p.getNumPoints()).to.equal(2);
        expect(p.getType()).to.equal("Linestring");
        expect(p.getPointN(1)).to.equal(n);
    });
});