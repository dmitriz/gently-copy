# gently-copy [![Build Status](https://travis-ci.org/dmitriz/gently-copy.svg?branch=master)](https://travis-ci.org/dmitriz/gently-copy) [![Circle CI](https://circleci.com/gh/dmitriz/gently-copy.svg?style=svg)](https://circleci.com/gh/dmitriz/gently-copy)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

> Colorfully and informatively copy files without overwriting.


## Why?
- Copying files is sensitive operation with possible side-effects.
- Standard utilities do not sufficiently inform the user about what is going on.


## Features
- Safely copy files and directories without overwriting. 
- Skip overwriting existing files, inform instead.
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

gentlyCopy(fileList, dest)
```

Console output with colors, thanks to the wonderful [`chalk`](https://github.com/chalk/chalk):
```sh
= Begin copying files
 - Copying file or directory: some-file
 - Copying file or directory: some-dir
= End copying files

```


## API


### gentlyCopy (source, destination)


#### source

Type: `string` or (`array` of `strings`)

Single or list of file and directory name(s).


#### destination

Type: `string`

Destination directory name.


## License

MIT © [Dmitri Zaitsev](https://github.com/dmitriz)
