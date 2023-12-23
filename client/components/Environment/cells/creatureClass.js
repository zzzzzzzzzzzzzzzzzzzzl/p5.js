import { cell } from './cell'
import {
  DistanceBetweenTwoPoints,
  genPos,
  getVectorRotation,
  rotateVector,
  vectorOfTwoPoints,
} from '../../functions'
import spacePartitioning from '../spacePartioning'
import Mono from '../mono'
import { sceneManager } from '../../p5scene/sceneManager'

class creature extends Mono {
  //creature is a container for cells
  //creature has a pos and cells also have a pos
  //idea is that we have a cell layout which is a bunch of vectors and then we move and rotate that around in a grater space
  constructor(gene) {
    super()
    this.cone = 0.5
    this.speed = gene.speed
    this.greed = gene.greed
    this.aggresion = gene.aggresion
    this.size = gene.size
    this.gene = gene
    this.fitness = 1
    this.pos = genPos()
    this.creatureCells = [new cell(), new cell()]
    this.creatureCells.map((i) => {
      i.pos.x = this.pos.x + Math.random() * 30
      i.pos.y = this.pos.y + Math.random() * 30
    })
    this.rotation = 0
  }
  move() {
    let n = (Math.random() - 0.5) / 50
    this.rotation += n
    const vec = rotateVector(this.rotation)
    const pos = {
      x: this.pos.x + vec.x * this.speed,
      y: this.pos.y + vec.y * this.speed,
    }
    this.pos = pos
    this.updateCells()
  }
  updateCells() {
    this.creatureCells.forEach((i, idx) => {
      i.rotation = this.rotation

      i.pos.x = this.pos.x + idx * i.size
      i.pos.y = this.pos.y + idx * i.size
    })
  }

  checkboundryCollision() {
    if (
      DistanceBetweenTwoPoints(pos, {
        x: spacePartitioning.envSize / 2,
        y: spacePartitioning.envSize / 2,
      }) >
      spacePartitioning.envSize / 2
    ) {
      this.rotation += Math.PI
    }
  }
  drawVisionCone() {
    let vec = rotateVector(this.rotation)
    sceneManager.p5
    sceneManager.p5.stroke(0, 0, 0)
    sceneManager.p5.line(
      this.pos.x,
      this.pos.y,
      this.pos.x + vec.x * 350,
      this.pos.y + vec.y * 350
    )
    vec = rotateVector(this.rotation - this.cone)
    sceneManager.p5.line(
      this.pos.x,
      this.pos.y,
      this.pos.x + vec.x * 350,
      this.pos.y + vec.y * 350
    )
    vec = rotateVector(this.rotation + this.cone)
    sceneManager.p5.line(
      this.pos.x,
      this.pos.y,
      this.pos.x + vec.x * 350,
      this.pos.y + vec.y * 350
    )
  }

  eatFood() {
    if (this.targetFood) {
      if (this.targetFoodDistance < this.size) {
        this.targetFood.alive = false
      }
    }
  }
  eatCreature() {
    if (this.targetWorm) {
      if (this.targetWormDistance < this.size) {
        this.targetWorm.alive = false
      }
    }
  }
  findTarget(target) {
    function getCellVectorRotation(cell2, cell) {
      const vec = vectorOfTwoPoints(cell.pos, cell2.pos)
      return getVectorRotation(vec)
    }
    const rot = getCellVectorRotation(target, this)
    if (rot > this.rotation) {
      this.handleRotation(0.01)
    } else {
      this.handleRotation(-0.01)
    }
  }
  handleRotation(n) {
    n = this.rotation + n
    if (n > Math.PI * 2) {
      n -= Math.PI * 2
    }
    if (n < 0) {
      n += Math.PI * 2
    }
    this.rotation = n
  }
  update() {
    this.move()
    let arr = this.creatureCells[0].searchForCells(this.creatureCells[0])
    const NearestFood = this.creatureCells[0].findNearestCell(
      this.creatureCells[0],
      arr,
      'food'
    )

    // this.findNearestCell(this, arr, 'food')
    if (NearestFood) {
      this.findTarget(NearestFood, 'here')
    }
  }
}

export default creature
