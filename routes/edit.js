/* global R, most */
const xtend = require('xtend')
const hasId = R.pathSatisfies(R.is(String),['params','id'])

module.exports = db => msg =>
  most.of(msg)
    .filter(hasId)
    .chain(msg => most.fromPromise(
      db.get(msg.params.id)
        .then(doc => xtend(msg, {doc: doc}))
        .catch(err => xtend(msg, {doc: {
          title: 'Doc Not Found',
          description: 'document not found!'
        }}))
    ))
