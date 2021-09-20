const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


app.engine('hbs', exphbs({ 
  defaultLayout: 'main', 
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(methodOverride('_method'))


app.listen(port, () => {
  console.log(`Express server running on port ${port}`)
})


require('./routes')(app)
module.exports = app