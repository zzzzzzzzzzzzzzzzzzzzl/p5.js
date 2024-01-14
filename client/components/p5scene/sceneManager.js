import { keyUp } from '../../slices/keyboardInputs'
import store from '../../store'
import { storeManager } from '../storeManager'
import Environment from './Environment'
import creatureEditor from './creatureEditor'

export class sceneManager {
  static p5
  static storeManager = new storeManager()
  static canvasSize = 600

  constructor() {
    this.scenes = {
      environment: new Environment(100, 100),
      creatureEditor: new creatureEditor(),
    }
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
    store.dispatch(keyUp(this.keyUp))
    this.keyUp = ''

    const state = sceneManager.storeManager.getState()
    this.scenes[state.UIToCanvas.scene].update()
    sceneManager.storeManager.updateUIData()
  }
  keyReleased = () => {
    this.keyUp = sceneManager.p5.key
  }
}
