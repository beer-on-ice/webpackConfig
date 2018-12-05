const Koa = require('koa')
const {
  resolve
} = require('path')
const statics = require('koa-static')

const app = new Koa()
const port = 3000

const main = statics(resolve(__dirname, './../dist'))
app.use(main)

app.listen(port, () => {
  console.log('Server Start At: ' + port)
})
