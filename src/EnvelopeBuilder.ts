import Coordinate from "./Coordinate";
import Envelope from "./Envelope";

export default class EnvelopeBuilder {
    private xMin?: number;
    private yMin?: number;
    private xMax?: number;
    private yMax?: number;

    constructor() {}

    insert(coordinate:Coordinate){
        this.xMin = this.xMin === undefined ? coordinate[0] : Math.min(this.xMin, coordinate[0]);
        this.yMin = this.yMin === undefined ? coordinate[1] : Math.min(this.yMin, coordinate[1]);
        this.xMax = this.xMax === undefined ? coordinate[0] : Math.max(this.xMax, coordinate[0]);
        this.yMax = this.yMax === undefined ? coordinate[1] : Math.max(this.yMax, coordinate[1]);

        //console.log(this.xMin+','+this.yMin+','+this.xMax+','+this.yMax);
    }

    build():Envelope{
        return new Envelope([this.xMin,this.yMin], [this.xMax, this.yMax]);
    }

}