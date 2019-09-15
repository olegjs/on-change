const { basename, dirname, join, format } = require('path')
const { createHash } = require('crypto')

const SHA1 = 'sha1'
const DEFAULT_ALGORITHM = SHA1

const checksum = (s, algorithm = DEFAULT_ALGORITHM, format = 'hex') =>
  createHash(algorithm)
    .update(s)
    .digest(format)

const hashFromFileContent = s => s.trim().split(/\s+/)[0]

const checksumFilePath = path =>
  join(
    dirname(path),
    format({
      name: `.${basename(path)}`,
      ext: '.sha',
    }),
  )

module.exports = {
  DEFAULT_ALGORITHM,
  SHA1,
  checksum,
  checksumFilePath,
  hashFromFileContent,
}
