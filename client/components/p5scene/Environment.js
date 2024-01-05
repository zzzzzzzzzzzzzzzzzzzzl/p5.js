import creature from '../Environment/cells/creatureClass'
import { Food } from '../Environment/cells/food'
import { storeManager } from '../storeManager'
import Mono from '../Environment/mono'
import spacePartitioning from '../Environment/spacePartioning'
import { cell } from '../Environment/cells/cell'
import { camera } from '../Environment/camera'
import { sceneManager } from './sceneManager'
// const dispatch = useAppDispatch()
class Environment {
  static camera = new camera()

  //should probably just be a static function
  static p5
  static divisor = 50 //how many pixels each grid should be
  static searchDistance = 1
  static creatureCount = 0
  static foodCount = 0

  constructor(creatureCount, foodCount) {
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
  drawEnvCircle() {
    const n = spacePartitioning.envSize / 2
    sceneManager.p5.fill(50, 100, 50)
    sceneManager.p5.ellipse(n, n, n * 2, n * 2)
  }

  update() {
    // Environment.storeManager.onUpdate()
    sceneManager.p5.background(0)

    spacePartitioning.handleSpacePartitioning()

    Environment.camera.keydown()

    this.drawEnvCircle()
    Mono.update()
  }
}

export default Environment
