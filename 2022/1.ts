import { readFile } from 'fs/promises'

const input = (await readFile('input.txt')).toString()

const groups = input.split('\n\n')

// part 1

let most = 0

for (const group of groups) {
  const total = group.split('\n').reduce((t, s) => t + parseInt(s), 0)

  if (total > most) most = total
}

console.log(most)

// part 2

const topThree = groups
  .map((g) => g.split('\n').reduce((t, s) => t + parseInt(s), 0))
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((t, s) => t + s, 0)

console.log(topThree)
