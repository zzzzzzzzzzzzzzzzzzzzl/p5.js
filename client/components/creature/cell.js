import Environment from './Environment'
import Mono from './mono'
import spacePartitioning from './spacePartioning'


export class cell extends Mono{
    constructor() {
        super()
        this.alive = true

        this.pos = {
          x: Math.random() * (spacePartitioning.envSize - 100) + 50, 
          y: Math.random() * (spacePartitioning.envSize - 100) + 50,
        }
        this.size = 25
        this.color = [100, 200, 10]
      }
      collision(){

      }
      render() {
        Environment.p5.fill(this.color)
        Environment.p5.stroke(this.color)
        Environment.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size) //where does x and y come from what is j?
      }
}