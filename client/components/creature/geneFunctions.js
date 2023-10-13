//this works, returns the input array except normalized.
//meaning it will only take the top end of the distrubution
export function normalizeArray(arr) {
  const max = Math.max(
    ...arr.map((i) => {
      return i.fitness
    })
  )
  const min = Math.min(
    ...arr.map((i) => {
      return i.fitness
    })
  )
  const range = max - min + 0.001

  const normalized = arr.map((num) => {
    return (num.fitness - min) / range
  })
  let newArr = []
  let count = 0
  while (arr.length > newArr.length) {
    count++
    const ran = Math.floor(Math.random() * arr.length)
    if (Math.random() < normalized[ran]) {
      newArr.push(arr[ran])
    }
    if (count > 1000) {
      newArr.push(arr[ran])
    }
  }
  return newArr
}
export function mutateGene(gene) {
  function mutate(gene) {
    return gene + (Math.random() * gene * 0.1 - Math.random() * gene * 0.1)
  }
  let test = { ...gene.gene }
  for (const key in test) {
    test[key] = mutate(test[key])
  }
  return test
}
