import { readFile } from 'fs/promises'

const input = (await readFile('input.txt')).toString()

const SYMBOL_MAP = {
  X: 'A',
  Y: 'B',
  Z: 'C',
}

const BEAT_MAP = {
  A: 'C',
  B: 'A',
  C: 'B',
}

const SCORE_MAP = {
  A: 1,
  B: 2,
  C: 3,
}

enum Result {
  WIN = 6,
  DRAW = 3,
  LOSS = 0,
}

// part 1

const getOutcome = (op: string, me: string) => {
  let result: Result

  if (op === SYMBOL_MAP[me]) result = Result.DRAW
  else if (BEAT_MAP[op] === SYMBOL_MAP[me]) result = Result.LOSS
  else result = Result.WIN

  return result + SCORE_MAP[SYMBOL_MAP[me]]
}

const total = input
  .trim()
  .split('\n')
  .map((g) => getOutcome(g[0], g[2]))
  .reduce((t, r) => t + r, 0)

console.log(total)

// part 2

const RESULT_MAP = {
  X: Result.LOSS,
  Y: Result.DRAW,
  Z: Result.WIN,
}

const SYMBOL_MAP2 = {
  A: 'X',
  B: 'Y',
  C: 'Z',
}

const WIN_MAP = {
  A: 'B',
  B: 'C',
  C: 'A',
}

const getOutcome2 = (op: string, me: string) => {
  if (RESULT_MAP[me] === Result.DRAW) return getOutcome(op, SYMBOL_MAP2[op])
  else if (RESULT_MAP[me] === Result.LOSS)
    return getOutcome(op, SYMBOL_MAP2[BEAT_MAP[op]])
  else return getOutcome(op, SYMBOL_MAP2[WIN_MAP[op]])
}

const total2 = input
  .trim()
  .split('\n')
  .map((g) => getOutcome2(g[0], g[2]))
  .reduce((t, r) => t + r, 0)

console.log(total2)
