import Environment from '../Environment'
import {
  DistanceBetweenTwoPoints,
  vectorOfTwoPoints,
  withinEnvCircleBounds,
  getVectorRotation,
} from '../functions'
import Mono from '../mono'
import spacePartitioning from '../spacePartioning'

export class cell extends Mono {
  static cellArr = []
  static filterDeadCells() {
    cell.cellArr = cell.cellArr.filter((i) => i.alive)
  }
  constructor(type) {
    super()

    cell.cellArr.push(this)

    this.type = type

    this.rotation = Math.random() * 2 * Math.PI
    this.velocity = { x: 0, y: 0 }
    this.acceloration = { x: 0, y: 0 }
    this.alive = true
    this.pos = this.genPos()
    this.size = 25
    this.color = [100, 200, 10]
    this.searchDistance = 2
  }
  genPos() {
    let pos = {
      x: Math.random() * spacePartitioning.envSize,
      y: Math.random() * spacePartitioning.envSize,
    }
    if (
      DistanceBetweenTwoPoints(pos, {
        x: spacePartitioning.envSize / 2,
        y: spacePartitioning.envSize / 2,
      }) >
      spacePartitioning.envSize / 2
    ) {
      pos = this.genPos()
    }
    return pos
  }
  handleRotation(n) {
    n = this.rotation + n
    if (n > Math.PI * 2) {
      n -= Math.PI * 2
    }
    if (n < 0) {
      n += Math.PI * 2
    }
    this.rotation = n
  }
  handleAcceloration(acc) {
    this.acceloration.x += acc.x
    this.acceloration.y += acc.y

    this.velocity.x += this.acceloration.x
    this.velocity.y += this.acceloration.y

    this.pos.x += this.velocity.x
    this.pos.y += this.velocity.y
  }

  render() {
    Environment.p5.fill(this.color)
    Environment.p5.stroke(this.color)
    Environment.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size) //where does x and y come from what is j?
  }

  searchForCells(cell) {
    //returns an array of cells that are in adjasent spacePartitioning squares
    let arr = []
    for (let i = -this.searchDistance; i < 1 + this.searchDistance; i++) {
      for (let j = -this.searchDistance; j < 1 + this.searchDistance; j++) {
        if (
          cell.SPindex.x + i <
            spacePartitioning.spacePartitioningArray.length &&
          cell.SPindex.y + j <
            spacePartitioning.spacePartitioningArray.length &&
          cell.SPindex.x + i > 0 &&
          cell.SPindex.y + j > 0
        ) {
          spacePartitioning.spacePartitioningArray[cell.SPindex.x + i][
            cell.SPindex.y + j
          ].forEach((k) => {
            if (k != cell && k.type != 'creature') {
              Environment.p5.stroke(255, 0, 230)
              Environment.p5.line(cell.pos.x, cell.pos.y, k.pos.x, k.pos.y)
              arr.push(k)
            }
          })
        }
      }
    }
    return arr
  }
  findCellType(arr, type) {
    return arr.filter((i) => i.type == type)
  }
  findNearestCell(cell, arr, type = null) {
    if (type) {
      arr = this.findCellType(arr, type)
    }
    let lowestDistance = 9999
    let targetCell
    arr.map((i) => {
      const distance = DistanceBetweenTwoPoints(cell.pos, i.pos)
      if (distance < lowestDistance && i !== cell) {
        lowestDistance = distance
        targetCell = i
      }
    })

    cell.targetFoodDistance = lowestDistance
    if (targetCell) {
      cell.targetFood = targetCell
      targetCell.color = [0, 0, 0]

      Environment.p5.stroke(255, 0, 230)
      Environment.p5.line(
        cell.pos.x,
        cell.pos.y,
        targetCell.pos.x,
        targetCell.pos.y
      )
    } else {
    }
    return targetCell
  }
  getCellVectorRotation(cell2, cell) {
    const vec = vectorOfTwoPoints(cell.pos, cell2.pos)
    return getVectorRotation(vec)
  }
  //returns the relative rotation of cell and cells in arr
  getCellVectorRotationArr(cell, cellArr) {
    return cellArr.map((i) => {
      return this.getCellVectorRotation(cell, i)
    })
  }
  getVectorRotation
  getCellInVisionArr(cell, cellArr) {
    console.log(cellArr.length, 'n')
    const low = cell.rotation - cell.cone
    const high = cell.rotation + cell.cone
    const arr = cellArr.filter((i) => {
      const rot = this.getCellVectorRotation(i, cell)
      if (rot > low && rot < high) {
        i.color = [150, 0, 0]
        return i
      }
    })
    console.log(cellArr.length, 'y')
    return arr
  }
  eatCell() {
    if (this.targetFood) {
      if (this.targetFoodDistance < this.size) {
        this.targetFood.alive = false
      }
    }
  }
}
