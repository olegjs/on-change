const { readdirSync } = require('fs')
const path = require('path')
const srcPath = path.join(__dirname, 'src/')

// NOTE: not trying to catch; sufficient error handling as is
readdirSync(srcPath).forEach(
  file => file.endsWith('.test.js') && require(path.join(srcPath, file))(),
)
