// place in src with index.js no need to import anywhere
const proxy = require('http-proxy-middleware')
require("dotenv").config({ path: `${__dirname}/../../.env.development` });

module.exports = function (app) {
  console.log(process.env.PORT)
  // add other server routes to path array
  app.use(
    proxy.createProxyMiddleware(['/api'], { target: `http://localhost:${process.env.PORT}` }),
  )
}
