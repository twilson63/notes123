const yo = require('yo-yo')

/*
  # Remove Component

  This component provides a confirmation to remove the document.
*/
module.exports = (dispatch, e$) => {
  e$
    .filter(e => e.target.id === 'confirm')
    .observe(_ => dispatch('/remove', { confirm: true }))

  return state => yo`
    <section class="animated ${state.leaving ? 'zoomOut' : 'zoomIn'} m-t-1">
      <h1>Remove ${state.doc.server}</h1>
      <p>Are you sure?</p>
      <button id="confirm" class="btn btn-block btn-success-outline">Yes</button>
      <a class="btn btn-block btn-secondary-outline" href="/show?id=${state.doc._id}">No</button>
    </section>
    `
}
