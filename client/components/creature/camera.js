import environment from '../../slices/environment'
import Environment from './Environment'
import Mono from './mono'
import spacePartitioning from './spacePartioning'

export class camera {
  constructor() {
    this.scale = 0.18
    this.speed = 7
    this.scaleTranslate = { x: -0, y: -0 }
    this.translate = {
      x: 200,
      y: 200,
    }
  }
  keydown() {
    if (Environment.p5.keyIsDown(87)) {
      // "W" key
      this.translate.y += this.speed / this.scale
    }
    if (Environment.p5.keyIsDown(83)) {
      // "S" key
      this.translate.y -= this.speed / this.scale
    }
    if (Environment.p5.keyIsDown(65)) {
      // "A" key
      this.translate.x += this.speed / this.scale
    }
    if (Environment.p5.keyIsDown(68)) {
      // "D" key
      this.translate.x -= this.speed / this.scale
    }
    if (Environment.p5.keyIsDown(80)) {
      //"p" key
      this.scale *= 1.05
    } else if (Environment.p5.keyIsDown(79)) {
      //"o" key

      this.scale *= 0.95
    }

    Environment.p5.scale(this.scale)
    Environment.p5.translate(this.translate.x, this.translate.y)
  }
}
