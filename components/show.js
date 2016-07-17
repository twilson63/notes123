const yo = require('yo-yo')

/*

 # Show Component

 This component manages the footer action drawer,
 could be a separate component, but it also fits to be
 part of the show, because it is not changing.

*/

module.exports = (dispatch, e$) => {
  //   .filter(e => e.target.id === 'article1')
  //   .observe(e => dispatch('/show', { menu: 0 }))

  e$
    .filter(e => e.target.id === 'remove-doc')
    .observe(e => dispatch('/remove'))

  return state => yo`
    <section class="animated ${state.leaving ? 'fadeOut' : 'fadeIn'} m-t-1">
      <article id="article1" style="height: 400px;">${state.doc.html}</artcle>
      <footer class="${state.showMenu ? 'animated slideInUp' : 'animated slideOutDown'} navbar navbar-fixed-bottom navbar-light bg-faded">
        <a class="btn btn-block btn-primary-outline" href="/edit?id=${state.doc._id}">
          <i class="size-24 ion-ios-compose-outline"></i>
          Modify Document
        </a>
        <button id="remove-doc" class="btn btn-block btn-danger-outline">
          <i class="size-24 ion-ios-trash"></i>
          Remove Document
        </button>
      </footer>

    </section>
  `
}
