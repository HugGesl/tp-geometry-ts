import Coordinate from "./Coordinate";

export default class Envelope {
    private bottomLeft?: Coordinate;
    private topRight?: Coordinate;

    constructor(bottomLeft?: Coordinate,topRight?: Coordinate ) {
        this.topRight = topRight? topRight: [] ;
        this.bottomLeft = bottomLeft? bottomLeft: [] ;
        
      }

    isEmpty():Boolean{
        return this.bottomLeft.length===0 || this.topRight.length===0;
    }

    getXmin(): number{
        if(this.isEmpty()){
            return undefined;
        }else{
            return this.bottomLeft[0];
        }

    }

    getYmin(): number{
        if(this.isEmpty()){
            return undefined;
        }else{
            return this.bottomLeft[1];
        }
    }

    getXmax(): number{
        if(this.isEmpty()){
            return undefined;
        }else{
            return this.topRight[0];
        }
    }

    getYmax(): number{
        if(this.isEmpty()){
            return undefined;
        }else{
            return this.topRight[1];
        }
    }

    toString():String{
        return 'BottomLeft: '+`${this.bottomLeft}` + ','+ 'TopRight: '+`${this.topRight}`;
    }


}
  