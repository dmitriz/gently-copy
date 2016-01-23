# gently-copy [![Build Status](https://travis-ci.org/dmitriz/gently-copy.svg?branch=master)](https://travis-ci.org/dmitriz/gently-copy)

> Gently copy files


## Why?
- Copying files is sensitive operation with possible side-effects.
- Standard utilities do not sufficiently inform the user about what is going on.


## Features
- Safely copy files and directories without overwriting.
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

```sh
//=> 
= Begin copying files
 - Copying file or directory: some-file
 - Copying file or directory: some-dir

= End copying files

```

## API

### gentlyCopy (source, destination)

#### source

Type: array of strings

#### destination

Type: string


## License

MIT © [Dmitri Zaitsev](https://github.com/dmitriz)
