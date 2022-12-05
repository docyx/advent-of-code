import { readFile } from 'fs/promises'

const input = (await readFile('input.txt')).toString()

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

const splitAt = (index: number, text: string) => [
  text.slice(0, index),
  text.slice(index),
]

const getPriority = (char: string) => {
  if (char === char.toLowerCase()) return LETTERS.indexOf(char) + 1

  return LETTERS.indexOf(char.toLowerCase()) + 27
}

const GROUP_SIZE = 3
let totalPriority = 0

const sacks = input.split('\n')

for (let i = 0; i < sacks.length; i += GROUP_SIZE) {
  const group = sacks.slice(i, i + GROUP_SIZE)

  const letters: string[] = []

  for (const aChar of group[0]) {
    for (const bChar of group[1]) {
      for (const cChar of group[2]) {
        if (
          aChar === bChar &&
          aChar === cChar &&
          bChar === cChar &&
          !letters.includes(aChar)
        ) {
          totalPriority += getPriority(aChar)
          letters.push(aChar)
        }
      }
    }
  }
}

console.log(totalPriority)

// part 1

// for (const sack of input.split('\n')) {
//   const middleIndex = sack.length / 2
//   const [first, second] = splitAt(middleIndex, sack)

//   const sharedLetters: string[] = []

//   for (const firstChar of first) {
//     for (const secondChar of second) {
//       if (firstChar === secondChar && !sharedLetters.includes(firstChar)) {
//         totalPriority += getPriority(firstChar)
//         sharedLetters.push(firstChar)
//       }
//     }
//   }
// }

// console.log(totalPriority)
