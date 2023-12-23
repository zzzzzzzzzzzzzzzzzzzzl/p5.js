import Mono from './mono'
import Environment from '../p5scene/Environment'
import { cell } from './cells/cell'
import {
  DistanceBetweenTwoPoints,
  getVectorRotation,
  vectorOfTwoPoints,
} from '../functions'
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
        x < spacePartitioning.spacePartitioningArray.length - 1 &&
        y < spacePartitioning.spacePartitioningArray.length - 1 &&
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
    for (let i = 0; i < spacePartitioning.spacePartitioningArray.length; i++) {
      for (
        let j = 0;
        j < spacePartitioning.spacePartitioningArray[i].length;
        j++
      ) {
        sceneManager.p5.fill(50, 100, 50)
        sceneManager.p5.stroke(150, 250, 50)
        sceneManager.p5.square(
          spacePartitioning.divisor * i,
          spacePartitioning.divisor * j,
          spacePartitioning.divisor
        )
      }
    }
  }

  static highlightGridContaining() {
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
                j[0].type == 'creature'
              ) {
                sceneManager.p5.fill(150, 50, 50)
                sceneManager.p5.square(
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
}

export default spacePartitioning
