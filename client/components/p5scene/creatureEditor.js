import { randomColour } from '../UI/UIfunctions'
import {
  DistanceBetweenTwoPoints,
  genPos,
  getRandomInt,
  getVectorRotation,
  rotateVector,
  unitVector,
  vectorOfTwoPoints,
} from '../functions'
import { storeManager } from '../storeManager'
import { sceneManager } from './sceneManager'

class creatureEditor {
  static center

  constructor() {
    this.gravity = 1
    creatureEditor.center = {
      x: sceneManager.canvasSize / 2,
      y: sceneManager.canvasSize / 2,
    }
    this.arr = []
    this.brushSize = 10
  }
  renderBrush() {
    sceneManager.p5.fill(0, 0, 0, 255)
    sceneManager.p5.stroke(255, 255, 255)

    sceneManager.p5.ellipse(
      sceneManager.p5.mouseX,
      sceneManager.p5.mouseY,
      this.brushSize,
      this.brushSize
    )
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
        gravity: 0.5,
        size: this.brushSize,
        colour: randomColour(),
      }
      if (!this.checkForOverLap(obj)) {
        this.arr.push(obj)
      }
    }
  }

  renderArr() {
    this.arr.forEach((i) => {
      sceneManager.p5.stroke(i.colour)

      sceneManager.p5.fill(i.colour)
      sceneManager.p5.ellipse(i.vec.x, i.vec.y, i.size, i.size)
    })
  }
  checkForOverLap(obj) {
    let overlap = false
    let touching = null
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
  collision(obj1, obj2) {
    const n = DistanceBetweenTwoPoints(obj1.vec, obj2.vec) * 2
    let k = obj1.size + obj2.size + 5
    if (n < k) {
      const unitVec = unitVector(obj1.vec, obj2.vec)

      obj1.vec.x += (unitVec.x * obj1.size) / 20
      obj1.vec.y += (unitVec.y * obj1.size) / 20
      obj2.vec.x -= (unitVec.x * obj2.size) / 20
      obj2.vec.y -= (unitVec.y * obj2.size) / 20
    }
  }

  physics() {
    this.arr.forEach((i) => {
      const vec = vectorOfTwoPoints(i.vec, creatureEditor.center)
      const multi = Math.sqrt(Math.sqrt(vec.x ** 2 + vec.y ** 2)) / 5
      const unitvec = unitVector(i.vec, creatureEditor.center)

      const f = () => {
        i.vec.x -= unitvec.x * this.gravity
        i.vec.y -= unitvec.y * this.gravity
      }

      f()

      this.arr.forEach((j) => {
        if (j != i) {
          this.collision(j, i)
        }
      })
      this.arr.forEach((j) => {
        if (j != i) {
          this.collision(j, i)
        }
      })
      this.arr.forEach((j) => {
        if (j != i) {
          this.collision(j, i)
        }
      })
    })
  }
  keyInputs() {
    if (sceneManager.p5.keyIsDown(219)) {
      //trigger if "[" is pressed
      if (this.brushSize > 0) {
        this.brushSize--
      }
    }

    if (sceneManager.p5.keyIsDown(221)) {
      //trigger if "]" is pressed
      this.brushSize++
    }
    if (this.goto0g) {
      this.killGravity(0.01)
    }
    if (sceneManager.p5.keyIsDown(75)) {
      // Do something when 'K' key is pressed
      this.gravity = 0
    }
    if (sceneManager.p5.keyIsDown(74)) {
      // Do something when 'j' key is pressed
      this.gravity = 1
    }
    if (sceneManager.p5.keyIsDown(82)) {
      // Do something when 'r' key is pressed

      this.randomCreature()
    }
  }
  killGravity(g) {
    if (this.gravity > 0) {
      this.gravity -= 0.01
    }
  }
  render() {
    sceneManager.p5.background(250)
    sceneManager.p5.fill(0, 0, 0)
    sceneManager.p5.rect(20, 20, 560, 560)
    this.renderBrush()
    this.renderArr()
  }

  saveToJson() {
    // const jsonData = JSON.stringify(data, null, 2);
  }
  randomCreature() {
    this.gravity
    console.log(sceneManager.canvasSize)
    this.arr = []
    const r = getRandomInt(2, 12)
    for (let i = 0; i < r; i++) {
      this.arr.push({
        vec: {
          x: 450 - Math.random() * 300,
          y: 450 - Math.random() * 300,
        },
        gravity: 0.5,
        size: 10 + Math.random() * 10,
        colour: randomColour(),
      })
    }
  }
  update() {
    this.render()
    this.keyInputs()

    this.physics()
    this.onclick()
  }
}

export default creatureEditor
