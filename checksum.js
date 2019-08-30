const { createHash } = require('crypto')

const SHA1 = 'sha1'
const DEFAULT_ALGORITHM = SHA1

const checksum = (s, algorithm = DEFAULT_ALGORITHM, format = 'hex') =>
  createHash(algorithm)
    .update(s)
    .digest(format)

const hashFromFileContent = s => s.trim().split(/\s+/)[0]

module.exports = { checksum, DEFAULT_ALGORITHM, SHA1, hashFromFileContent }
