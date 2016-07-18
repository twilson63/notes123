const db = PouchDB('http://server.pouchcloud.com/servers')
const xtend = require('xtend')
const marked = require('marked')

const qs = require('./qs')

var state = {}
module.exports = (s, update) => {
  state = xtend(state, s)

  const dispatch = (route, params) => {
    if (state.route !== route && params && !params.redirect) {
      update(xtend(state, {leaving: true}))
    }
    setTimeout(_ => {
      state = xtend(state, { route: route })

      if (state.route === '/show') {
        // get doc
        state = xtend(state, { showMenu: !parseInt(params.menu || 1, 10) })
        if (params.id) {
          db.get(params.id).then(doc => {
            doc.html = marked(doc.description)
            state = xtend(state, {doc: doc})
            return state
          }).then(state => update(state))
        } else {
          update(state)
        }
      } else if (route === '/put') {
        db.put(params.doc)
          .then(res => {
            dispatch('/show', {id: res.id, redirect: true})
          })
      } else if (route === '/remove') {
        if (params && params.confirm) {
          db.remove(state.doc)
            .then(res => dispatch('/'))
        } else {
          update(state)
        }
      } else if (route === '/edit') {
        db.get(params.id).then(doc => {
          state = xtend(state, {doc: doc})
          return state
        }).then(state => update(state))
      } else if (route === '/') {
        db.allDocs({ include_docs: true })
          .then(result => R.pluck('doc', result.rows))
          .then(docs => {
            state = xtend(state, { docs: docs })
            return state
          }).then(state => update(state))
      } else if (route === '/new') {
        state = xtend(state, {doc: null})
        update(state)
      } else {
        update(state)
      }
    }, 60)
  }
  return dispatch
}
