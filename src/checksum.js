const path = require('path')
const { basename, dirname } = path
const { createHash } = require('crypto')
const { algorithm: defaultAlgorithm, fileExtension } = require('./defaults')

const getChecksum = (s, algorithm = defaultAlgorithm, format = 'hex') =>
  createHash(algorithm)
    .update(s)
    .digest(format)

const hashFromFileContent = s => s.trim().split(/\s+/)[0]

const getChecksumFilePath = filePath =>
  path.join(
    dirname(filePath),
    path.format({ name: `.${basename(filePath)}`, ext: fileExtension }),
  )

module.exports = { getChecksum, getChecksumFilePath, hashFromFileContent }
