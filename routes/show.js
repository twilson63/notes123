/* global R, most */

const marked = require('marked')
const xtend = require('xtend')


// pure functions
const toggleMenu = msg => xtend(msg, {
  showMenu: !parseInt(R.path(['params','menu'], msg) || 1, 10)
})

const getDoc = db => msg => most.fromPromise(
  db.get(msg.params.id)
    .then(doc => xtend(msg, {doc: doc}))
    .catch(err => xtend(msg, {doc: {
      title: 'Doc Not Found',
      description: 'document not found!'
    }}))
)
const setHtml = msg => R.set(R.lensPath(['doc','html']), marked(msg.doc.description), msg)


module.exports = db => msg => most.of(msg)
  .filter(R.has('params'))
  .filter(msg => R.has('id', msg.params))
  .map(toggleMenu)
  .chain(getDoc(db))
  .map(setHtml)
