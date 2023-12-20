import Enviroment from '../../UI/enviroment'
import Environment from '../Environment'
import { cell } from './cell'
import {
  DistanceBetweenTwoPoints,
  getVectorRotation,
  rotateVector,
  vectorOfTwoPoints,
} from '../functions'
import spacePartitioning from '../spacePartioning'

class creature extends cell {
  constructor(gene) {
    super('creature')
    this.cone = 0.5
    this.speed = gene.speed
    this.greed = gene.greed
    this.aggresion = gene.aggresion
    this.size = gene.size
    this.gene = gene
    this.fitness = 1

    this.creatureCells = []
  }
  move() {
    let n = (Math.random() - 0.5) / 50
    this.rotation += n
    const vec = rotateVector(this.rotation)
    const pos = {
      x: this.pos.x + vec.x * this.speed,
      y: this.pos.y + vec.y * this.speed,
    }
    if (
      DistanceBetweenTwoPoints(pos, {
        x: spacePartitioning.envSize / 2,
        y: spacePartitioning.envSize / 2,
      }) >
      spacePartitioning.envSize / 2
    ) {
      this.rotation += Math.PI
    }
    this.pos = pos
  }
  drawVisionCone() {
    let vec = rotateVector(this.rotation)
    Environment.p5.stroke(0, 0, 0)
    Environment.p5.line(
      this.pos.x,
      this.pos.y,
      this.pos.x + vec.x * 350,
      this.pos.y + vec.y * 350
    )
    vec = rotateVector(this.rotation - this.cone)
    Environment.p5.line(
      this.pos.x,
      this.pos.y,
      this.pos.x + vec.x * 350,
      this.pos.y + vec.y * 350
    )
    vec = rotateVector(this.rotation + this.cone)
    Environment.p5.line(
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
    const rot = this.getCellVectorRotation(target, this)
    if (rot > this.rotation) {
      this.handleRotation(0.01)
    } else {
      this.handleRotation(-0.01)
    }
  }
  update() {
    this.move()
    let arr = this.searchForCells(this)
    // arr = this.getCellInVisionArr(this, arr)
    const NearestFood = this.findNearestCell(this, arr, 'food')
    if (NearestFood) {
      this.findTarget(NearestFood, 'here')
    }
    // this.drawVisionCone()
    this.eatCreature()
    this.eatFood()
    this.render()
  }
}

export default creature
