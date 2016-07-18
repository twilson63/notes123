/* global R, most */
const xtend = require('xtend')
const confirmed = R.pathSatisfies(R.equals(true),['params','confirm'])

module.exports = db => msg =>
  most.of(msg)
    .filter(confirmed)
    .tap(msg => console.log(msg))
    .chain(msg => most.fromPromise(
      db.remove(msg.params.doc)
        .then(res => xtend(msg, {route: '/'}, res, {params: {redirect: true }}))
        .catch(err => xtend(msg, {error: 'error saving doc'}))
    ))
