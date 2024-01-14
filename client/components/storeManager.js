import { updateFPS, updateCamera, updateUIData } from '../slices/CanvasToUI'
import store from '../store'
import Environment from './p5scene/Environment'
import Mono from './Environment/mono'
import { sceneManager } from './p5scene/sceneManager'
import { keyUp } from '../slices/keyboardInputs'

export class storeManager {
  constructor() {
    this.count = 0
  }
  getState() {
    return store.getState()
  }
  updateUIData() {
    const data = {
      fps: sceneManager.p5.frameRate(),
      camera: {
        scale: Environment.camera.scale,
        x: Environment.camera.translate.x,
        y: Environment.camera.translate.y,
      },
      cursor: { x: sceneManager.p5.mouseX, y: sceneManager.p5.mouseY },
    }
    store.dispatch(updateUIData(data))
  }

  onUpdate() {
    this.count++
    if (this.count == 10) {
      this.count = 0
      this.updateUIData()
    }
  }
  keyUp(key) {
    store.dispatch(keyUp(key))
  }
}
