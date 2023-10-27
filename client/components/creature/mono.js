import spacePartitioning from "./spacePartioning"

//handles updates

export class Mono {
  static updateQueue = new Set()
  static renderQueue = new Set()

  static update() {
    Mono.updateQueue.forEach((i) => {
      if (i.update) {
        i.update()
      }
      if (!i.alive) {
        Mono.updateQueue.delete(i)
        // spacePartitioning.wormArr.delete(i)
        // spacePartitioning.wormArr.delete(i)
      }
      if(i.render){
        i.render()
      }
    })
  }
  constructor() {
    Mono.updateQueue.add(this)
    this.alive = true
  }
}
export default Mono
