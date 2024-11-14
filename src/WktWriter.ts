import Geometry from "./Geometry";
import Point from "./Point";
import Linestring from "./Linestring";
export default class WktWriter {
    constructor() {}
    write(geometry:Geometry):string{
        if ( geometry instanceof Point ){
            return geometry.getType().toUpperCase()+'('+geometry.getCoordinate()+')';
        }else if ( geometry instanceof Linestring ){
            //return geometry.getType().toUpperCase()+'('+ +')';
        }else{
            throw new TypeError("geometry type not supported");
        }

    }
}