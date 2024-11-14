import Coordinate from "./Coordinate";
import Envelope from "./Envelope";

export default class EnvelopeBuilder {
    private xMin?: number;
    private yMin?: number;
    private xMax?: number;
    private yMax?: number;

    constructor() {
      }

    insert(coordinate:Coordinate){
        this.xMin= Math.min(this.xMin? this.xMin: coordinate[0], coordinate[0]);
        this.yMin= Math.min(this.yMin? this.yMin: coordinate[1], coordinate[1]);
        this.xMax= Math.max(this.xMax? this.xMax: coordinate[0], coordinate[0]);
        this.yMax= Math.max(this.yMax? this.yMax: coordinate[1], coordinate[1]);
        console.log(this.xMin+','+this.yMin+','+this.xMax+','+this.yMax)
    }

    build():Envelope{

        return new Envelope([this.xMin,this.yMin], [this.xMax, this.yMax]);
    }

}