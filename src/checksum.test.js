const { strictEqual: equal } = require('assert')
const path = require('path')

const {
  DEFAULT_ALGORITHM,
  SHA1,
  getChecksum,
  getChecksumFilePath,
  hashFromFileContent,
} = require('./checksum')

module.exports = () => {
  // NOTE: Using `echo -n <string> | sha1sum` to generate expected result
  equal(getChecksum('', SHA1), 'da39a3ee5e6b4b0d3255bfef95601890afd80709')
  equal(getChecksum('42', SHA1), '92cfceb39d57d914ed8b14d0e37643de0797ae56')

  equal(getChecksum('abc', SHA1), 'a9993e364706816aba3e25717850c26c9cd0d89d')

  equal(DEFAULT_ALGORITHM, SHA1)
  equal(getChecksum('foo'), getChecksum('foo', SHA1))

  equal(hashFromFileContent('1234 x.txt'), '1234')
  equal(hashFromFileContent('   1234   x.txt    '), '1234')

  equal(getChecksumFilePath(path.join('.', 'test.txt')), '.test.txt.sha')

  equal(
    getChecksumFilePath(path.join('..', 'test.txt')),
    path.join('..', '.test.txt.sha'),
  )

  // TODO:
  // assert(checksumFilePath('.test.txt') === '.test.txt.sha')
}
