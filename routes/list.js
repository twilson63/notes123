/* global R, most */
const xtend = require('xtend')
const hasId = R.pathSatisfies(R.is(String),['params','id'])

module.exports = db => msg =>
  most.of(msg)
    .filter(hasId)
    .chain(msg => most.fromPromise(
      db.allDocs({include_docs: true})
        .then(result => R.pluck('doc', result.rows))
        .then(docs => xtend(state, { docs: docs }))
    ))
