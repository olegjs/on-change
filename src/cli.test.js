const { execSync } = require('child_process')
const { ok, ifError, strictEqual: equal } = require('assert')
const path = require('path')
const { existsSync, unlinkSync } = require('fs')
const { getChecksumFilePath } = require('./checksum')
const package = require('../package.json')
const { magenta, yellow } = require('chalk')
const { encoding } = require('./defaults')

const run = cmd => execSync(cmd, { encoding })

module.exports = () => {
  const scriptPath = path.join(__dirname, 'cli.js')
  const command = `node ${scriptPath}`

  const options = [
    '--file',
    '-f',
    '--color',
    '--no-color',
    '--version',
    '--help',
  ]

  try {
    const helpText = run(`${command} --help`)

    options.forEach(option =>
      ok(helpText.includes(option), `Expect "${option}" in help`),
    )

    const versionText = run(`${command} --version`)
    equal(versionText.trim(), package.version)

    const checksumFilePath = getChecksumFilePath(scriptPath)
    const payload = 'echo'

    if (existsSync(checksumFilePath)) unlinkSync(checksumFilePath)

    const firstRunText = run(`${command} --file ${scriptPath} ${payload}`)
    ok(firstRunText.includes(payload))
    ok(firstRunText.includes(scriptPath))

    const secondRunText = run(`${command} -f ${scriptPath} ${payload}`)
    equal(secondRunText, '')

    unlinkSync(checksumFilePath)

    const colorText = run(`${command} --color --file ${scriptPath} ${payload}`)
    ok(colorText.includes(magenta(scriptPath)))
    ok(colorText.includes(yellow(payload)))

    unlinkSync(checksumFilePath)
  } catch (error) {
    ifError(error)
  }
}
