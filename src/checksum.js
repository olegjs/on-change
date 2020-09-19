const path = require('path')
const { basename, dirname } = path
const { createHash } = require('crypto')
const defaults = require('./defaults')

exports.getChecksum = (s, algorithm = defaults.algorithm, format = 'hex') =>
  createHash(algorithm).update(s).digest(format)

exports.hashFromFileContent = (s) => s.trim().split(/\s+/)[0]

exports.getChecksumFilePath = (filePath) =>
  path.join(
    dirname(filePath),
    path.format({
      name: `.${basename(filePath)}`,
      ext: defaults.fileExtension,
    }),
  )
