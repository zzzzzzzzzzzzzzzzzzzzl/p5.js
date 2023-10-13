export function vectorOfTwoPoints(a, b) {
  const x = a.x - b.x
  const y = a.y - b.y
  return { x: x, y: y }
}
export function DistanceBetweenTwoPoints(a, b) {
  const vec = vectorOfTwoPoints(a, b)
  return Math.sqrt(vec.x ** 2 + vec.y ** 2)
}
