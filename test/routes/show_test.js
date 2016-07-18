global.document = require('global/document')
global.R = require('ramda')
global.most = require('most')
const PouchDB = require('pouchdb-http')
const db = PouchDB('http://server.pouchcloud.com/test')

const most = require('most')
const show = require('../../routes/show')

const test = require('tape')

test('show stream', t => {
  t.plan(1)
  show(db)({route: '/show', params: { id: 1}})
    .observe(res => {
      console.log(res)
      t.ok(true)
    })


})
