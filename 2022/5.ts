import { readFile } from 'fs/promises'

const input = (await readFile('input.txt')).toString()
const lines = input.trim().split('\n')

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

let stackLineStart: number = -1

for (const [index, line] of lines.entries()) {
  if (line.startsWith(' 1')) {
    stackLineStart = index - 1
  }
}

const stacks: string[][] = []

for (let i = stackLineStart; i >= 0; i--) {
  const line = lines[i]

  let currentIndex = -1
  let numSpaces = 0

  for (const char of line) {
    if (numSpaces === 3) {
      numSpaces = 0
      currentIndex += 1
      continue
    }

    if (char === ' ') numSpaces += 1

    if (LETTERS.includes(char)) {
      numSpaces = 0
      currentIndex += 1

      if (Array.isArray(stacks[currentIndex])) stacks[currentIndex].push(char)
      else stacks[currentIndex] = [char]
    }
  }
}

// now that we have the stacks, let's move
// fmt: move x from y to z

const instructions = lines.slice(stackLineStart + 3)

for (const instruction of instructions) {
  const MOVE_REGEX = /move (\d+) from (\d+) to (\d+)/g

  const [, amount, fromIndex, toIndex] = MOVE_REGEX.exec(instruction)!.map(
    (s) => parseInt(s)
  )

  const slice = stacks[fromIndex - 1].splice(-amount)

  // part 1: slice.reverse(), part 2: just slice :)
  stacks[toIndex - 1] = [...stacks[toIndex - 1], ...slice.reverse()]
}

console.log(stacks.reduce((s, cur) => s + cur[cur.length - 1], ''))
