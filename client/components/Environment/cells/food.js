import Environment from '../../p5scene/Environment'
import { cell } from './cell'
import spacePartitioning from '../spacePartioning'
import { sceneManager } from '../../p5scene/sceneManager'

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
    sceneManager.p5.fill(this.color)
    sceneManager.p5.stroke(this.color)
    sceneManager.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size)
    this.color = [100, 200, 10]
  }

  update() {}
}
