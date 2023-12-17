import p5 from 'p5'
import creature from './creatureClass'
import { Food } from './food'
import { storeManager } from './storeFunctions'
import Mono from './mono'
import spacePartitioning from './spacePartioning'
import { cell } from './cell'
import { rotateVector } from './functions'
import { isConstructorDeclaration } from 'typescript'
import { camera } from './camera'
// const dispatch = useAppDispatch()
class Environment extends Mono {
  static camera = null
  static storeManager = new storeManager()
  static p5
  static divisor = 50 //how many pixels each grid should be
  static searchDistance = 1
  static envSize
  static creatureCount = 0
  static foodCount = 0

  constructor(envSize, creatureCount, foodCount) {
    super()
    // this.camera=new camera()

    Environment.camera = new camera()
    Environment.envSize = envSize

    this.foodCount = foodCount
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
      cell.cellArr.map((i, idx) => {
        i.fitness++
      })
      this.count++
    }, 1000)
  }

  genCreature() {
    Array(this.creatureCount)
      .fill()
      .map(() => {
        return new creature(this.defaultGene())
      })
  }
  genFood() {
    Array(this.foodCount)
      .fill()
      .map(() => {
        return new Food()
      })
  }

  update() {
    Environment.storeManager.onUpdate()
    Environment.p5.background(0)

    spacePartitioning.handleSpacePartitioning()

    Environment.camera.keydown()
    this.drawEnvCircle()
  }
  drawEnvCircle() {
    const n = spacePartitioning.envSize / 2
    Environment.p5.fill(50, 100, 50)
    Environment.p5.ellipse(n, n, n * 2, n * 2)
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
