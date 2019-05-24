# gently-copy 
Safely, colorfully and informatively copy files without overwriting

[![npm version](https://img.shields.io/npm/v/gently-copy.svg)](http://npm.im/gently-copy)
[![Build Status](https://travis-ci.org/dmitriz/gently-copy.svg?branch=master)](https://travis-ci.org/dmitriz/gently-copy) 
[![Dependency Status](https://david-dm.org/dmitriz/gently-copy.svg)](https://david-dm.org/dmitriz/gently-copy) 

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) 
[![MIT License](https://img.shields.io/npm/l/gently-copy.svg?style=flat-square)](http://opensource.org/licenses/MIT) 
[![npm downloads](https://img.shields.io/npm/dm/gently-copy.svg?style=flat-square)](https://www.npmjs.com/package/gently-copy)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


## Why?
- Copying files is sensitive operation with possible side-effects.
- Standard utilities do not sufficiently inform the user about what is going on.


## Features
- Safely copy files and directories without overwriting.
- Skip overwriting existing files, inform instead (or configure to overwrite instead with `option = {overwrite: true}`.
- Create new directories if needed.
- Clearly and colorfully inform about all actions peformed.


## Install

```sh
$ npm install --save gently-copy
```


## Usage

```js
var gentlyCopy = require('gently-copy')

var fileList = ['some-file', 'some-dir']
var dest = 'some-dest'

gentlyCopy(fileList, dest) // no overwriting (default)
gentlyCopy(fileList, dest, {overwrite: true}) // force overwriting
```

Console output with colors, thanks to the wonderful [`chalk`](https://github.com/chalk/chalk):
```sh
= Begin copying files
 - Copying file or directory: some-file
 - Copying file or directory: some-dir
= End copying files

```


## API


### gentlyCopy (source, destination, options)


#### source 

Type: `string` or (`array` of `strings`)

Single or list of file and directory name(s).


#### destination

Type: `string`

Destination directory name.


#### options (optional)

Type: `object`

To overwrite existing files, pass `option = {overwrite: true}`


## License

MIT © [Dmitri Zaitsev](https://github.com/dmitriz)
