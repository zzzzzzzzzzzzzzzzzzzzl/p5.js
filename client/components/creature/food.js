import Environment from './Environment'

export class Food {
  constructor() {
    this.pos = {
      x: Math.random() * (Environment.envSize - 100) + 50,
      y: Math.random() * (Environment.envSize - 100) + 50,
    }
    this.alive = true
    this.color = [100, 200, 10]
    this.size = 5
  }
  render() {
    Environment.p5.fill(this.color)
    Environment.p5.stroke(this.color)
    Environment.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size) //where does x and y come from what is j?
  }
}
