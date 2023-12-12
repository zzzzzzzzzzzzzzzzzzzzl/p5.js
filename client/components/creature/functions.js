import Environment from "./Environment"


export function vectorOfTwoPoints(a, b) {
  const x = a.x - b.x
  const y = a.y - b.y
  return { x: x, y: y }
}
export function DistanceBetweenTwoPoints(a, b) {
  const vec = vectorOfTwoPoints(a, b)
  return Math.sqrt(vec.x ** 2 + vec.y ** 2)
}
//will return a vector of magnitude 1 with rotation theta
//input should be between 0 and 2PI will return vector with rotation equal to input
export function rotateVector(theta){
  const vec={x:1,y:0}
  const x=vec.x*Math.cos(theta)-vec.y*Math.sin(theta)
  const y=vec.x*Math.sin(theta)+vec.y*Math.cos(theta)
  return {x:x,y:y}
}
export function getVectorRotation(vec){
  return Math.atan2(vec.y,vec.x)+Math.PI
}
