/**
 * Checks that every prerendered page is rendered in its own locale. Pages that
 * are prerendered in parallel share the global i18n instance and may swap
 * locales; fails with exit code 1 when a page lacks its locale's footer link.
 *
 * Usage: yarn build && yarn check:prerender
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const pagesDir = 'build/server/pages'
const disclaimerByLocale = {
  cz: 'Vyloučení odpovědnosti',
  en: 'Disclaimer',
  ru: 'Дисклеймер',
}
// These pages load no catalog yet, see TODO.md
const pagesWithoutCatalog = ['500.html', '_offline.html']
const errors = []

for (const [locale, disclaimer] of Object.entries(disclaimerByLocale)) {
  const files = readdirSync(join(pagesDir, locale)).filter(
    (file) => file.endsWith('.html') && !pagesWithoutCatalog.includes(file),
  )

  for (const file of files) {
    const html = readFileSync(join(pagesDir, locale, file), 'utf8')
    if (!html.includes(`>${disclaimer}<`)) {
      errors.push(`${locale}/${file}: not rendered in ${locale}`)
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log('Prerender checks passed.')
