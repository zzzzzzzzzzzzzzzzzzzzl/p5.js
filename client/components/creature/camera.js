import environment from "../../slices/environment";
import Environment from "./Environment";
import Mono from "./mono";
import spacePartitioning from "./spacePartioning";

export class camera {
    constructor(){
        this.scale=1
        this.speed=1
        this.scaleTranslate={x:0,y:0}
        this.translate={x:-spacePartitioning.envSize/2,y:-spacePartitioning.envSize/2}
    }
    keydown(){
        if (Environment.p5.keyIsDown(87)) { // "W" key
            this.translate.y+=1*this.speed
        }
          if (Environment.p5.keyIsDown(83)) { // "S" key
            this.translate.y-=1*this.speed
          }
          if (Environment.p5.keyIsDown(65)) { // "A" key
            this.translate.x+=1*this.speed
          }
          if (Environment.p5.keyIsDown(68)) { // "D" key
            this.translate.x-=1*this.speed
          }
        if(Environment.p5.keyIsDown(80)){
        
              this.scale*=1.05
              this.speed*=.95
              console.log(this.speed,this.scale)
          } else if (Environment.p5.keyIsDown(79)) {
              this.scale*=.95
              this.speed*=1.05
        }
        this.scaleZoom()
        Environment.p5.scale(this.scale)
        // Environment.p5.translate(this.translate.x,this.translate.y)

        Environment.p5.translate(this.scaleTranslate.x,this.scaleTranslate.y)
    }
    scaleZoom(){
      this.scaleTranslate.x=(Environment.envSize)*this.speed
      this.scaleTranslate.y=(Environment.envSize)*this.speed
      console.log(this.scaleTranslate,this.scale)
    }
  }