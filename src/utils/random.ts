export function createUniqueRandomGenerator(max: number) {
  let availableNumbers: number[] = []

  function reset() {
    availableNumbers = Array.from({ length: max + 1 }, (_, i) => i)
  }

  reset()

  return function getRandom() {
    if (availableNumbers.length === 0) reset()
    const index = Math.floor(Math.random() * availableNumbers.length)
    const num = availableNumbers[index]
    availableNumbers.splice(index, 1)
    return num
  }
}

export function getRandom(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min
}
