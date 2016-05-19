// index.js
'use strict'

var fs = require('fs')
var chalk = require('chalk')
var shells = require('shelljs')

gentlyCopy.read = function (file) {
  return fs.readFileSync(file, 'utf8')
}

module.exports = gentlyCopy

function gentlyCopy (filesList, dest, opt) {
  if (typeof opt !== 'object') {
    opt = {}
  }

  console.log(chalk.blue('\n= Begin copying files'))

  // if single file or directory, create an array
  if (!filesList.forEach) {
    filesList = [filesList]
  }

  filesList.forEach(function (file) {
    // https://github.com/shelljs/shelljs#cpoptions-source_array-dest
    if (opt.overwrite) {
      console.log(chalk.green(' - Overwriting file or directory:'), chalk.red(file))
      shells.cp('-Rf', file, dest)
    } else {
      console.log(chalk.green(' - Copying file or directory:'), chalk.red(file))
      shells.cp('-Rn', file, dest)
    }
  })

  console.log(chalk.blue('= End copying files\n'))
}
