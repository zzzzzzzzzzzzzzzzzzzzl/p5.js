import Environment from './Environment'
import { cell } from './cell'
import { DistanceBetweenTwoPoints, vectorOfTwoPoints } from './functions'
import Mono from './mono'
import spacePartioning from './spacePartioning'

class creature extends cell {
  constructor(envSize, gene) {
    super("creature")
    
    //what is the work flow we are trying to manage// read some books pussy
    this.vision = gene.vision
    this.speed = gene.speed
    this.greed = gene.greed
    this.aggresion = gene.aggresion
    this.size=gene.size
    this.gene = gene
    
    // this.pos = {
    //   x: Math.random() * (spacePartioning.envSize - 100) + 50,
    //   y: Math.random() * (spacePartioning.envSize - 100) + 50,
    // }
    // this.alive = true
    this.color = [this.aggresion * 225, this.greed * 255, 50]
    // this.size = gene.size
    

    this.fitness = 1
    this.energy = 10

  }
  randomMove() {


    let x = 0
    let y = 0
    if (this.targetFood) {
      let vec = vectorOfTwoPoints(this.pos, this.targetFood.pos)
      if (vec.x < 0) {
        x += this.greed
      } else {
        x -= this.greed
      }
      if (vec.y < 0) {
        y += this.greed
      } else {
        y -= this.greed
      }
    }
    if (this.targetWorm) {
      let vec = vectorOfTwoPoints(this.pos, this.targetWorm.pos)
      if (vec.x < 0) {
        x += this.aggresion
      } else {
        x -= this.aggresion
      }
      if (vec.y < 0) {
        y += this.aggresion
      } else {
        y -= this.aggresion
      }
    }
    this.pos.x += (Math.random() - 0.5 + x) * this.speed
    this.pos.y += (Math.random() - 0.5 + y) * this.speed
  }

  render() {
    Environment.p5.fill(this.color)
    Environment.p5.stroke(this.color)
    Environment.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size) //where does x and y come from what is j?

  }

  findNearestFood() {
    // const arr = this.searchForFood()
    let arr=spacePartioning.searchForCells(this)
    arr=spacePartioning.findCellType(arr,"food")
    arr.forEach((k) => {
      arr.push(k)
      Environment.p5.stroke(1, 0, 50)
      Environment.p5.line(k.pos.x, k.pos.y, this.pos.x, this.pos.y)
    })
    // let creature=spacePartioning.findCellType("creature",arr)
    let lowestDistance = 9999
    let targetFood
    arr.map((i) => {
      const distance = DistanceBetweenTwoPoints(this.pos, i.pos)
      if (distance < lowestDistance) {
        lowestDistance = distance
        targetFood = i
      }
    })
    this.targetFoodDistance = lowestDistance
    if (targetFood) {
      this.targetFood = targetFood

      Environment.p5.stroke(255, 255, 250)
      Environment.p5.line(
        targetFood.pos.x,
        targetFood.pos.y,
        this.pos.x,
        this.pos.y
      )
    } else {
      this.targetFood = null
    }
  }
  findNearestWorm() {
    // const arr = this.searchForWorm()
    let arr=spacePartioning.searchForCells(this)
    arr=spacePartioning.findCellType(arr,"creature")
    // const arr = spacePartioning.searchForWorm(this)
    let lowestDistance = 9999
    let targetWorm
    arr.map((i) => {
      const distance = DistanceBetweenTwoPoints(this.pos, i.pos)
      if (distance < lowestDistance && i !== this) {
        lowestDistance = distance
        targetWorm = i
      }
    })
    this.targetWormDistance = lowestDistance
    if (targetWorm) {
      this.targetWorm = targetWorm

      Environment.p5.stroke(255, 0, 230)
      Environment.p5.line(
        this.pos.x,
        this.pos.y,
        targetWorm.pos.x,
        targetWorm.pos.y
      )
    } else {
      this.targetWorm = null
    }
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
  update() {
    this.randomMove()
    // this.findNearestWorm()
    // this.findNearestFood()
    let arr=spacePartioning.searchForCells(this)
    spacePartioning.findNearestCell(this,arr,"food")
    // spacePartioning.findNearestCell(this,arr,"creature")
  

    this.eatCreature()
    this.eatFood()
    this.render()
  }
}

export default creature
