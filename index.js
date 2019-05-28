// index.js
'use strict'
const fs = require('fs-extra')
const path = require('path');
const chalk = require('chalk')

gentlyCopy.read = function (file) {
	return fs.readFileSync(file, 'utf8')
}

module.exports = gentlyCopy

function gentlyCopy(filesList, dest, opt) {

	if (typeof opt !== 'object') {
		opt = { overwrite: false }
	}
	console.log(chalk.blue('\n= Begin copying files'))

	// if single file or directory, create an array
	if (!filesList.forEach) {
		filesList = [filesList]
	}

	filesList.forEach(function (file) {
		let destinationAddress = dest
		let calculatedDestinationAddress = destinationAddress
		let destination = fs.existsSync(destinationAddress)
		let destinationIsFile = destination ? fs.lstatSync(destinationAddress).isFile() : false
		let sourceIsFile = fs.lstatSync(file).isFile()

		// calculate destination...
		if (sourceIsFile && !destinationIsFile) {
			calculatedDestinationAddress = destinationAddress + path.sep + file
		}

		if (opt.overwrite && opt.overwrite === true) {
			console.log(chalk.green(' - Overwriting file or directory:'), chalk.red(file))
		}
		console.log(chalk.green(' - Copying file or directory:'), chalk.red(file))
		fs.copySync(file, calculatedDestinationAddress, opt)
	  })

	console.log(chalk.blue('= End copying files\n'))
}
