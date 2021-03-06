const { strictEqual: equal } = require('assert')
const path = require('path')
const defaults = require('./defaults')

const {
  getChecksum,
  getChecksumFilePath,
  hashFromFileContent,
} = require('./checksum')

module.exports = () => {
  // NOTE: Using `echo -n <string> | sha1sum` to generate expected result
  equal(defaults.algorithm, 'sha1')
  equal(getChecksum('foo'), getChecksum('foo', defaults.algorithm))

  equal(
    getChecksum('', defaults.algorithm),
    'da39a3ee5e6b4b0d3255bfef95601890afd80709',
  )

  equal(
    getChecksum('42', defaults.algorithm),
    '92cfceb39d57d914ed8b14d0e37643de0797ae56',
  )

  equal(
    getChecksum('abc', defaults.algorithm),
    'a9993e364706816aba3e25717850c26c9cd0d89d',
  )

  equal(hashFromFileContent('1234 x.txt'), '1234')
  equal(hashFromFileContent('   1234   x.txt    '), '1234')

  equal(
    getChecksumFilePath(path.join('.', 'test.txt')),
    `.test.txt${defaults.fileExtension}`,
  )

  equal(
    getChecksumFilePath(path.join('..', 'test.txt')),
    path.join('..', `.test.txt${defaults.fileExtension}`),
  )

  // TODO:
  // assert(checksumFilePath('.test.txt') === '.test.txt.sha')
}
