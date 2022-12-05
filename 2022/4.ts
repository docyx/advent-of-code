import { readFile } from 'fs/promises'

const input = (await readFile('input.txt')).toString()

let total = 0

const overlaps = (
  start1: number,
  end1: number,
  start2: number,
  end2: number
) => {
  // any overlap
  if (
    (start2 >= start1 && start2 <= end1) ||
    (start1 >= start2 && start1 <= end2)
  )
    return true

  // complete overlap
  if (
    (start2 >= start1 && start2 <= end1 && end2 <= end1) ||
    (start1 >= start2 && start1 <= end2 && end1 <= end2)
  )
    return true

  return false
}

for (const pair of input.trim().split('\n')) {
  const [one, two] = pair.split(',')

  const [start1, end1] = one.split('-').map((s) => parseInt(s))
  const [start2, end2] = two.split('-').map((s) => parseInt(s))

  if (overlaps(start1, end1, start2, end2)) total += 1
}

console.log(total)
