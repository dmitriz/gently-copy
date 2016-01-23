import test from 'ava';
import fn from './';

test('copy files and shout', t => {
	fn(['file1', 'file2', 'dir'], 'dest');
	t.end();
});
