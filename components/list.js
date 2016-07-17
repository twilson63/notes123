const yo = require('yo-yo')

const Item = doc => yo`
<a class="list-group-item" href="/show?id=${doc._id}">
  ${doc.title}
</a>
`

module.exports = (state) => yo`<section class="animated ${state.leaving ? 'fadeOut' : 'fadeIn'}">
  <div class="list-group m-t-1">
    ${state.docs ? state.docs.map(Item) : null}
  </div>
</section>`
