/* global R */
// convert querystring to object
module.exports = R.compose(
  R.fromPairs,
  R.map(R.split('=')),
  R.split('&'),
  R.tail
)
