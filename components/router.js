/* global R */

/*
Router - this router is a very simple router that uses a object
  which the keys are the routes and the value is the component to
  handle the route.

  It uses streams to handle any hyperlink clicks or popstate changes.

  Usage:

  It is a higher order function that takes a dispatch function for outbound
  calls, and a event$ for inbound sources.

  ```
  const Router = require('./router')(dispatch, e$)
  ...
  ${Router(state, [
    { '/': List },
    { '/new': Form },
    { '/edit': Form },
    { '/show': Show },
    { '/remove': Remove }
  ])}
  ```

*/

// querystring parser
const qs = require('../qs')

module.exports = (dispatch, e$) => {
  // need to update url and dom
  const go = t => {
    window.history.pushState(null, document.title, t.href)
    dispatch(t.pathname, qs(t.search))
  }

  // handle popstate events ie history
  e$
    .filter(e => e.popstate)
    .map(e => window.location)
    .observe(go)

  // handle hyperlinks
  e$
    .filter(e => e.target.tagName === 'A')
    .tap(e => e.preventDefault())
    .map(e => e.target)
    .observe(go)

  // router find match and then return function
  return (state, routes) => {
    const fn = R.compose(
      R.prop(state.route),
      R.head,
      R.filter(route => route[state.route])
    )(routes)

    // default state function
    return fn(state)
  }
}
