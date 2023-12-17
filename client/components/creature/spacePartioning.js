import Mono from './mono'
import Environment from './Environment'
import { cell } from './cell'
import { DistanceBetweenTwoPoints, getVectorRotation, vectorOfTwoPoints } from './functions'
import { isConstructorDeclaration } from 'typescript'

class spacePartitioning {
  static envSize = 4000
  static divisor = 150 //how many pixels each grid should be

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
            return []
          })
      })
    cell.cellArr.forEach((i) => {
      const x = Math.round(i.pos.x / spacePartitioning.divisor - 0.5)
      const y = Math.round(i.pos.y / spacePartitioning.divisor - 0.5)
      i.SPindex = { x: x, y: y }
      if (
        x < spacePartitioning.spacePartitioningArray.length-1 &&
        y < spacePartitioning.spacePartitioningArray.length-1 &&
        x > 0 &&
        y > 0
      ) {
        spacePartitioning.spacePartitioningArray[x][y].push(i)
      } else {
        i.alive = false
      }
    })
  }
  static drawGrid() {
    //light up adjasent boxes to creatures
    for(let i=0;i<spacePartitioning.spacePartitioningArray.length;i++){
      for(let j=0;j<spacePartitioning.spacePartitioningArray[i].length;j++){
        Environment.p5.fill(50, 100, 50)
        Environment.p5.stroke(150, 250, 50)
        Environment.p5.square(
          spacePartitioning.divisor * i,
          spacePartitioning.divisor * j,
          spacePartitioning.divisor
          )
        }
      }
    }

    static highlightGridContaining(){

      spacePartitioning.spacePartitioningArray.forEach((i, idx) => {
        i.forEach((j, jdx) => {
          if (j[0]) {
            for (
              let k = -Environment.searchDistance;
              k < 1 + Environment.searchDistance;
              k++
            ) {
              for (
                let l = -Environment.searchDistance;
                l < 1 + Environment.searchDistance;
                l++
              ) {
                if (
                  idx + k < spacePartitioning.spacePartitioningArray.length &&
                  jdx + l < spacePartitioning.spacePartitioningArray.length &&
                  j[0].type=="creature"
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
          cell.SPindex.x + i > 0 &&
          cell.SPindex.y + j > 0 
        ) {
          spacePartitioning.spacePartitioningArray[cell.SPindex.x + i][
            cell.SPindex.y + j
          ].forEach((k) => {

            if(k!=cell && k.type!='creature'){
              Environment.p5.stroke(255, 0, 230)
              Environment.p5.line(
                cell.pos.x,
                cell.pos.y,
                k.pos.x,
                k.pos.y
              )
              arr.push(k)
            }
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
      arr=spacePartitioning.findCellType(arr,type)
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
      targetCell.color=[0,0,0]

      Environment.p5.stroke(255, 0, 230)
      Environment.p5.line(
        cell.pos.x,
        cell.pos.y,
        targetCell.pos.x,
        targetCell.pos.y
      )
    } else {
      cell.targetCell = null
    }
    return targetCell
  }
  static getCellVectorRotation(cell2,cell){
    const vec=vectorOfTwoPoints(cell.pos,cell2.pos)
    return getVectorRotation(vec)
  }
  //returns the relative rotation of cell and cells in arr
  static getCellVectorRotationArr(cell,cellArr){
    return cellArr.map(i=>{
      return spacePartitioning.getCellVectorRotation(cell,i)
    })
  }
  static getCellInVisionArr(cell,cellArr){
    
    const low=cell.rotation-cell.cone
    const high=cell.rotation+cell.cone
    return cellArr.filter(i=>{
      const rot=spacePartitioning.getCellVectorRotation(i,cell)
      if (rot>low&&rot<high){
        i.color=[150,0,0]
        return i
      }
    })
  }
  static test(){
    let arr=[{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:-1,y:1},{x:-1,y:0},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},]
      arr.forEach(i=>{
        const rot=getVectorRotation(i)
      })
  }
}

export default spacePartitioning
