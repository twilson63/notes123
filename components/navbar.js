const yo = require('yo-yo')

/*
  navbar
  ======

  The navbar has a lot of conditional logic and can be broken out into smaller
  components, but wanted to show the power of tagged templates.
*/

module.exports = state => yo`
  <nav class="navbar navbar-dark bg-primary">
    <div class="container">
      ${state.route === '/' ? yo`
      <a class="navbar-brand" href="#">
        ${state.title}
      </a>` : null}

      ${state.route === '/new' ? yo`
      <a class="navbar-brand" href="#">
        New Note
      </a>` : null}

      ${state.route === '/edit' ? yo`<a class="navbar-brand" href="#">Edit Note</a>` : null}
      ${state.route === '/remove' ? yo`<a class="navbar-brand" href="#">Remove Note</a>` : null}
      ${state.route === '/show' ? yo`
        <a class="navbar-brand" href="/">
          <i class="ion-chevron-left size-24"></i>
          ${state.doc.title}
        </a>` : null}

      ${state.route === '/' ? yo`
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item active">
          <a class="nav-link" href="/new">new</a>
        </li>
      </ul>
      ` : null}

      ${state.route === '/show' ? yo`
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item active">
          <a class="nav-link" href="/show?id=${state.doc._id}&menu=${state.showMenu ? 1 : 0}">edit</a>
        </li>
      </ul>
      ` : null}
    </div>
  </nav>
`
