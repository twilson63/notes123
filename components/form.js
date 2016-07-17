/* global R */

/*
  # Form

  Uses serialize and uuid to turn a web form into json and create unique identifiers
  for new form documents.
*/
const yo = require('yo-yo')
const serialize = require('form-serialize')
const uuid = require('uuid')
const set = R.set
const lensProp = R.lensProp

module.exports = (dispatch, e$) => {
  e$
    .filter(e => e.target.id === 'server-form')
    .tap(e => e.preventDefault())
    .map(e => serialize(e.target, {hash: true}))
    .map(data => data._id ? data : set(lensProp('_id'), uuid.v4(), data))
    .observe(doc => dispatch('/put', {doc: doc}))

  const hidden = doc => yo`
    <div class="form-group invisible">
      <input type="hidden" name="type" value="Document">
      <input type="hidden" name="_id" value="${doc._id}">
      <input type="hidden" name="_rev" value="${doc._rev}">
    </div>
  `
  return (state) => yo`
    <section class="animated ${state.leaving ? 'fadeOut' : 'fadeIn'}">
      <form id="server-form" class="m-t-1">
        ${state.doc && state.doc._id ? hidden(state.doc) : null}
        <div class="form-group">
          <input type="text" class="form-control"
            name="title" placeholder="Title"
            value="${state.doc ? state.doc.server : ''}"
          >
        </div>
        <div class="form-group">
          <textarea class="form-control" style="height: 300px"
            name="description"
            placeholder="Enter Document here...">${state.doc ? state.doc.description : null}</textarea>
        </div>
        <div class="form-group">
          <button class="btn btn-primary-outline btn-block">Submit</button>
        </div>
        <div class="form-group">
          <a class="btn btn-secondary-outline btn-block" href="/">Cancel</a>
        </div>
      </form>

    </section>
  `
}
