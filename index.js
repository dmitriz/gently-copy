// index.js
'use strict'

var fs = require('fs')
var chalk = require('chalk')
var shells = require('shelljs')

module.exports = function (filesList, dest, opt) {
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
      shells.cp('-Rf', file, dest)
    } else {
      shells.cp('-Rn', file, dest)
    }

    console.log(chalk.green(' - Copied file or directory:'), chalk.red(file))
  })

  console.log(chalk.blue('= End copying files\n'))
}
