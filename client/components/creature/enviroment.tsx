import p5 from 'p5'
import creature from './creatureClass'
import { normalizeArray, mutateGene } from './geneFunctions'
import store from '../../store'
import { test } from '../../slices/Slice'

class enviroment {
  static p5
  constructor(envSize, creatureCount, foodCount, parentElement) {
    console.log('test')
    this.parentElement = parentElement
    this.count = 0

    this.foodCount = foodCount
    this.envSize = envSize
    this.creatureCount = creatureCount
    this.creatureArr = Array(creatureCount)
      .fill()
      .map(() => {
        return new creature(envSize, {
          vision: 50 + 500 * Math.random(),
          size: Math.random() * 5 + 20,
          greed: Math.random(),
          speed: 0.5 + Math.random(),
          aggresion: Math.random() - 0.75,
          largeAggresion: Math.random() - 0.75,
          smallAggresion: Math.random() - 0.25,
        })
      })

    this.genFood()
    //this.foodArr=Array(foodCount).fill().map(()=>{return {pos:[(Math.random()*(envSize-100)+50),(Math.random()*(envSize-100)+50)]}})

    this.fitnessArr = []
    // this.genePool = this.creatureArr.map((i) => {
    //   return i.gene
    // })
    // store.dispatch(test(this.genePool))
    // this.draw(envSize)

    // let timer = setInterval(() => {
    //   this.creatureArr.map((i, idx) => {
    //     i.fitness++
    //   })
    //   this.count++
    // }, 1000)
  }

  genCreature() {
    if (!this.fitnessArr[0]) {
      this.creatureArr = Array(this.creatureCount)
        .fill()
        .map(() => {
          return new creature(this.envSize)
        })
    } else {
      this.fitnessArr = this.fitnessArr.map((i) => {
        return mutateGene(i)
      })
      store.dispatch(test(this.fitnessArr.map((i) => i)))

      this.creatureArr = this.fitnessArr.map((i) => {
        return new creature(this.envSize, i)
      })
      this.fitnessArr = []
    }
  }
  genFood() {
    this.foodArr = Array(this.foodCount)
      .fill()
      .map(() => {
        return {
          pos: [
            Math.random() * (this.envSize - 100) + 50,
            Math.random() * (this.envSize - 100) + 50,
          ],
        }
      })
  }

  renderCreature() {
    this.creatureArr.map((i) => {
      enviroment.p5.fill(i.color)
      enviroment.p5.stroke(i.color)
      enviroment.p5.ellipse(i.pos[0], i.pos[1], i.size, i.size)
      enviroment.p5.textSize(32)
      // enviroment.p5.text(i.energy.toFixed(1), i.pos[0], i.pos[1]);
      i.snake.map((j) => {
        enviroment.p5.fill(i.color)
        enviroment.p5.stroke(i.color)
        enviroment.p5.ellipse(j[0], j[1], i.size, i.size)
      })
    })
  }
  renderFood() {
    this.foodArr.map((i) => {
      enviroment.p5.fill(100, 200, 10)
      enviroment.p5.ellipse(i.pos[0] + 5, i.pos[1] + 5, 5, 5)
    })
  }
  renderVisionLines() {
    this.creatureArr.map((i) => {
      enviroment.p5.stroke(i.color)
      const creaturesInVision = i.entityTracking(this.creatureArr)
      i.targetEntity(creaturesInVision)
      creaturesInVision.forEach((j) => {})
      // enviroment.p5.stroke(0,50,50)
      const foodInVision = i.foodTracking(this.foodArr)
      i.targetFood(foodInVision)
    })
    this.renderNearestFoodLines()
  }
  renderNearestFoodLines() {
    this.creatureArr.map((i) => {
      // enviroment.p5.stroke(255,50,250)
      if (i.nearestFood) {
        // enviroment.p5.line(...i.nearestFood)
      }
      // enviroment.p5.stroke(255,0,0)
      if (i.nearestEntity) {
        // enviroment.p5.line(...i.nearestEntity.spread)
      }
    })
  }
  starvation() {
    this.creatureArr = this.creatureArr.filter((i) => {
      if (i.energy > 0) {
        return true
      }
      this.fitnessArr.push({ fitness: i.fitness, gene: i.gene })
    })
  }

  processRemainingCreatures() {
    this.creatureArr.map((i) => {
      this.fitnessArr.push({ fitness: i.fitness, gene: i.gene })
    })
    this.creatureArr = []
  }

  spawnNextGeneration() {
    if (this.count > 25 || this.creatureArr.length < 2) {
      this.processRemainingCreatures()
      this.count = 0

      this.fitnessArr = normalizeArray(this.fitnessArr)
      this.genFood()
      this.genCreature()
    }
  }
  mousePressed() {
    if (
      enviroment.p5.mouseIsPressed &&
      enviroment.p5.mouseButton === enviroment.p5.LEFT
    ) {
      this.foodArr.push({ pos: [enviroment.p5.mouseX, enviroment.p5.mouseY] })
      console.log('here')
    }
  }

  update() {
    this.spawnNextGeneration()
    this.renderVisionLines()
    this.renderCreature()
    this.renderFood()
    this.mousePressed()
    this.starvation()

    this.creatureArr.forEach((i) => {
      i.randomMove()
      this.foodArr = i.eatFood(this.foodArr)
      const newArr = i.eatEntity(this.creatureArr)
      this.creatureArr = newArr[0]
      this.fitnessArr = [...this.fitnessArr, ...newArr[1]]
    })
  }
  setup = (p5, canvasParentRef) => {
    enviroment.p5 = p5
    enviroment.p5
      .createCanvas(this.envSize, this.envSize)
      .parent(canvasParentRef)
  }
  draw = () => {
    enviroment.p5.background(0)
    this.update()
  }
}

export default enviroment
