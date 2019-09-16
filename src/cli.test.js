const { exec } = require('child_process')
const assert = require('assert')
const { join } = require('path')
const { unlink } = require('fs')
const { getChecksumFilePath } = require('./checksum')
const { version } = require('../package.json')

module.exports = () => {
  const scriptPath = join(__dirname, 'cli.js')
  const command = `node ${scriptPath}`

  exec(`${command} --help`, (error, stdout) => {
    assert(!error)
    assert(stdout.includes('--file'))
    assert(stdout.includes('-f'))
    assert(stdout.includes('--version'))
    assert(stdout.includes('--help'))
  })

  exec(`${command} --version`, (error, stdout) => {
    assert(!error)
    assert(stdout.trim() === version)
  })

  const checksumFilePath = getChecksumFilePath(scriptPath)
  const payload = 'echo'

  unlink(checksumFilePath, () => {
    exec(`${command} --file ${scriptPath} ${payload}`, (error, stdout) => {
      assert(!error)
      assert(stdout.includes(payload))
      assert(stdout.includes(scriptPath))

      exec(`${command} -f ${scriptPath} ${payload}`, (error, stdout) => {
        assert(!error)
        assert(stdout === '')
        unlink(checksumFilePath, error => assert(!error))
      })
    })
  })
}
