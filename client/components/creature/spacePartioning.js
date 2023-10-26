// import creature from './creatureClass'
// import { Food } from './food'
// import { storeManager } from './storeFunctions'
import Mono from './mono'
import Environment from './Environment'
import { cell } from './cell'

// const dispatch = useAppDispatch()
class spacePartitioning {
  static envSize = 800
  static divisor = 50 //how many pixels each grid should be
  static searchDistance = 2

  static wormArr = []
  static foodArr = []
  static spacePartitioningArray 
  //holly fuck clean some of this shit up
  static handleSpacePartitioning() {
    //https://en.wikipedia.org/wiki/Space_partitioning
    spacePartitioning.spacePartitioningArray = new Array(
      Math.round(spacePartitioning.envSize / spacePartitioning.divisor)
    )
      .fill()
      .map(() => {
        return new Array(
          Math.round(spacePartitioning.envSize / spacePartitioning.divisor)
        )
          .fill()
          .map(() => {
            return { worms: [], food: [],cells:[] }
          })
      })
    spacePartitioning.wormArr.forEach((i) => {
      const x = Math.round(i.pos.x / spacePartitioning.divisor - 0.5)
      const y = Math.round(i.pos.y / spacePartitioning.divisor - 0.5)
      i.SPindex = { x: x, y: y }
      if (
        x < spacePartitioning.spacePartitioningArray.length &&
        y < spacePartitioning.spacePartitioningArray.length &&
        x > -1 &&
        y > -1
      ) {
        spacePartitioning.spacePartitioningArray[x][y].worms.push(i)
      } else {
        i.alive = false
      }
    })
    spacePartitioning.foodArr.forEach((i) => {
      const x = Math.round(i.pos.x / spacePartitioning.divisor - 0.5)
      const y = Math.round(i.pos.y / spacePartitioning.divisor - 0.5)
      spacePartitioning.spacePartitioningArray[x][y].food.push(i)
    })
    cell.cellArr.forEach((i) => {
      const x = Math.round(i.pos.x / spacePartitioning.divisor - 0.5)
      const y = Math.round(i.pos.y / spacePartitioning.divisor - 0.5)
      spacePartitioning.spacePartitioningArray[x][y].cells.push(i)
    })
  }
  static drawGrid() {
    //light up adjasent boxes to creatures
    spacePartitioning.spacePartitioningArray.forEach((i, idx) => {
      i.forEach((j, jdx) => {
        Environment.p5.fill(50, 100, 50)
        Environment.p5.stroke(150, 250, 50)
        Environment.p5.square(
          spacePartitioning.divisor * idx,
          spacePartitioning.divisor * jdx,
          spacePartitioning.divisor
        )
      })
    })
    spacePartitioning.spacePartitioningArray.forEach((i, idx) => {
      i.forEach((j, jdx) => {
        if (j.worms[0]) {
          for (
            let k = -spacePartitioning.searchDistance;
            k < 1 + spacePartitioning.searchDistance;
            k++
          ) {
            for (
              let l = -spacePartitioning.searchDistance;
              l < 1 + spacePartitioning.searchDistance;
              l++
            ) {
              if (
                idx + k < spacePartitioning.spacePartitioningArray.length &&
                jdx + l < spacePartitioning.spacePartitioningArray.length
              ) {
                Environment.p5.fill(150, 50, 50)
                Environment.p5.square(
                  spacePartitioning.divisor * (idx + k),
                  spacePartitioning.divisor * (jdx + l),
                  spacePartitioning.divisor
                )
              }
            }
          }
        }
      })
    })
  }

  
  static searchForWorm(worm) {//returns an array of cells that are in adjasent squares
    let arr = []
    for (
      let i = -Environment.searchDistance;
      i < 1 + Environment.searchDistance;
      i++
    ) {
      for (
        let j = -Environment.searchDistance;
        j < 1 + Environment.searchDistance;
        j++
      ) {
        if (
          worm.SPindex.x + i < spacePartitioning.spacePartitioningArray.length &&
          worm.SPindex.y + j < spacePartitioning.spacePartitioningArray.length &&
          worm.SPindex.x + i > -1 &&
          worm.SPindex.y + j > -1
        ) {
          spacePartitioning.spacePartitioningArray[worm.SPindex.x + i][
            worm.SPindex.y + j
          ].worms.forEach((k) => {
            arr.push(k)
          })
        }
      }
    }
    return arr
  }
   
  static searchForCells(cell) {//returns an array of cells that are in adjasent squares
    let arr = []
    for (
      let i = -Environment.searchDistance;
      i < 1 + Environment.searchDistance;
      i++
    ) {
      for (
        let j = -Environment.searchDistance;
        j < 1 + Environment.searchDistance;
        j++
      ) {
        if (
          cell.SPindex.x + i < spacePartitioning.spacePartitioningArray.length &&
          cell.SPindex.y + j < spacePartitioning.spacePartitioningArray.length &&
          cell.SPindex.x + i > -1 &&
          cell.SPindex.y + j > -1
        ) {
          spacePartitioning.spacePartitioningArray[cell.SPindex.x + i][
            cell.SPindex.y + j
          ].cells.forEach((k) => {
            arr.push(k)
          })
        }
      }
    }
    return arr
  }
  static findCellType(arr,type){
    return arr.filter((i)=>i.type==type)
  }
  static findNearestCell(cell,arr,type=null){
    if(type){
      arr=arr.findCell(arr,type)
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
    this.targetWormDistance = lowestDistance
    if (targetCell) {
      this.targetCell = targetCell

      Environment.p5.stroke(255, 0, 230)
      Environment.p5.line(
        this.pos.x,
        this.pos.y,
        targetCell.pos.x,
        targetCell.pos.y
      )
    } else {
      this.targetCell = null
    }

  }
}

export default spacePartitioning
