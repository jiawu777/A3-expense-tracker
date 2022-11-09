const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const PORT = process.env.PORT || 3000
const app = express()

const routes = require('./routes')
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
require('./config/mongoose')

//setting static files
app.use(express.static('public'))
//setting body-parser
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(routes)
app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})