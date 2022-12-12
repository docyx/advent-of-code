import { readFile } from 'fs/promises'

const input = (await readFile('input.txt')).toString().trim()

enum Operator {
  ADD = '+',
  MULTIPLY = '*',
}

interface Operation {
  operator: Operator
  value: number | 'old'
}

interface Monkey {
  startingItems: number[]
  operation: Operation
  test: {
    divBy: number
    true: number
    false: number
  }
}

const parseMonkey = (rawMonkey: string) => {
  const parsedMonkey: Partial<Monkey> = {}
  const lines = rawMonkey.split('\n')

  const STARTING_ITEMS_REGEX = /Starting\sitems:\s([\w\s,]+)/
  const startingItemsMatch = STARTING_ITEMS_REGEX.exec(lines[1])

  parsedMonkey.startingItems = startingItemsMatch![1]
    .split(', ')
    .map((s) => parseInt(s))

  const OPERATION_REGEX = /\w+\s=\s\w+\s([+*])\s(\w+)/
  const [, operator, value] = OPERATION_REGEX.exec(lines[2])!

  parsedMonkey.operation = {
    operator: operator as Operator,
    value: value === 'old' ? value : parseInt(value),
  }

  const DIV_BY_REGEX = /divisible\sby\s([0-9]+)/
  const THROW_REGEX = /throw\sto\smonkey\s([0-9]+)/

  parsedMonkey.test = {
    divBy: parseInt(DIV_BY_REGEX.exec(lines[3])![1]),
    true: parseInt(THROW_REGEX.exec(lines[4])![1]),
    false: parseInt(THROW_REGEX.exec(lines[5])![1]),
  }

  return parsedMonkey as Monkey
}

const monkeys: Monkey[] = input.split('\n\n').map((m) => parseMonkey(m))
const numInspections: number[] = Array(monkeys.length).fill(0)

for (let r = 0; r < 20; r++) {
  for (const [monkeyNumber, monkey] of monkeys.entries()) {
    numInspections[monkeyNumber] += monkey.startingItems.length

    for (let i = 0; i < monkey.startingItems.length; i++) {
      const item = monkey.startingItems[i]

      let worryLevel = item

      const value =
        monkey.operation.value === 'old' ? item : monkey.operation.value

      if (monkey.operation.operator === Operator.ADD) worryLevel = item + value
      else if (monkey.operation.operator === Operator.MULTIPLY)
        worryLevel = item * value

      worryLevel /= 3
      worryLevel = Math.floor(worryLevel)

      if (worryLevel % monkey.test.divBy === 0) {
        monkeys[monkey.test.true].startingItems.push(worryLevel)
      } else {
        monkeys[monkey.test.false].startingItems.push(worryLevel)
      }

      monkey.startingItems.shift()
      i--
    }
  }
}

console.log(
  numInspections
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((t, c) => t * c, 1)
)

// part 2

const monkeys2: Monkey[] = input.split('\n\n').map((m) => parseMonkey(m))
const numInspections2: number[] = Array(monkeys2.length).fill(0)

const productMod = monkeys2.reduce((t, m) => m.test.divBy * t, 1)

for (let r = 0; r < 10_000; r++) {
  for (const [monkeyNumber, monkey] of monkeys2.entries()) {
    numInspections2[monkeyNumber] += monkey.startingItems.length

    for (let i = 0; i < monkey.startingItems.length; i++) {
      const item = monkey.startingItems[i]

      let worryLevel = item

      const value =
        monkey.operation.value === 'old' ? item : monkey.operation.value

      if (monkey.operation.operator === Operator.ADD) worryLevel = item + value
      else if (monkey.operation.operator === Operator.MULTIPLY)
        worryLevel = item * value

      // math is cool
      // https://en.wikipedia.org/wiki/Modular_arithmetic
      worryLevel %= productMod

      if (worryLevel % monkey.test.divBy === 0) {
        monkeys2[monkey.test.true].startingItems.push(worryLevel)
      } else {
        monkeys2[monkey.test.false].startingItems.push(worryLevel)
      }

      monkey.startingItems.shift()
      i--
    }
  }
}

console.log(
  numInspections2
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((t, c) => t * c, 1)
)
