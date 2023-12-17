import { updateFPS, updateCamera, updateUIData } from '../../slices/UIToCanvas'
import store from '../../store'
import Environment from './Environment'
import Mono from './mono'

export class storeManager {
  constructor() {
    this.count = 0
  }
  getState() {
    return store.getState()
  }
  updateUIData() {
    const data = {
      fps: Environment.p5.frameRate(),
      camera: {
        scale: Environment.camera.scale,
        x: Environment.camera.translate.x,
        y: Environment.camera.translate.y,
      },
      cursor: { x: Environment.p5.mouseX, y: Environment.p5.mouseY },
      // creatureCount:Mono.
      // Mono.
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
}
