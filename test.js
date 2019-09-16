const { readdir } = require('fs')
const { join } = require('path')

const srcPath = join(__dirname, 'src/')

readdir(srcPath, (error, files) => {
  if (!error) {
    files
      .filter(file => file.endsWith('.test.js'))
      .forEach(file => require(join(srcPath, file))())
  }
})
