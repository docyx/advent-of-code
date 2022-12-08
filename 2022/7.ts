import { readFile } from 'fs/promises'

const input = (await readFile('input.txt')).toString().trim()

const dirSizes: Record<string, number> = {}
const workingDirectory: string[] = []

for (const line of input.split('\n')) {
  if (line.startsWith('$')) {
    const [, command, ...args] = line.split(' ')

    if (command === 'cd') {
      const path = args[0]

      if (path === '..') {
        workingDirectory.splice(-1)
        continue
      }

      workingDirectory.push(path)
    }

    continue
  }

  const [first, name] = line.split(' ')

  if (line.startsWith('dir')) {
    const key =
      workingDirectory.length === 1
        ? name
        : `${workingDirectory.slice(1).join('/')}/${name}`

    if (typeof dirSizes[key] === 'undefined') dirSizes[key] = 0

    continue
  }

  for (let i = workingDirectory.length; i >= 0; i--) {
    const key = workingDirectory.slice(1, i).join('/')

    dirSizes[key] += parseInt(first)
  }
}

console.log(
  Object.values(dirSizes).reduce(
    (total, cur) => (cur <= 100_000 ? total + cur : total),
    0
  )
)

// part 2

const usedSpace = Object.entries(dirSizes).reduce(
  (total, [path, size]) =>
    path === '' || path.includes('/') ? total : total + size,
  0
)

const needFree = 30_000_000 - (70_000_000 - usedSpace)

console.log(Math.min(...Object.values(dirSizes).filter((s) => s >= needFree)))
