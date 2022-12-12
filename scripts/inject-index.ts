import { rmSync } from 'fs'
import { readdir, readFile, writeFile } from 'fs/promises'
import { createInterface } from 'readline/promises'

const thisDir = await readdir('.', { withFileTypes: true })

const yearDirs = thisDir
  .filter((x) => x.isDirectory() && /[0-9]{4}/.test(x.name))
  .sort((a, b) => parseInt(b.name) - parseInt(a.name))

let injected = ''

for (const [i, year] of yearDirs.entries()) {
  injected += `- ${year.name}\n`

  const days = (await readdir(year.name))
    .map((d) => parseInt(d.replace('.ts', '')))
    .sort((a, b) => a - b)

  for (const day of days) {
    injected += `  - [Day ${day}](./${year.name}/${day}.ts)\n`
  }

  if (i < yearDirs.length - 1) injected += '\n'
}

const OPEN_INJECT = '<!-- __INJECT_INDEX__ -->'
const CLOSE_INJECT = '<!-- /__INJECT_INDEX__ -->'

const dirtyReadme = (await readFile('README.md')).toString()

const start = dirtyReadme.indexOf(OPEN_INJECT)
const end = dirtyReadme.indexOf(CLOSE_INJECT)

let newReadme = dirtyReadme.slice(0, start)

newReadme += `${OPEN_INJECT}\n${injected}${CLOSE_INJECT}`
newReadme += dirtyReadme.slice(end + CLOSE_INJECT.length)

await writeFile('README.staging.md', newReadme)

const cleanUp = () => rmSync('README.staging.md')

process.on('exit', () => cleanUp())

const rl = createInterface({ input: process.stdin, output: process.stdout })

const acceptStage = await rl.question(
  'View ./README.staging.md, enter [y] to accept: '
)

if (acceptStage === '' || acceptStage.toLowerCase() === 'y') {
  await writeFile('README.md', newReadme)
}

rl.close()
