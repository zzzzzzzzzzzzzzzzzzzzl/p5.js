import p5 from 'p5'
import creature from './creatureClass'
import { Food } from './food'
import { storeManager } from './storeFunctions'
import Mono from './mono'
import spacePartitioning from './spacePartioning'
import { cell } from './cell'

// const dispatch = useAppDispatch()
class Environment extends Mono {
  static storeManager = new storeManager()
  static p5
  static divisor = 50 //how many pixels each grid should be
  static searchDistance = 1
  static envSize

  constructor(envSize, creatureCount, foodCount) {
    super()
    this.foodCount = foodCount
    Environment.envSize = envSize
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
      spacePartitioning.wormArr.map((i, idx) => {
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
      .forEach((i) => spacePartitioning.wormArr.push(i))
  }
  genFood() {
    Array(this.foodCount)
      .fill()
      .map(() => {
        return new Food()
      })
      .forEach((i) => spacePartitioning.foodArr.push(i))
  }

  update() {
    Environment.storeManager.onUpdate()
    spacePartitioning.handleSpacePartitioning()
    spacePartitioning.drawGrid()


  }
  setup = (p5, canvasParentRef) => {
    Environment.p5 = p5

    Environment.p5
      .createCanvas(Environment.envSize, Environment.envSize)
      .parent(canvasParentRef)
  }
  draw = () => {
    Mono.update()
  }
}

export default Environment
