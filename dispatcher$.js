var state = {}
const db = PouchDB('http://server.pouchcloud.com/servers')

const show = require('./routes/show')
const put = require('./routes/put')
const remove = require('./routes/remove')
const list = require('./routes/list')
const newDoc = require('./routes/new')
const editDoc = require('./routes/edit')


// pure functions
const route = r => msg => msg.route === r

module.export = (s, update) => {
  state = xtend(state, s)
  return (route, params) => {
    const out$ = most.of({route: route, params: xtend({},params) })
    // update with leaving message
    const leaving$ = out$
      .filter(msg => R.equals(state.route, msg.route) &&
        !R.has('redirect', msg.params)
      )

    const dispatch$ = most.merge(
      out$.filter(route('/show')).chain(show(db)),
      out$.filter(route('/put')).chain(put(db)),
      out$.filter(route('/remove')).chain(remove(db)),
      out$.filter(route('/')).chain(list(db)),
      out$.filter(route('/new')).chain(newDoc(db)),
      out$.filter(route('/edit')).chain(editDoc(db))
    )


    leaving$.observe(m => {
      update(xtend(state, {leaving: true}))
    })

    setTimeout(_ =>
      dispatch$.observe(chg => {
        //TODO: need to think about the change doc
        state = xtend(state, chg)
        update(state)
      })
    , 60)
  }
}
