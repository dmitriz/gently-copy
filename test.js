// test.js
const fs = require('fs-extra')
import test from 'ava'
import fn from './'

function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}
/**
 * Attempts to read a file, returns contents.
 * During testing it was found that although the copy had completed, the file wasn't accessible on the file system (even upon an SSD).
 * Read now tries 5 times, waiting 500ms after each attempt.  On a SSD this was found to take 2 attempts - even for small files.
 * @param {*} file File to Read
 * @param {*} attempts Number of attempts (defaults to 5)
 */
async function read(file, attempts = 5) {
	try {
		const content = fs.readFileSync(file, 'utf8')
		return content
	} catch (error) {
		await sleep(500)
		if (attempts > 0) {
			return read(file, attempts - 1)
		}
		throw (error)
	}

}

function write(file, data) {
	return fs.appendFileSync(file, data, 'utf8')
}
/** */
function mkdir(dir) {
	return fs.mkdirSync(dir)
}

test.beforeEach(t => {
	fs.emptyDirSync('tmp')
	fs.ensureDirSync('tmp')
})

test.afterEach(t => {
	fs.emptyDirSync('tmp')
})

/*
 *  === Single file or directory copy ===
 */
test('copy one file to new name', async t => {
	fn('LICENSE', 'tmp')
	t.is(await read('LICENSE'), await read('tmp/LICENSE'))

})

test('copy one file to existing directory', async t => {
	mkdir('tmp/newdir')
	fn('LICENSE', 'tmp/newdir')
	t.is(await read('LICENSE'), await read('tmp/newdir/LICENSE'))
})

test('copy one directory preserving file structure', async t => {
	mkdir('tmp/dir_old')
	write('tmp/dir_old/file', 'mytext')
	await fn('tmp/dir_old', 'tmp/dir_new')
	t.is(await read('tmp/dir_new/file'), 'mytext')
})

/*
 *  === Multiple file or directory copy ===
 */

test('copy multiple files and directories', async t => {
	mkdir('tmp/dir')
	mkdir('tmp/dir/subdir')
	write('tmp/dir/subdir/file', 'mytext')

	fn(['LICENSE', 'package.json', 'tmp/dir/subdir'], 'tmp')
	t.is(await read('LICENSE'), await read('tmp/LICENSE'), 'LICENSE File incorrect')
	t.is(await read('package.json'), await read('tmp/package.json'), 'tmp/package.json File incorrect')
	t.is(await read('tmp/dir/subdir/file'), 'mytext', 'tmp/dir/subdir/file File incorrect')
})

/*
 *  === Non-existant directory copy ===
 */
test('copy one file into non-existing directory', async t => {
	await fn('LICENSE', 'tmp/dir_nonexist/newfile')
	t.is(await fs.exists('tmp/dir_nonexist/newfile/LICENSE'), true)
})

/*
 *  === (Non) overwriting ===
 */
test('do not overwrite existing file', async t => {
	write('tmp/newfile', 'mytext')
	await fn('LICENSE', 'tmp/newfile')
	t.is(await read('tmp/newfile'), 'mytext')
})

test('do not overwrite existing directory', async t => {
	mkdir('tmp/dir_old2')
	write('tmp/dir_old2/file', 'mytext')
	await fn('LICENSE', 'tmp/dir_old2')
	t.is(await read('tmp/dir_old2/file'), 'mytext')
})
/*
 *  === Overwrite option
 */
test('overwrite existing file if option.overwrite === true', async t => {
	write('tmp/newfile', 'mytext')
	await fn('LICENSE', 'tmp/newfile', {
		overwrite: true
	})
	t.is(await read('tmp/newfile'), await read('LICENSE'))
})
