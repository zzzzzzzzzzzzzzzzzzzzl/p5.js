import Environment from './p5scene/Environment'
import spacePartitioning from './Environment/spacePartioning'

export function vectorOfTwoPoints(a, b) {
  const x = a.x - b.x
  const y = a.y - b.y
  return { x: x, y: y }
}
export function unitVector(a, b) {
  let vec = vectorOfTwoPoints(a, b)
  const m = DistanceBetweenTwoPoints(a, b)
  return { x: vec.x / m, y: vec.y / m }
}
export function DistanceBetweenTwoPoints(a, b) {
  const vec = vectorOfTwoPoints(a, b)
  return Math.sqrt(vec.x ** 2 + vec.y ** 2)
}
//will return a vector of magnitude 1 with rotation theta
//input should be between 0 and 2PI will return vector with rotation equal to input
export function rotateVector(theta) {
  const vec = { x: 1, y: 0 }
  const x = vec.x * Math.cos(theta) - vec.y * Math.sin(theta)
  const y = vec.x * Math.sin(theta) + vec.y * Math.cos(theta)
  return { x: x, y: y }
}
export function getVectorRotation(vec) {
  return Math.atan2(vec.y, vec.x) + Math.PI
}
export function genPos() {
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
    pos = genPos()
  }
  return pos
}
export function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
