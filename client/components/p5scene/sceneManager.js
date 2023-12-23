import { storeManager } from '../storeManager'
import Environment from './Environment'
import creatureEditor from './creatureEditor'

export class sceneManager {
  static p5
  static storeManager = new storeManager()
  static canvasSize = 1000
  constructor() {
    this.env = new Environment(100, 100, 100)
    this.creatureEditor = new creatureEditor()
    this.update = this.env.update
    this.scenes = { environment: this.env, creatureEditor: this.creatureEditor }
  }
  loadScene(fn) {
    this.update = this.env
  }

  setup = (p5, canvasParentRef) => {
    sceneManager.p5 = p5
    // sceneManager.canvasSize = canvasSize
    sceneManager.p5
      .createCanvas(sceneManager.canvasSize, sceneManager.canvasSize)
      .parent(canvasParentRef)
  }
  draw = () => {
    const state = sceneManager.storeManager.getState()
    console.log(state.UIToCanvas)

    this.scenes[state.UIToCanvas.scene].update()
  }
}
