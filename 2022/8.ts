import { readFile } from 'fs/promises'

const input = (await readFile('input.txt')).toString().trim()

const lines = input.split('\n')

let total = 0

for (const [lineIndex, line] of lines.entries()) {
  if (lineIndex === 0 || lineIndex === lines.length - 1) {
    total += line.length
    continue
  }

  const chars = line.split('')

  for (const [charIndex, char] of chars.entries()) {
    if (charIndex === 0 || charIndex === chars.length - 1) {
      total += 1
      continue
    }

    const height = parseInt(char)

    let visibleFromTop = true
    let visibleFromBottom = true

    for (const [allLineIndex, allLine] of lines.entries()) {
      if (allLineIndex === lineIndex) continue

      const allHeight = parseInt(allLine[charIndex])

      if (allHeight >= height) {
        if (allLineIndex < lineIndex) visibleFromTop = false
        else visibleFromBottom = false
      }
    }

    if (visibleFromTop || visibleFromBottom) {
      total += 1
      continue
    }

    let visibleFromLeft = true
    let visibleFromRight = true

    for (const [allCharIndex, allChar] of chars.entries()) {
      if (allCharIndex === charIndex) continue

      const allHeight = parseInt(allChar)

      if (allHeight >= height) {
        if (allCharIndex < charIndex) visibleFromLeft = false
        else visibleFromRight = false
      }
    }

    if (visibleFromLeft || visibleFromRight) {
      total += 1
      continue
    }
  }
}

console.log(total)

// part 2

let highScore = 0

for (const [lineIndex, line] of lines.entries()) {
  if (lineIndex === 0 || lineIndex === lines.length - 1) {
    continue
  }

  const chars = line.split('')

  for (const [charIndex, char] of chars.entries()) {
    if (charIndex === 0 || charIndex === chars.length - 1) {
      continue
    }

    const height = parseInt(char)

    let topViewDist = lineIndex
    let bottomViewDist = lines.length - lineIndex - 1
    let leftViewDist = charIndex
    let rightViewDist = chars.length - charIndex - 1

    // top
    for (let i = lineIndex - 1; i >= 0; i--) {
      const allChar = parseInt(lines[i][charIndex])

      if (allChar >= height) {
        topViewDist = lineIndex - i
        break
      }
    }

    // bottom
    for (let i = lineIndex + 1; i < lines.length; i++) {
      const allChar = parseInt(lines[i][charIndex])

      if (allChar >= height) {
        bottomViewDist = i - lineIndex
        break
      }
    }

    // left
    for (let i = charIndex - 1; i >= 0; i--) {
      const allChar = parseInt(lines[lineIndex][i])

      if (allChar >= height) {
        leftViewDist = charIndex - i
        break
      }
    }

    // right
    for (let i = charIndex + 1; i < chars.length; i++) {
      const allChar = parseInt(lines[lineIndex][i])

      if (allChar >= height) {
        rightViewDist = i - charIndex
        break
      }
    }

    const score = topViewDist * bottomViewDist * leftViewDist * rightViewDist

    if (score > highScore) highScore = score
  }
}

console.log(highScore)
