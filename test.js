// test.js

import test from 'ava'
import fn from './'

test('copy files and shout', t => {
  fn(['LICENSE', 'package.json', 'demo'], 'dest')
})

test('copy single files', t => {
  fn('LICENSE', 'dest')
})
