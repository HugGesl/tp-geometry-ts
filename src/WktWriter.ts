import Geometry from "./Geometry";
import Point from "./Point";
import Linestring from "./Linestring";
export default class WktWriter {
    constructor() {}
    write(geometry:Geometry):string{
        if ( geometry instanceof Point ){
            return geometry.getType().toUpperCase()+'('+geometry.getCoordinate().join(" ")+')';
        }else if ( geometry instanceof Linestring ){
            let listCoord = [];
            for (let i=0; i<geometry.getNumPoints(); i++){
                listCoord.push(geometry.getPointN(i).x());
                listCoord.push(geometry.getPointN(i).y());
            }
            return geometry.getType().toUpperCase()+'('+listCoord.join(" ")+')';
        }else{
            throw new TypeError("geometry type not supported");
        }

    }
}