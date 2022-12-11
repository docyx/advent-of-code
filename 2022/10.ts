import { readFile } from 'fs/promises'

const input = (await readFile('input.txt')).toString().trim()

const lines = input.split('\n')

// part 1

let regX = 1
const regXHistory: number[] = []

const cycle = (duration: number) => {
  for (let i = 0; i < duration; i++) {
    regXHistory.push(regX)
  }
}

for (const line of lines) {
  const [instruction, arg] = line.split(' ')

  if (instruction === 'noop') {
    cycle(1)
  } else if (instruction === 'addx') {
    cycle(2)
    regX += parseInt(arg)
  }
}

console.log(
  [20, 60, 100, 140, 180, 220].reduce((t, n) => t + n * regXHistory[n - 1], 0)
)

// part 2

let out = ''
let lineNo = 1

for (const [absI, x] of regXHistory.entries()) {
  const i = 40 - (lineNo * 40 - absI) + 1

  const middle = x + 1

  if (i === middle - 1 || i === middle || i === middle + 1) out += '#'
  else out += '.'

  if (i % 40 === 0) {
    out += '\n'
    lineNo += 1
  }
}

console.log(out)
