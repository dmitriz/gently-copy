// test.js
import fs from 'fs'
// import path from 'path'
import rimraf from 'rimraf'
import test from 'ava'

import fn from './'

function bad () {
  throw Error('Bad function')
}

function read (file) {
  return fs.readFileSync(file, 'utf8')
}

function write (file, data) {
  return fs.appendFileSync(file, data, 'utf8')
}

function mkdir (dir) {
  return fs.mkdirSync(dir)
}

test.beforeEach(t => {
  rimraf.sync('tmp')
  fs.mkdirSync('tmp')
})

test.afterEach(t => {
  rimraf.sync('tmp')
})

/*
 * 	=== Single file or directory copy ===
*/
test('copy one file to new name', t => {
  fn('LICENSE', 'tmp/LICENSE')
  t.is(read('LICENSE'), read('tmp/LICENSE'))
})

test('copy one file to existing directory', t => {
  mkdir('tmp/newdir')
  fn('LICENSE', 'tmp/newdir')
  t.is(read('LICENSE'), read('tmp/newdir/LICENSE'))
})

test('file structure is preserved when copy one directory to new name', t => {
  mkdir('tmp/dir_old')
  write('tmp/dir_old/file', 'mytext')
  fn('tmp/dir_old', 'tmp/dir_new')
  t.is(read('tmp/dir_new/file'), 'mytext')
})

/*
 * 	=== Non-existant directory copy ===
*/
test('copy one file into non-existing directory', t => {
  fn('LICENSE', 'tmp/dir_nonexist/newfile')	
})

/*
 * 	=== Overwriting ===
*/
test('do not overwrite existing file', t => {
  write('tmp/newfile', 'mytext')
  fn('LICENSE', 'tmp/newfile')
  t.is(read('tmp/newfile'), 'mytext')
})

test('do not overwrite existing directory', t => {
  mkdir('tmp/dir_old')
  write('tmp/dir_old/file', 'mytext')
  fn('LICENSE', 'tmp/dir_old')
  t.is(read('tmp/dir_old/file'), 'mytext')
})

test('do not overwrite existing directory', t => {
  mkdir('tmp/dir_old')
  write('tmp/dir_old/file', 'mytext')
  fn('LICENSE', 'tmp/dir_old')
  t.is(read('tmp/dir_old/file'), 'mytext')
})


/*
 * 	=== Multiple file or directory copy ===
*/


// test('copy multiple files', t => {
//   fn(['LICENSE', 'package.json', 'demo'], 'demo/dest1')
// })
