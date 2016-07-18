global.R = require('ramda')
global.most = require('most')
const PouchDB = require('pouchdb-http')
const db = PouchDB('http://server.pouchcloud.com/test')
const uuid = require('uuid')
const put = require('../../routes/put')

const test = require('tape')

test('put stream', t => {
  t.plan(1)

  put(db)({route: '/put', params: { doc: {
    _id: uuid.v4(),
    title: 'Doc1',
    description: 'A Short Description'
  }}})
    .observe(res => {
      t.ok(true)
    })


})

//TODO: Test Getting Error message
