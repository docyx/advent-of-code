import { readFile } from 'fs/promises'

const input = (await readFile('input.txt')).toString().trim()

// part 1

const uniqueChars: string[] = []

for (const [index, char] of input.split('').entries()) {
  if (!uniqueChars.includes(char)) {
    uniqueChars.push(char)

    if (uniqueChars.length === 4) {
      console.log(index + 1)

      break
    }
  } else {
    uniqueChars.splice(0, uniqueChars.length)
  }
}

// part 2

const uniqueChars2: string[] = []

for (const [index, char] of input.split('').entries()) {
  if (!uniqueChars2.includes(char)) {
    uniqueChars2.push(char)

    if (uniqueChars2.length === 13) {
      console.log(index + 1)
      break
    }
  } else {
    uniqueChars2.push(char)
    uniqueChars2.splice(0, uniqueChars2.length - 1)
  }
}
