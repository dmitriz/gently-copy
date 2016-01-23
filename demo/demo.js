'use strict'

var gentlyCopy = require('../')

var fileList = ['some-file', 'some-dir']
var dest = 'some-dest'

gentlyCopy(fileList, dest)
