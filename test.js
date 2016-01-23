import test from 'ava';
import fn from './';

test('copy files and shout', t => {
	fn(['file1', 'file2', 'dir'], 'dest');
	t.end();
});

test('copy single files', t => {
	fn('file', 'dest');
	t.end();
});
