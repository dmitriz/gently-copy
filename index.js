// index.js
'use strict'

var chalk = require('chalk')
var cpy = require('cpy')
// var shells = require('shelljs')

module.exports = function (filesList, dest) {
  console.log(chalk.blue('\n= Begin copying files'))

	// if single file or directory, create an array
  if (!filesList.forEach) {
    filesList = [filesList]
  }

  filesList.forEach(function (file) {
    console.log(chalk.green(' - Copying file or directory:'), chalk.red(file))

		// https://github.com/shelljs/shelljs#javascript
    // shells.cp('-R', file, dest)
    cpy(file, dest, {overwrite: false})
  })

  console.log(chalk.blue('= End copying files\n'))
}
