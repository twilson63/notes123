const yo = require('yo-yo')

module.exports = (dispatch, e$) => {
  // eventless components
  const NavBar = require('./navbar')
  const List = require('./list')
  // components
  const Form = require('./form')(dispatch, e$)
  const Show = require('./show')(dispatch, e$)
  const Remove = require('./remove')(dispatch, e$)
  // router
  const Router = require('./router')(dispatch, e$)

  return state => yo`
    <div>
      ${NavBar(state)}
      <main class="container">
        ${Router(state, [
          { '/': List },
          { '/new': Form },
          { '/edit': Form },
          { '/show': Show },
          { '/remove': Remove }
        ])}
      </main>
    </div>
  `
}
