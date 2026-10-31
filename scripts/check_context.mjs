/**
 * Validates the Markdown context docs: AGENTS.md, CLAUDE.md, README.md, TODO.md
 * and everything under docs/. Fails with exit code 1 when an inline link points
 * to a missing file, or when CLAUDE.md is anything but the @AGENTS.md import.
 *
 * Usage: yarn check:context (also part of yarn weok)
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

// Run from the repository root. Deliberately checks only inline Markdown links;
// external URLs and owner-local rulebook paths are not repository dependencies.
const root = process.cwd()
const errors = []
const docs = ['AGENTS.md', 'CLAUDE.md', 'README.md', 'TODO.md']
const walk = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      walk(path)
    } else if (entry.name.endsWith('.md')) {
      docs.push(path)
    }
  }
}
walk('docs')

for (const file of docs) {
  const content = readFileSync(file, 'utf8').replace(/```[^]*?```/g, '')
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].trim().replace(/^<|>$/g, '')
    if (/^(?:[a-z][a-z\d+.-]*:|#)/i.test(target)) {
      continue
    }
    const path = target.split('#')[0]
    if (!path) {
      continue
    }
    if (!existsSync(resolve(root, dirname(file), decodeURIComponent(path)))) {
      errors.push(`${file}: missing link target ${target}`)
    }
  }
}

if (readFileSync('CLAUDE.md', 'utf8').trim() !== '@AGENTS.md') {
  errors.push(
    'CLAUDE.md must only import @AGENTS.md; edit shared rules in AGENTS.md',
  )
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Context checks passed (${docs.length} Markdown files).`)
}
