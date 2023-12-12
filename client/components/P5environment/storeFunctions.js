import { updateFPS,updateCamera } from '../../slices/UIToCanvas'
import store from '../../store'
import Environment from './Environment'

export class storeManager {
  constructor() {
    this.count = 0
  }
  getState() {
    return store.getState()
  }
  getFPS() {
    store.dispatch(updateFPS(Environment.p5.frameRate()))
  }
  getCamera() {
    let camera={scale:Environment.camera.scale,
      translate:Environment.camera.translate
    }

    store.dispatch(updateCamera(camera))
  }
  onUpdate() {
    this.count++
    if (this.count == 10) {
      this.count = 0
      this.getFPS()
      this.getCamera()
    }
  }
}
