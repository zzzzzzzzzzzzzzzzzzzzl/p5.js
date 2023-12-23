import { cell } from './cells/cell'
import spacePartitioning from './spacePartioning'

//handles updates
export class Mono {
  static updateQueue = new Set()
  static renderQueue = new Set()
  static objects = {}
  static countObjects() {
    let obj = {}
    Mono.updateQueue.forEach((i) => {
      if (!obj[i.constructor.name]) {
        obj[i.constructor.name] = []
      }
      obj[i.constructor.name].push(i)
    })
    Mono.creatureCount = obj.crea
    return obj
  }
  static update() {
    Mono.updateQueue.forEach((i) => {
      if (i.update) {
        i.update()
      }
      if (!i.alive) {
        Mono.updateQueue.delete(i)
      }
      if (i.render) {
        i.render()
      }
    })
    Mono.countObjects()
    cell.filterDeadCells()
    Mono.objects = Mono.countObjects()
  }
  constructor() {
    Mono.updateQueue.add(this)
    this.alive = true
  }
}
export default Mono
