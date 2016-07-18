/* global R, most */
const xtend = require('xtend')
const hasDoc = R.pathSatisfies(R.is(Object),['params','doc'])

module.exports = db => msg =>
  most.of(msg)
    .filter(hasDoc)
    .chain(msg => most.fromPromise(
      db.put(msg.params.doc)
        .then(res => xtend(msg, {route: '/show'}, res, {params: {redirect: true }}))
        .catch(err => xtend(msg, {error: 'error saving doc'}))
    ))
