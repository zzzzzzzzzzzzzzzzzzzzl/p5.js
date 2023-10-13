import p5 from 'p5'
import creature from './creatureClass'
import { normalizeArray, mutateGene } from './geneFunctions'
import store from '../../store'
import { test } from '../../slices/Slice'
import { Food } from './food'
import { DistanceBetweenTwoPoints } from './functions'

class Environment {
  static p5
  static envSize
  static SPArr //space partitoning arr
  static wormArr = []
  static foodArr = []
  static objects = {
    wormArr: Environment.wormArr,
    foodArr: Environment.foodArr,
  }
  static divisor = 15 //how many pixels each grid should be
  static searchDistance = 2

  static renderObjects() {
    Environment.foodArr.forEach((i) => {
      i.render()
    })
    Environment.wormArr.forEach((i) => {
      i.randomMove()
      i.render()
    })
  }

  static handleSpacePartitioning() {
    //https://en.wikipedia.org/wiki/Space_partitioning
    Environment.SParr = new Array(
      Math.round(Environment.envSize / Environment.divisor)
    )
      .fill()
      .map(() => {
        return new Array(Math.round(Environment.envSize / Environment.divisor))
          .fill()
          .map(() => {
            return { worms: [], food: [] }
          })
      })
    Environment.wormArr.forEach((i) => {
      const x = Math.round(i.pos.x / Environment.divisor - 0.5)
      const y = Math.round(i.pos.y / Environment.divisor - 0.5)
      i.SPindex = { x: x, y: y }
      if (
        x < Environment.SParr.length &&
        y < Environment.SParr.length &&
        x > -1 &&
        y > -1
      ) {
        Environment.SParr[x][y].worms.push(i)
      } else {
        i.alive = false
      }
    })
    Environment.foodArr.forEach((i) => {
      const x = Math.round(i.pos.x / Environment.divisor - 0.5)
      const y = Math.round(i.pos.y / Environment.divisor - 0.5)
      Environment.SParr[x][y].food.push(i)
    })
  }
  static drawGrid() {
    //light up adjasent boxes to creatures
    Environment.SParr.forEach((i, idx) => {
      i.forEach((j, jdx) => {
        Environment.p5.fill(50, 100, 50)
        Environment.p5.stroke(150, 250, 50)
        Environment.p5.square(
          Environment.divisor * idx,
          Environment.divisor * jdx,
          Environment.divisor
        )
      })
    })
    Environment.SParr.forEach((i, idx) => {
      i.forEach((j, jdx) => {
        if (j.worms[0]) {
          for (
            let k = -Environment.searchDistance;
            k < 1 + Environment.searchDistance;
            k++
          ) {
            for (
              let l = -Environment.searchDistance;
              l < 1 + Environment.searchDistance;
              l++
            ) {
              if (
                idx + k < Environment.SParr.length &&
                jdx + l < Environment.SParr.length
              ) {
                Environment.p5.fill(150, 50, 50)
                Environment.p5.square(
                  Environment.divisor * (idx + k),
                  Environment.divisor * (jdx + l),
                  Environment.divisor
                )
              }
            }
          }
        }
      })
    })
  }

  static filterDeadObjects() {
    for (const key in Environment.objects) {
      for (let i = Environment.objects[key].length - 1; i > 0; i--) {
        if (false == Environment.objects[key][i].alive) {
          Environment.objects[key].splice(i, 1)
        }
      }
    }
  }

  constructor(envSize, creatureCount, foodCount) {
    this.foodCount = foodCount
    creatureCount = 20

    Environment.envSize = envSize

    Environment.SParr = new Array(
      Math.round(envSize / Environment.divisor)
    ).fill([])

    this.creatureCount = creatureCount
    this.defaultGene = () => ({
      vision: 50 + 500 * Math.random(),
      size: Math.random() * 5 + 20,
      greed: Math.random(),
      speed: 0.5 + Math.random(),
      aggresion: Math.random() - 0.75,
      largeAggresion: Math.random() - 0.75,
      smallAggresion: Math.random() - 0.25,
    })
    this.fitnessArr = []

    this.genCreature()
    this.genFood()

    this.count = 0
    setInterval(() => {
      Environment.wormArr.map((i, idx) => {
        i.fitness++
      })
      this.count++
    }, 1000)
  }

  genCreature() {
    Array(this.creatureCount)
      .fill()
      .map(() => {
        return new creature(Environment.envSize, this.defaultGene())
      })
      .forEach((i) => Environment.wormArr.push(i))
  }
  genFood() {
    Array(this.foodCount)
      .fill()
      .map(() => {
        return new Food()
      })
      .forEach((i) => Environment.foodArr.push(i))
  }

  update() {
    let visable = true
    if (Environment.p5.keyIsDown(69)) {
      visable = false
    }
    Environment.handleSpacePartitioning()
    Environment.drawGrid()
    Environment.filterDeadObjects()
    Environment.foodArr.forEach((i) => {
      i.render()
    })
    Environment.wormArr.forEach((i) => {
      i.randomMove()
      if (visable) {
        i.render()
      }
      i.findNearestWorm()
      i.findNearestFood()
      i.eatCreature()
      i.eatFood()
    })
  }
  setup = (p5, canvasParentRef) => {
    Environment.p5 = p5
    Environment.p5
      .createCanvas(Environment.envSize, Environment.envSize)
      .parent(canvasParentRef)
  }
  draw = () => {
    Environment.p5.background(0)
    this.update()
  }
}

export default Environment
