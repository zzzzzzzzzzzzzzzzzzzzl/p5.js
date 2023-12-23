import { sceneManager } from './sceneManager'

class creatureEditor {
  static divisor = 50 //how many pixels each grid should be
  static searchDistance = 1
  static creatureCount = 0
  static foodCount = 0

  constructor() {}

  drawEnvCircle() {
    const n = spacePartitioning.envSize / 2
    sceneManager.p5.fill(150, 150, 150)
    sceneManager.p5.ellipse(n, n, n * 2, n * 2)
  }
  update() {
    sceneManager.p5.background(0)
  }
}

export default creatureEditor
