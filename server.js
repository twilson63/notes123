/*
  # Server

  If browser, then provide production js

  otherwise provide index.html
*/
const http = require('http')
const ecstatic = require('ecstatic')
const serve = ecstatic(__dirname)

http
  .createServer((req, res) => {
    if (req.url === '/browser.js') {
      req.url = '/dist/bundle.min.js'
      serve(req, res)
    } else if (/\.(png|ico)$/.test(req.url)) {
      serve(req, res)
    } else {
      req.url = '/index.html'
      serve(req, res)
    }
  })
  .listen(process.env.PORT || 3000)
