const assert = require('assert')

const {
  SHA1,
  checksum,
  checksumFilePath,
  hashFromFileContent,
} = require('./checksum')

// NOTE: Using `echo -n <string> | sha1sum` to generate expected result
assert(checksum('', SHA1) === 'da39a3ee5e6b4b0d3255bfef95601890afd80709')
assert(checksum('42', SHA1) === '92cfceb39d57d914ed8b14d0e37643de0797ae56')
assert(checksum('abc', SHA1) === 'a9993e364706816aba3e25717850c26c9cd0d89d')

assert(hashFromFileContent('1234 x.txt') === '1234')
assert(hashFromFileContent('   1234   x.txt    ') === '1234')

assert(checksumFilePath('./test.txt') === '.test.txt.sha')
assert(checksumFilePath('../test.txt') === '../.test.txt.sha')

// TODO:
// assert(checksumFilePath('.test.txt') === '.test.txt.sha')
