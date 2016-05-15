// test.js

import test from 'ava'
import fn from './'

test('copy files and shout', t => {
  fn(['LICENSE', 'package.json', 'demo'], 'demo/dest1')
})

test('copy single files', t => {
  fn('LICENSE', 'demo/dest2')
})
