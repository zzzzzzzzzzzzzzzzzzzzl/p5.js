import Environment from './Environment'
import { cell } from './cell'
import spacePartitioning from './spacePartioning'

export class Food extends cell {
  constructor() {
    super('food')

    // this.pos = {
    //   x: Math.random() * (spacePartitioning.envSize - 100) + 50,
    //   y: Math.random() * (spacePartitioning.envSize - 100) + 50,
    // }
    this.alive = true
    this.color = [100, 200, 10]
    this.size = 5
  }
  render() {
    Environment.p5.fill(this.color)
    Environment.p5.stroke(this.color)
    Environment.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size)
    this.color = [100, 200, 10]
  }

  update() {}
}
