/* global R, most */
const xtend = require('xtend')
const uuid = require('uuid')

module.exports = db => msg =>
  most.of(msg)
    .map(msg => xtend(msg, { params: { doc: {
      _id: uuid.v4()
    }}}))
