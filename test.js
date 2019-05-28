// test.js
import test from 'ava'
import fn from './'
const fs = require('fs-extra')

/**
 * Attempts to read a file, returns contents.
 * During testing it was found that although the copy had completed, the file wasn't accessible on the file system (even upon an SSD).
 * Read now tries 5 times, waiting 500ms after each attempt.
 * On an SSD this was found to take 2 attempts - even for small files.
 * @param {*} file File to Read
 * @param {*} attempts Number of attempts (defaults to 5)
 */
function read (file, attempts = 5) {
  try {
    const content = fs.readFileSync(file, 'utf8')
    return content
  } catch (error) {
    if (attempts > 0) {
      setTimeout(() => { read(file, attempts - 1) }, 500)
    }
    throw error
  }
}

function write (file, data) {
  return fs.appendFileSync(file, data, 'utf8')
}
/**
 * Create directory structure
 * @param {*} dir
 * @param {*} options
 */
function mkdir (dir) {
  fs.ensureDirSync(dir)
}

test.beforeEach(() => {
  fs.emptyDirSync('tmp')
  fs.ensureDirSync('tmp')
})

test.afterEach(() => {
  fs.emptyDirSync('tmp')
})

/*
 *  === Single file or directory copy ===
 */
test.serial('copy one file to new name', t => {
  fn('LICENSE', 'tmp')
  t.is(read('LICENSE'), read('tmp/LICENSE'))
})

test.serial('copy one file to existing directory', t => {
  mkdir('tmp/newdir')
  fn('LICENSE', 'tmp/newdir')
  t.is(read('LICENSE'), read('tmp/newdir/LICENSE'))
})

test.serial('copy one directory preserving file structure', t => {
  mkdir('tmp/dir_old')
  write('tmp/dir_old/file', 'mytext')
  fn('tmp/dir_old', 'tmp/dir_new')
  t.is(read('tmp/dir_new/file'), 'mytext')
})

/*
 *  === Multiple file or directory copy ===
 */

test.serial('copy multiple files and directories', t => {
  mkdir('tmp/dir/subdir')
  write('tmp/dir/subdir/file', 'mytext')
  fn(['LICENSE', 'package.json', 'tmp/dir/subdir'], 'tmp')

  t.is(read('LICENSE'), read('./tmp/LICENSE'), 'LICENSE File incorrect')
  t.is(read('package.json'), read('./tmp/package.json'), 'tmp/package.json File incorrect')
  t.is(read('tmp/dir/subdir/file'), 'mytext', 'tmp/dir/subdir/file File incorrect')
})

/*
 *  === Non-existant directory copy ===
 */

test.serial('copy one file into non-existing directory', t => {
  fn('LICENSE', 'tmp/dir_nonexist/newfile')
  t.is(fs.existsSync('tmp/dir_nonexist/newfile/LICENSE'), true)
})

/*
 *  === (Non) overwriting ===
 */
test.serial('do not overwrite existing file', t => {
  write('tmp/newfile', 'mytext')
  fn('LICENSE', 'tmp/newfile')
  t.is(read('tmp/newfile'), 'mytext')
})

test.serial('do not overwrite existing directory', t => {
  mkdir('tmp/dir_old2')
  write('tmp/dir_old2/file', 'mytext')
  fn('LICENSE', 'tmp/dir_old2')
  t.is(read('tmp/dir_old2/file'), 'mytext')
})

/*
 *  === Overwrite option
 */
test.serial('overwrite existing file if option.overwrite === true', t => {
  write('tmp/newfile', 'mytext')
  fn('LICENSE', 'tmp/newfile', {
    overwrite: true
  })
  t.is(read('tmp/newfile'), read('LICENSE'))
})

test.serial('test the UTF8 Read function', t => {
  let FileContent = fn.read('demo/Sample UTF-8 File.txt')
  let lines = FileContent.split('\n')

  t.is(lines[8], 'Sanskrit: ﻿काचं शक्नोम्यत्तुम् । नोपहिनस्ति माम् ॥')
  t.is(lines[9], 'Sanskrit (standard transcription): kācaṃ śaknomyattum; nopahinasti mām.')
  t.is(lines[10], 'Classical Greek: ὕαλον ϕαγεῖν δύναμαι· τοῦτο οὔ με βλάπτει.')
})
