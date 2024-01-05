import { DistanceBetweenTwoPoints } from '../functions'
import { sceneManager } from './sceneManager'

class creatureEditor {
  constructor() {
    this.arr = []
  }

  drawEnvCircle() {
    const n = sceneManager.canvasSize / 2
    sceneManager.p5.fill(150, 15, 150)
    sceneManager.p5.ellipse(n, n, n * 2, n * 2)
  }
  onclick() {
    if (sceneManager.p5.mouseIsPressed) {
      const obj = {
        vec: {
          x: sceneManager.p5.mouseX,
          y: sceneManager.p5.mouseY,
        },
        size: Math.random() * 50,
      }
      if (!this.checkForOverLap(obj)) {
        this.arr.push(obj)
      }
    }
  }
  background() {}
  renderArr() {
    sceneManager.p5.fill(50, 150, 0)
    this.arr.forEach((i) => {
      sceneManager.p5.ellipse(i.vec.x, i.vec.y, i.size, i.size)
    })
  }
  checkForOverLap(obj) {
    let overlap = false
    this.arr.forEach((i) => {
      if (obj != i) {
        const n = DistanceBetweenTwoPoints(obj.vec, i.vec) * 2
        let k = obj.size + i.size

        if (n < k) {
          overlap = true
        }
      }
    })
    return overlap
  }

  update() {
    sceneManager.p5.background(250)
    sceneManager.p5.fill(0, 0, 0)
    sceneManager.p5.rect(20, 20, 560, 560)
    this.renderArr()

    this.onclick()
    this.renderArr()
  }
}

export default creatureEditor
