// index.js
'use strict'
const fs = require('fs-extra')
const path = require('path');
const chalk = require('chalk')

gentlyCopy.read = function (file) {
	return fs.readFileSync(file, 'utf8')
}

module.exports = gentlyCopy

async function gentlyCopy(filesList, dest, opt) {

	if (typeof opt !== 'object') {
		opt = { overwrite: false }
	}
	console.log(chalk.blue('\n= Begin copying files'))

	// if single file or directory, create an array
	if (!filesList.forEach) {
		filesList = [filesList]
	}

	for (const file in filesList) {
		let destinationAddress = dest
		let destination = await fs.exists(destinationAddress)
		let destinationIsFile = destination ? fs.lstatSync(destinationAddress).isFile() : false
		let sourceIsFile = fs.lstatSync(filesList[file]).isFile()

		// calculate destination...
		if (sourceIsFile && !destinationIsFile) {
			destinationAddress = destinationAddress + path.sep + filesList[file]
		}

		if (opt.overwrite && opt.overwrite === true) {
			console.log(chalk.green(' - Overwriting file or directory:'), chalk.red(filesList[file]))
		}
		console.log(chalk.green(' - Copying file or directory:'), chalk.red(filesList[file]))
		fs.copySync(filesList[file], destinationAddress, opt)
	}
	console.log(chalk.blue('= End copying files\n'))
}
