import environment from "../../slices/environment";
import Environment from "./Environment";

export class camera{
    constructor(){
        this.scale=1
        this.translate={x:0,y:0}
        console.log(this.scale)
        const self=this
    }
    keydown(){
        if (Environment.p5.keyIsDown(87)) { // "W" key
            this.translate.y+=1
        }
          if (Environment.p5.keyIsDown(83)) { // "S" key
            this.translate.y-=1
          }
          if (Environment.p5.keyIsDown(65)) { // "A" key
            this.translate.x-=1
          }
          if (Environment.p5.keyIsDown(68)) { // "D" key
            this.translate.x+=1
          }
        if(Environment.p5.keyIsPressed){
            if (Environment.p5.key === '+') {
              this.scale*=1.05
          } else if (Environment.p5.key === '-') {
              this.scale*=.95
            }
        }
        Environment.p5.scale(this.scale)
          Environment.p5.translate(this.translate.x,this.translate.y)
    }
}