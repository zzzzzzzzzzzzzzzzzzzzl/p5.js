class Plant extends cell{
    constructor() {
        super("plant")
    
        this.pos = {
          x: Math.random() * (spacePartitioning.envSize - 100) + 50,
          y: Math.random() * (spacePartitioning.envSize - 100) + 50,
        }
        this.alive = true
        this.color = [100, 200, 10]
        this.size = 5
      }
}