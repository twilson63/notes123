/* global PouchDB, R, most */
const yo = require('yo-yo')

const db = PouchDB('http://server.pouchcloud.com/servers')
const xtend = require('xtend')
const marked = require('marked')
const domify = require('domify')

const md2html = R.compose(domify, marked)

const qs = require('./qs')

var el = yo`
 <div>Loading</div>
`
document.body.appendChild(el)

const title = 'notes'
var state = {
  title: title,
  route: '/'
}

// outbound 
const update = (state) => yo.update(el, render(state))
const dispatch = require('./dispatcher')(state, update)

// stream sources
const pop$ = most.fromEvent('popstate', window).map(e =>
  R.set(R.lensProp('popstate'), true, e))
const click$ = most.fromEvent('click', document)
const submit$ = most.fromEvent('submit', document)

const event$ = most.merge(click$, submit$, pop$)

const App = require('./components/app')(dispatch, event$)

window.onload = _ => {
  const params = qs(window.location.search)
  dispatch(window.location.pathname, params)
}

function render (state) {
  return App(state)
}
