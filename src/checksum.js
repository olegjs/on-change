const {
  basename,
  dirname,
  format: formatPath,
  join: joinPath,
} = require('path')

const { createHash } = require('crypto')
const { algorithm: default_algorithm, fileExtension } = require('./defaults')

const getChecksum = (s, algorithm = default_algorithm, format = 'hex') =>
  createHash(algorithm)
    .update(s)
    .digest(format)

const hashFromFileContent = s => s.trim().split(/\s+/)[0]

const getChecksumFilePath = path =>
  joinPath(
    dirname(path),
    formatPath({ name: `.${basename(path)}`, ext: fileExtension }),
  )

module.exports = { getChecksum, getChecksumFilePath, hashFromFileContent }
