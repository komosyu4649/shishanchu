export function usePaginationGenerater(pageNumber: number, allPageNumber: number, width = 2) {
  const left = pageNumber - width
  const right = pageNumber + width + 1
  const ranges = []
  const rangeWithDots: any = []
  let length: number
  for (let i = 1; i <= allPageNumber; i += 1) {
    if (i === 1 || i === allPageNumber || (i >= left && i <= right)) {
      ranges.push(i)
    } else if (i < left) {
      i = left - 1
    } else if (i > right) {
      ranges.push(allPageNumber)
      break
    }
  }
  ranges.forEach((range) => {
    if (length) {
      if (range - length === 2) {
        rangeWithDots.push(length + 1)
      } else if (range - length !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(range)
    length = range
  })
  return rangeWithDots
}
