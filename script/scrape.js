#!/usr/bin/env node
// see https://github.com/tc39/proposal-hashbang on how the above is standardizing

// TODO figure out if we want a dep, dev dep or fork of
// "pdf-table-extractor": "1.0.3"
// TODO consider fixing up to at least get on the 2.x version of pdfjs-dist vs. 1.x
// or just do a fork and own it completely w/o the legacy from old JS / node etc.

import { URL } from 'url'
import fetch from 'node-fetch'
import fs from 'fs/promises'
import pdf_table_extractor from 'pdf-table-extractor'

const __dirname = new URL('.', import.meta.url).pathname
const PUBLIC_DATA = `${__dirname}../public/data/`
const DATA_TMP = `${__dirname}../data-tmp/`
const PREFIX = 'https://www.mwra.com/biobot/'
const webPage = await fetch(`${PREFIX}biobotdata.htm`).then((res) => res.text())
const nameMatch = webPage.match(/"([^"]*data\.pdf)"/)

try {
  await fs.mkdir(DATA_TMP)
} catch (e) {
  if (e.code !== 'EEXIST') throw e
}

let pdfName = ''
if (nameMatch) {
  pdfName = nameMatch[1]
} else {
  process.exit(1)
}
const pdf = await fetch(`${PREFIX}${pdfName}`).then((res) => res.arrayBuffer())
const pdfLocation = `${DATA_TMP}${pdfName}`
await fs.writeFile(pdfLocation, Buffer.from(pdf))

await new Promise((resolve, reject) => {
  const success = async (d) => {
    await fs.writeFile(
      `${PUBLIC_DATA}latest.csv`,
      d.pageTables
        .map((page) => page.tables)
        .flat()
        .map((row) =>
          row
            .map((col) => (col && col !== 'ND' ? col.replace(/\n/g, '') : ''))
            .join(',')
        )
        .join('\n')
    )
    await fs.writeFile(
      `${PUBLIC_DATA}latest.json`,
      JSON.stringify({
        from: `${PREFIX}${pdfName}`,
        submitted: pdfName
          .match(/(\d\d\d\d)(\d\d)(\d\d)/)
          .slice(1, 4)
          .join('-'),
      })
    )
    resolve()
  }

  const error = (e) => {
    console.error(e)
    reject(e)
  }

  pdf_table_extractor(pdfLocation, success, error)
})
