import Environment from './Environment'
import Mono from './mono'
import spacePartitioning from './spacePartioning'


export class cell extends Mono{
    static cellArr=[]
    static filterDeadCells(){
      cell.cellArr=cell.cellArr.filter(i=>i.alive)
    }
    constructor(type) {
        super()
        this.rotation=Math.random()*2*Math.PI
        this.type=type
        cell.cellArr.push(this)
        this.alive = true

        this.velocity={x:0,y:0}
        this.acceloration={x:0,y:0}

        this.pos = {
          x: Math.random() * (spacePartitioning.envSize - 100) + 50, 
          y: Math.random() * (spacePartitioning.envSize - 100) + 50,
        }
        this.size = 25
        this.color = [100, 200, 10]
      }
      handleRotation(n){
        n=this.rotation+n
        if (n>Math.PI*2){
          n-=Math.PI*2
        }
        if(n<0){
          n+=Math.PI*2
        }
        this.rotation=n
      }
      handleAcceloration(acc){
        this.acceloration.x+=acc.x
        this.acceloration.y+=acc.y
        
        this.velocity.x+=this.acceloration.x
        this.velocity.y+=this.acceloration.y
      }
      handleVelocity(){
        this.velocity.x+=this.acceloration.x
        this.velocity.y+=this.acceloration.y
      }
      render() {
        Environment.p5.fill(this.color)
        Environment.p5.stroke(this.color)
        Environment.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size) //where does x and y come from what is j?
      }
}