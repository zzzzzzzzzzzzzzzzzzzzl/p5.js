import Enviroment from '../UI/enviroment'
import Environment from './Environment'
import { cell } from './cell'
import { DistanceBetweenTwoPoints, getVectorRotation, rotateVector, vectorOfTwoPoints } from './functions'
import Mono from './mono'
import spacePartioning from './spacePartioning'

class creature extends cell {
  constructor(gene) {
    super("creature")
    this.cone=.5
    this.speed = gene.speed
    this.greed = gene.greed
    this.aggresion = gene.aggresion
    this.size=gene.size
    this.gene = gene
    this.color = [this.aggresion * 225, this.greed * 255, 50]
    this.fitness = 1

  }
  move(){
    this.rotation+=(Math.random()-.5)/10
    const vec=rotateVector(this.rotation)
    this.pos.x += vec.x * this.speed
    this.pos.y += vec.y * this.speed
    Environment.p5.line(
      this.pos.x,
      this.pos.y,
      this.pos.x+vec.x*1000,
      this.pos.y+vec.y*1000
    )
  }
  drawVisionCone(){
    Environment.p5.stroke(0,0,0)
    let vec=rotateVector(this.rotation)
    Environment.p5.line(
      this.pos.x,
      this.pos.y,
      this.pos.x+vec.x*1000,
      this.pos.y+vec.y*1000
    )
    vec=rotateVector(this.rotation-this.cone)
    Environment.p5.line(
      this.pos.x,
      this.pos.y,
      this.pos.x+vec.x*1000,
      this.pos.y+vec.y*1000
    )
    vec=rotateVector(this.rotation+this.cone)
    Environment.p5.line(
      this.pos.x,
      this.pos.y,
      this.pos.x+vec.x*1000,
      this.pos.y+vec.y*1000
    )
    

  }
  render() {
    Environment.p5.fill(this.color)
    Environment.p5.stroke(this.color)
    Environment.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size) //where does x and y come from what is j?

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
  findTarget(target){
    const rot=spacePartioning.getCellVectorRotation(target,this)
    if(rot>this.rotation){
      this.handleRotation(0.01)
    }else{
      this.handleRotation(-0.01)
    }

  }
  update() {

    this.move()
    let arr=spacePartioning.searchForCells(this)
    arr=spacePartioning.getCellInVisionArr(this,arr)
    const NearestCell=spacePartioning.findNearestCell(this,arr,"food")
    if(NearestCell){
      this.findTarget(NearestCell)
    }

    this.drawVisionCone()
    this.eatCreature()
    this.eatFood()
    this.render()
  }
}

export default creature
